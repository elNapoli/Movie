<template>
    <v-card class="mx-auto" max-width="300">
        {{ user }}
    </v-card>
</template>
<script setup>
const userStore = useUserStore()
const { signIn, signOut } = userStore
const { user } = storeToRefs(userStore)
</script>
