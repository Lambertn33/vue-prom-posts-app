<template>
    <div class="flex justify-center items-center h-full bg-gray-100">
        <form class="w-full max-w-xl bg-white shadow-md rounded-lg p-6" @submit.prevent="submitForm">
            <h2 class="text-2xl font-bold mb-4 text-center">Create post</h2>

            <div class="mt-3">
                <the-input label="Title" placeholder="Enter post title..." v-model="title" :error="errors.title" />
            </div>
            <div class="mt-3">
                <text-area label="Content" placeholder="Write your comment here..." v-model="content"
                    :error="errors.content" />
            </div>

            <div class="mt-3">
                <the-button :loading="isCreating" text="Create Post" :disabled="isCreating" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { computed } from "vue";

const store = useStore();
const isCreating = computed(() => store.state.posts.loading);

const schema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
});

const user = store.getters["auth/user"];
const userId = user.id;

const { handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const { value: title } = useField<string>("title");
const { value: content } = useField<string>("content");

const submitForm = handleSubmit(async (formData) => {
    const updatedFormData = { ...formData, userId };
    await store.dispatch("posts/createPost", updatedFormData);
    window.location.href = "/";
});
</script>