<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { IPost } from "@/types"
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import CommentForm from '@/components/CommentForm.vue';

const store = useStore();
const route = useRoute();
const postId = route.params.id;
const post = computed<IPost>(() => store.state.post.post.post);
const isLoading = computed<boolean>(() => store.state.post.loading);

const fetchPost = () => {
    store.dispatch('post/fetchPost', postId);
};
onMounted(() => fetchPost());
</script>


<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-center">Post Item Details</h2>

            <div v-if="isLoading" class="text-center">
                <h2 class="text-gray-500">Please wait...</h2>
            </div>

            <div v-else>
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-2">{{ post?.title }}</h3>
                    <p class="text-gray-700">{{ post?.content }}</p>
                </div>

                <!-- Comments Section -->
                <div class="border-t border-gray-200 pt-4">
                    <h4 class="text-lg font-bold mb-4">Comments</h4>
                    <div v-if="post?.comments.length" v-for="comment in post?.comments" :key="comment.id"
                        class="mb-4 p-4 bg-gray-100 rounded-md">
                        <div class="flex gap-x-1">
                            <v-icon name="fa-user" scale="1" />
                            <p class="text-sm text-gray-600 mb-2">{{ comment.user.email }}</p>
                        </div>
                        <p class="text-sm">{{ comment.content }}</p>
                    </div>
                    <div v-else class="flex justify-center">
                        <span class="text-red-600 font-bold text-center text-sm">No comments yet</span>
                    </div>
                </div>

                <!-- Add Comment Section -->
                <CommentForm />
            </div>
        </div>
    </div>
</template>