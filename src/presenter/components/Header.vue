<template>
    <v-app-bar>
        <v-app-bar-nav-icon @click="handleButtonClick"></v-app-bar-nav-icon>

        <v-app-bar-title>Super Lunes</v-app-bar-title>
        <v-btn icon="mdi-login"> </v-btn>
    </v-app-bar>
</template>
<script setup>
const emit = defineEmits(['click'])

const handleButtonClick = () => {
    console.log('adsfasdf')
    emit('click')
}
</script>
