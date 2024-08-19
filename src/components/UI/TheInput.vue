<template>
    <div class="flex flex-col">
        <label v-if="label" :for="id" class="font-semibold mb-2">{{ label }}</label>
        <input :type="type" :id="id" :placeholder="placeholder" v-model="inputValue"
            class="border border-gray-400 px-4 py-2 rounded-full" :class="{ 'border-red-500': error }" />
        <span v-if="error" class="text-red-500 font-bold text-sm mt-1">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: String,
    type: {
        type: String,
        default: 'text',
    },
    placeholder: String,
    label: String,
    error: String,
    id: String,
});

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
</script>