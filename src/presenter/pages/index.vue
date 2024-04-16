<template>
    <div>hola</div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
        queryParams: {
            access_type: 'offline',
            prompt: 'consent',
        },
    },
})
</script>
