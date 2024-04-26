<template>
    <v-app>
        <v-container>
            <v-data-table :items="items"></v-data-table>
        </v-container>
    </v-app>
</template>
<script setup>
const items = [
    {
        date: 'African Elephant',
        municipality: 'Loxodonta africana',
        address: 'Loxodonta africana',
        games: 'Herbivore',
        host: 'Savanna, Forests',
    },
]
</script>
