<template>
    <post-card :post="post">
        <router-link :to="`/posts/${post.id.toString()}`">
            <div class="flex flex-col">
                <h2 class="font-bold text-xl text-center mb-4">{{ post.title }}</h2>
                <img :src="imageUrl" alt="Post Image" class="w-full h-48 object- rounded-lg" />
                <p class="text-justify text-sm leading-5 mt-2 font-semibold">{{ post.content }}</p>
            </div>
            <div class="flex gap-4 justify-between">
                <div class="flex items-center mt-4 gap-1">
                    <v-icon name="fa-user" scale="1" />
                    <span class="text-xs font-bold">{{ post.user.email }}</span>
                </div>
                <div class="flex items-center mt-4 gap-2">
                    <v-icon name="md-comment" scale="1" />
                    <span class="text-xs font-bold">{{ post._count.comments }}</span>
                </div>
            </div>
        </router-link>
    </post-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IPostList } from "@/types"

defineProps<{ post: IPostList }>();

const imageUrl = ref<string>("https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg");
</script>