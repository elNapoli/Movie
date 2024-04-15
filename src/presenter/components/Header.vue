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

            <q-toolbar-title> Quasar App </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>
<script setup>
const emit = defineEmits(['toggleDrawer'])

const handleButtonClick = () => {
    emit('toggleDrawer')
}
</script>
