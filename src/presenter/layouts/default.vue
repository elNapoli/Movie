<template>
    <q-layout>
        <Header @toggleDrawer="toggleLeftDrawer" />
        <Drawer :open="drawerOpen" />
        <q-page-container>
            <q-page>
                <slot />
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
const drawerOpen = ref(false)

const toggleLeftDrawer = () => {
    drawerOpen.value = !drawerOpen.value
}
</script>
