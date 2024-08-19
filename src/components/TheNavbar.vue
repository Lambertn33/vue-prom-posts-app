<script setup lang="ts">
import { IUser } from '@/types';
import { useStore } from 'vuex';

defineProps<{
    title: string;
}>();

interface Link {
    to: string;
    label: string,
    dataCy: string
}

const store = useStore();
const isAuthenticated = store.getters['auth/isAuthenticated'];
const authenticatedUser: IUser = store.getters['auth/user'];

const logout = () => {
    store.dispatch('auth/logout');
    window.location.href = "/";
}


const publicLinks: Link[] = [
    { to: '/', label: 'Home', dataCy: 'home-link' },
    { to: '/signup', label: 'Sign up', dataCy: 'signup-link' },
    { to: '/login', label: 'Login', dataCy: 'login-link' },
]

const privateLinks: Link[] = [
    { to: '/', label: 'Home', dataCy: 'home-link' },
];

const links = isAuthenticated ? privateLinks : publicLinks;

</script>
<template>
    <div class="bg-[#d9d9d9] w-full flex justify-between items-center px-8 py-4">
        <h2 class="text-3xl font-bold text-black">{{ title }}</h2>
        <div class="flex gap-x-4">
            <div class="flex gap-x-4 items-center">
                <router-link :data-cy="link.dataCy" v-for="link in links" :to="link.to" activeClass="text-gray-300"
                    exactActiveClass="font-bold text-red-600">
                    <span class="text-black font-semibold hover:underline transition-all"> {{ link.label }}</span>
                </router-link>
            </div>
            <div class="flex items-center gap-x-2" v-if="isAuthenticated">
                <div>
                    <v-icon name="fa-user" scale="1" />
                    <span>{{ authenticatedUser.email }}</span>
                </div>
                <button @click="logout" class="px-4 py-1 rounded-md bg-black text-white"><span
                        class="">Logout</span></button>
            </div>
        </div>
    </div>
</template>