<template>
    <v-app-bar>
        <v-app-bar-nav-icon @click="handleButtonClick"></v-app-bar-nav-icon>

        <v-app-bar-title>Super Lunes</v-app-bar-title>
        {{ user ? user.email : '' }}
        <v-btn
            :icon="user ? 'mdi-logout' : 'mdi-login'"
            @click="handleSessionClick"
        >
        </v-btn>
    </v-app-bar>
</template>
<script setup>
const userStore = useUserStore()
const { signIn, signOut } = userStore
const { user } = storeToRefs(userStore)
const emit = defineEmits(['click'])
const handleButtonClick = () => {
    emit('click')
}
const handleSessionClick = () => {
    if (user.value === null) {
        signIn()
    } else {
        signOut()
    }
}
</script>
