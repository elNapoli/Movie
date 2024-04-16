<template>
    <q-header elevated class="bg-grey-6">
        <q-toolbar>
            <q-btn
                flat
                dense
                round
                @click="handleButtonClick"
                aria-label="Menu"
                icon="menu"
            />

            <q-toolbar-title> Super Lunes </q-toolbar-title>

            <q-btn
                flat
                dense
                @click="handleSessionClick"
                :icon-right="user === null ? 'login' : 'logout'"
                aria-label="Login"
                :label="user === null ? '' : user.email"
            />
        </q-toolbar>
    </q-header>
</template>
<script setup>
const supabase = useSupabaseClient()
const emit = defineEmits(['toggleDrawer'])
const { data } = await supabase.auth.getUser()
console.log(data)
const user = ref(data.user)
const handleButtonClick = () => {
    emit('toggleDrawer')
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
