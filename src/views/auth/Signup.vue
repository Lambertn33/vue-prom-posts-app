<template>
    <div class="flex justify-center items-center h-full bg-gray-100">
        <form @submit.prevent="submitForm" class="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-center">Sign up</h2>

            <div class="mt-3">
                <the-input type="email" label="Email" placeholder="Enter your email..." v-model="email"
                    :error="errors.email" />
                <span v-if="localError" class="text-red-500 font-bold text-sm mt-1">{{ localError }}</span>
            </div>

            <div class="mt-3">
                <the-input type="password" label="Password" placeholder="Enter your password..." v-model="password"
                    :error="errors.password" />
            </div>

            <div class="mt-3">
                <the-button :loading="isLoading" text="Signup" :disabled="isLoading" />
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