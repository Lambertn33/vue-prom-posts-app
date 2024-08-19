<template>
    <div class="flex flex-col">
        <label v-if="label" :for="id" class="font-semibold mb-2">{{ label }}</label>
        <textarea :id="id" v-model="inputValue" :placeholder="placeholder" :rows="rows"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            :class="{ 'border-red-500': error }"></textarea>
        <span v-if="error" class="text-red-500 font-bold text-sm mt-1">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: String,
    placeholder: String,
    label: String,
    error: String,
    id: String,
    rows: {
        type: Number,
        default: 2,
    },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
</script>