<template>
    <div class="d-flex flex-wrap justify-center">
        <LoaderFullScreen :isLoading="requestState.status == 1000" />
        <v-dialog v-model="dialog" max-width="400">
            <v-card
                prepend-icon="mdi-account-plus"
                text="Una vez que envies la solicitud para unirte a este evento, el host tendrá que aprobar tu asistencia..."
                title="Quiero asistir a este evento"
            >
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="dialog = false"> Cancelar </v-btn>

                    <v-btn @click="sendRequest"> Quiero asistir </v-btn>
                </template>
            </v-card>
        </v-dialog>
        <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
                <v-icon icon="mdi-gamepad"></v-icon> Juntas del mes:
                {{ today.format('MMMM') }}

                <v-spacer></v-spacer>

                <v-text-field
                    v-model="search"
                    density="compact"
                    label="Buscar..."
                    prepend-inner-icon="mdi-magnify"
                    variant="solo-filled"
                    flat
                    hide-details
                    single-line
                ></v-text-field>
            </v-card-title>

            <v-divider></v-divider>

            <v-data-table
                :headers="headers"
                :items="eventDataTableState.data"
                :loading="eventDataTableState.status === 1000"
                :custom-filter="filterGames"
                @update:expanded="loadDetails"
                @expanded-row="loadDetails"
                :search="search"
                show-expand
                item-key="id"
                :expanded.sync="expanded"
            >
                <template v-slot:item.games="{ item }">
                    <v-sheet class="mx-auto" max-width="400">
                        <v-slide-group show-arrows>
                            <v-chip
                                v-for="g in item.games"
                                :key="g"
                                class="ml-1"
                            >
                                {{ g.name }}
                            </v-chip>
                        </v-slide-group>
                    </v-sheet>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn
                        icon="mdi-share-variant"
                        size="small"
                        variant="text"
                    ></v-btn>
                    <v-btn
                        @click="request(item)"
                        icon="mdi-account-plus"
                        size="small"
                        variant="text"
                    ></v-btn>
                </template>
                <template v-slot:no-data> </template>
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
    </div>
</template>
<script setup>
const dayJs = useDayjs()
const settingStore = useSettingStore()
const {
    getEventsDataTable,
    setRequestEvent,
    sendRequestToEvent,
    loadRequests,
} = settingStore
const { eventDataTableState, requestState } = storeToRefs(settingStore)
const expanded = ref([])
const search = ref('')
const dialog = ref(false)
const items = [
    {
        date: 'African Elephant',
        municipality: 'Loxodonta africana',
        address: 'Loxodonta africana',
        games: 'Herbivore',
        dialog: false,
        host: 'Savanna, Forests',
    },
]

const sendRequest = () => {
    sendRequestToEvent()
    dialog.value = false
}
const request = (r) => {
    setRequestEvent(r)
    dialog.value = true
}
const loadDetails = (item) => {
    if (item.length === 2) {
        const removedItem = item.splice(1, 1)[0]
        expanded.value = [removedItem]
    } else {
        expanded.value = item
    }
    loadRequests(expanded.value[0])
}
const filterGames = (value, query, item) => {
    if (value == null || query == null) return -1
    if (typeof value === 'string') {
        const stringValue = value.toString().toLocaleLowerCase()
        const queryValue = query.toString().toLocaleLowerCase()
        const position = stringValue.indexOf(queryValue)
        return position
    } else if (Array.isArray(value)) {
        const foundIndex = value.findIndex((obj) => {
            const objValue = obj.name.toString().toLocaleLowerCase()
            const queryValue = query.toString().toLocaleLowerCase()
            return objValue.indexOf(queryValue) !== -1
        })
        return foundIndex
    } else {
        return -1
    }
}
const headers = [
    {
        title: 'Fecha',
        align: 'center',
        minWidth: '150px',
        key: 'time.start',
    },
    {
        title: 'Comuna',
        key: 'municipality.name',
        align: 'center',

        minWidth: '150px',
    },
    { title: 'Dirección', key: 'address', align: 'center', minWidth: '200px' },

    { title: 'Organizador', key: 'with', align: 'center' },
    {
        title: 'Juegos',
        key: 'games',
        align: 'center',
        width: '200px',
        sortable: false,
    },
    { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
]
const today = dayJs()
const date_start = today.startOf('month')
const date_end = today.endOf('month')
onMounted(() => {
    getEventsDataTable(date_start, date_end)
})
</script>
