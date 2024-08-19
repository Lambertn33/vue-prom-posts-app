<template>
    <div class="mt-6">
        <h4 class="text-lg font-bold mb-2">Add a Comment</h4>
        <form @submit.prevent="submitComment">
            <div>
                <text-area label="Comment" placeholder="Write your comment here..." v-model="comment"
                    :error="errors.comments" />
            </div>
            <the-button :loading="isAddingComment" text="Add comment" :disabled="isAddingComment" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const store = useStore();
const route = useRoute();
const postId = route.params.id;
const isAddingComment = computed(() => store.getters['post/isAddingComment']);

const schema = yup.object({
    comment: yup.string().required("Comment is required"),
});


const { handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const { value: comment } = useField<string>("comment");


const submitComment = handleSubmit(async () => {
    store.commit('post/setCommenting', true);
    await store.dispatch('post/addPostComment', { postId, comment: comment.value });
    comment.value = '';
    await store.dispatch('post/fetchPost', postId);
});
</script>