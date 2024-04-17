<template>
    <v-app id="inspire">
        <Drawer :open="drawer" />
        <Header @click="drawer = !drawer" />
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script setup>
const drawer = ref(true)
</script>
