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
const supabase = useSupabaseClient()
const emit = defineEmits(['click'])
const { data } = await supabase.auth.getUser()
const user = ref(data.user)
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

const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    user.value = null
}
</script>
