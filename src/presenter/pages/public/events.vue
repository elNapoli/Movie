<template>
    <v-app>
        <v-container>
            <v-card title="Juntas" flat>
                <template v-slot:text>
                    <v-text-field
                        v-model="search"
                        label="Buscar junta..."
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        hide-details
                        single-line
                    ></v-text-field>
                </template>

                <v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"
                    show-expand
                >
                    <template v-slot:item.actions="{ item }">
                        <v-btn
                            icon="mdi-share-variant"
                            size="small"
                            variant="text"
                        ></v-btn>
                        <v-btn
                            icon="mdi-account-plus"
                            size="small"
                            variant="text"
                        ></v-btn>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">
                            Reset
                        </v-btn>
                    </template>
                    <template v-slot:item.link="{ value }">
                        <v-btn icon="mdi-share-variant"></v-btn>
                    </template>
                    <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                            <td :colspan="columns.length">Jugadores:</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>More info about</td>
                            <td :colspan="columns.length">
                                <v-chip color="green"> aceptado </v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>More info about</td>
                            <td :colspan="columns.length">
                                <v-chip color="yellow"> pendiente </v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>More info about</td>
                            <td :colspan="columns.length">
                                <v-chip color="red"> rechazado </v-chip>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </v-app>
</template>
<script setup>
const search = ref('')
const items = [
    {
        date: 'African Elephant',
        municipality: 'Loxodonta africana',
        address: 'Loxodonta africana',
        games: 'Herbivore',
        host: 'Savanna, Forests',
    },
]
const headers = [
    {
        title: 'Fecha',
        align: 'start',
        sortable: true,
        key: 'date',
    },
    { title: 'Comuna', key: 'municipality', align: 'end' },
    { title: 'Dirección', key: 'address', align: 'end' },
    { title: 'Juegos', key: 'games', align: 'end' },
    { title: 'Organizador', key: 'host', align: 'end' },
    { title: 'Acciones', key: 'actions', sortable: false },
]
</script>
