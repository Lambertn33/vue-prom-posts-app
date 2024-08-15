<template>
    <div class="p-4">
        <h2 class="text-2xl flex justify-center font-bold">Posts List</h2>
        <div v-if="isLoading" class="flex justify-center items-center">
            <div class="loader">Loading...</div>
        </div>
        <div v-else class="w-full">
            <div class="flex justify-center py-4">
                <input type="text" v-model="searchKey" placeholder="search post..."
                    class="border border-gray-400 px-4 py-2 rounded-md w-[400px]">
            </div>
            <div v-if="isSearching" class="flex justify-center">
                <p>Please wait....</p>
            </div>
            <div v-else>
                <div v-if="postsToDisplay.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <PostListItem v-for="post in postsToDisplay" :key="post.id" :post="post" />
                </div>
                <div v-else class="flex justify-center">
                    <p>No results found.</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { debounce } from "lodash";
import { IPostList } from "@/types";
import { useStore } from 'vuex';
import PostListItem from '@/components/PostListItem.vue';

const store = useStore();
const searchKey = ref<string>('');
const posts = computed<IPostList[]>(() => store.state.posts.posts.posts);
const isLoading = computed<boolean>(() => store.state.posts.loading);
const isSearching = computed<boolean>(() => store.state.posts.searching);
const searchedPosts = computed<IPostList[]>(() => store.state.posts.searchedPosts.searchedPosts);

const postsToDisplay = computed(() => {
    return searchKey.value !== "" && searchedPosts.value.length > 0
        ? searchedPosts.value
        : searchKey.value !== "" && searchedPosts.value.length === 0
            ? []
            : posts.value;
});


const fetchPosts = () => {
    store.dispatch('posts/fetchPosts');
};

const debouncedSearch = debounce(() => {
    if (searchKey.value) {
        store.dispatch('posts/searchPosts', searchKey.value);
    }
}, 500);

watch(searchKey, () => {
    debouncedSearch();
});

watch(() => store.state.posts.searchedPosts, (newSearchedPosts) => {
    console.log('Searched Posts:', newSearchedPosts.searchedPosts);
});

onMounted(() => fetchPosts());
</script>
