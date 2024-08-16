<template>
    <div class="flex justify-center items-center h-full bg-gray-100">
        <form @submit.prevent="submitForm" class="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-center">Sign up</h2>

            <div class="mt-3">
                <div class="flex flex-col">
                    <h6 class="font-semibold mb-2">Email</h6>
                    <input type="email" v-model="email" placeholder="enter your email..."
                        class="border border-gray-400 px-4 py-2 rounded-full" />
                    <span v-if="errors.email" class="text-red-500 font-bold text-sm mt-1">{{ errors.email }}</span>
                    <span v-if="localError" class="text-red-500 font-bold text-sm mt-1">{{ localError }}</span>
                </div>
            </div>

            <div class="mt-3">
                <div class="flex flex-col">
                    <h6 class="font-semibold mb-2">Password</h6>
                    <input type="password" v-model="password" placeholder="enter your password..."
                        class="border border-gray-400 px-4 py-2 rounded-full" />
                    <span v-if="errors.password" class="text-red-500 font-bold text-sm mt-1">{{ errors.password
                        }}</span>
                </div>
            </div>

            <div class="mt-3">
                <button :disabled="isLoading"
                    class="mt-4 w-full px-4 py-3 bg-black text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
                    <span class="font-semibold">{{ isLoading ? "Please wait.." : "Signup" }}</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useAuthForm } from "@/composables/useAuthForm";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const { email, password, errors, isLoading, localError, submitForm } = useAuthForm(schema, 'register');
</script>