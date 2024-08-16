<script setup lang="ts">
defineProps<{
    title: string;
}>();

interface Link {
    to: string;
    label: string,
    dataCy: string
}

const links: Link[] = [
    { to: '/', label: 'Home', dataCy: 'home-link' },
    { to: '/signup', label: 'Sign up', dataCy: 'signup-link' },
    { to: '/login', label: 'Login', dataCy: 'login-link' },
]

</script>
<template>
    <div class="bg-[#d9d9d9] w-full flex justify-between px-8 py-4">
        <h2 class="text-3xl font-bold text-black">{{ title }}</h2>
        <div class="flex gap-x-4 items-center">
            <router-link :data-cy="link.dataCy" v-for="link in links" :to="link.to" activeClass="text-gray-300"
                exactActiveClass="font-bold text-red-600">
                <span class="text-black font-semibold hover:underline transition-all"> {{ link.label }}</span>
            </router-link>
        </div>
    </div>
</template>