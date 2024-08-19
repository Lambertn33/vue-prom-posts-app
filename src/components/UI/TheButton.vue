<template>
    <button :disabled="disabled"
        class="mt-4 w-full px-4 py-3 bg-black text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
        <span class="font-semibold">{{ loading ? loadingText : text }}</span>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    text: { type: String, required: true },
    loadingText: { type: String, default: 'Please wait..' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
});
</script>