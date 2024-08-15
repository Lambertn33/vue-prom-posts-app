<template>
    <div class="p-4">
        <h2 class="text-2xl flex justify-center font-bold">Posts List</h2>
        <div v-if="isLoading" class="flex justify-center items-center">
            <div class="loader">Loading...</div>
        </div>
        <div v-else class="w-full">
            <div class="flex justify-center py-4">
                <input type="text" placeholder="search post..."
                    class="border border-gray-400 px-4 py-2 rounded-md w-[400px]">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <PostListItem v-for="post in posts" :key="post.id" :post="post" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { IPostList } from "@/types"
import { useStore } from 'vuex';
import PostListItem from '@/components/PostListItem.vue';

const store = useStore();

const posts = computed<IPostList[]>(() => store.state.posts.posts.posts);
const isLoading = computed<boolean>(() => store.state.posts.loading);

const fetchPosts = () => {
    store.dispatch('posts/fetchPosts');
};
onMounted(() => fetchPosts());
</script>