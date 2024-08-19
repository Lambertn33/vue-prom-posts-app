<template>
    <div class="flex justify-center items-center h-full bg-gray-100">
        <form class="w-full max-w-xl bg-white shadow-md rounded-lg p-6" @submit.prevent="submitForm">
            <h2 class="text-2xl font-bold mb-4 text-center">Create post</h2>

            <div class="mt-3">
                <div class="flex flex-col">
                    <h6 class="font-semibold mb-2">Title</h6>
                    <input type="text" placeholder="enter post title..." v-model="title"
                        class="border border-gray-400 px-4 py-2 rounded-full" />
                    <span v-if="errors.title" class="text-red-500 font-bold text-sm mt-1">{{ errors.title }}</span>
                </div>
            </div>
            <div class="mt-3">
                <div class="flex flex-col">
                    <h6 class="font-semibold mb-2">Content</h6>
                    <textarea v-model="content"
                        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        rows="3" placeholder="Write your comment here..."></textarea>
                    <span v-if="errors.content" class="text-red-500 font-bold text-sm mt-1">{{ errors.content }}</span>
                </div>
            </div>

            <div class="mt-3">
                <button
                    class="mt-4 w-full px-4 py-3 bg-black text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
                    <span class="font-semibold">{{ isCreating ? "Please wait.." : "Create Post" }}</span>
                </button>
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