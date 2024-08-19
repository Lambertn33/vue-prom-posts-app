<template>
    <post-card :post="post">
        <router-link :to="`/posts/${post.id.toString()}`">
            <div class="flex flex-col gap-y-2">
                <h2 class="font-bold text-xl text-center">{{ post.title }}</h2>
                <p class="text-justify">{{ post.content }}</p>
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
import { IPostList } from "@/types"
import { useStore } from "vuex";

const props = defineProps<{ post: IPostList }>();
const store = useStore();
</script>