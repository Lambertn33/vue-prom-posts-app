<template>
    <div class="flex justify-center items-center h-full bg-gray-100">
        <form class="w-full max-w-xl bg-white shadow-md rounded-lg p-6" @submit.prevent="submitForm">
            <h2 class="text-2xl font-bold mb-4 text-center">Update Post</h2>

            <div class="mt-3">
                <the-input label="Title" placeholder="Enter post title..." v-model="title" :error="errors.title" />
            </div>
            <div class="mt-3">
                <text-area label="Content" placeholder="Write your comment here..." v-model="content"
                    :error="errors.content" />
            </div>

            <div class="mt-3">
                <the-button :loading="isUpdating" text="Update Post" :disabled="isUpdating" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const post = computed(() => store.getters['post/getPost'].post);
const isUpdating = computed(() => store.state.post.updating);

const schema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
});

const { handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: {
        title: post?.value.title || "",
        content: post?.value.content || ""
    }
});

const { value: title } = useField<string>("title");
const { value: content } = useField<string>("content");

const submitForm = handleSubmit(async (formData) => {
    const updatedFormData = { ...formData, postId };
    store.commit("post/setUpdating", true);
    await store.dispatch("post/updatePost", updatedFormData);
    store.commit("post/setUpdating", false);
    window.location.href = `/posts/${postId}`;
});

// avoid editing someone else's post
onMounted(() => {
    const authenticatedUser = computed(() => store.getters['auth/user']);
    if (authenticatedUser.value.id !== post.value.userId) {
        router.push({ path: `/posts/${post.value.id}` });
    }
})

</script>