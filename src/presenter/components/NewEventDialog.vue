<template>
    <div class="pa-4">
        <LoaderFullScreen :isLoading="createEventState.status == 1000" />
        <v-dialog
            :modelValue="open"
            @update:value="open = $event"
            max-width="800"
            persistent
            transition="dialog-bottom-transition"
        >
            <v-form fast-fail @submit.prevent="createOrUpdateEvent">
                <v-card prepend-icon="mdi-update" title="Agendar nueva junta">
                    <v-card-text>
                        <v-col cols="12">
                            <v-alert
                                class="mb-5"
                                text="Hubo un error en el sistema...."
                                v-show="
                                    regionState.error || createEventState.error
                                "
                                title="Error!"
                                type="error"
                            ></v-alert>
                            <DatepickerTextField
                                v-if="currentEvent.time.start !== null"
                                placeholder="Fecha de inicio"
                                :open="openDatePicker"
                                :initialDate="currentEvent.time.start"
                                @updateDate="
                                    updateDate({
                                        type: 'start',
                                        date: $event,
                                    })
                                "
                                @updateHour="
                                    updateHour({
                                        type: 'start',
                                        hour: $event,
                                    })
                                "
                                @updateMinute="
                                    updateMinute({
                                        type: 'start',
                                        minute: $event,
                                    })
                                "
                            />
                            <DatepickerTextField
                                v-if="currentEvent.time.start !== null"
                                placeholder="Fecha de termino"
                                :open="openDatePicker"
                                :initialDate="currentEvent.time.end"
                                @updateDate="
                                    updateDate({
                                        type: 'end',
                                        date: $event,
                                    })
                                "
                                @updateHour="
                                    updateHour({
                                        type: 'end',
                                        hour: $event,
                                    })
                                "
                                @updateMinute="
                                    updateMinute({
                                        type: 'end',
                                        minute: $event,
                                    })
                                "
                            />

                            <v-select
                                label="Region"
                                v-model="currentEvent.region"
                                :item-props="itemProps"
                                :items="regionState.data"
                            ></v-select>

                            <v-select
                                label="Comuna"
                                v-model="currentEvent.municipality"
                                :item-props="itemProps"
                                :items="currentEvent.region?.municipalityList"
                            ></v-select>
                            <v-text-field
                                label="Dirección"
                                v-model="currentEvent.address"
                            ></v-text-field>
                            <v-autocomplete
                                :key="uniqueKey"
                                v-model="currentEvent.games"
                                :items="gameState.data"
                                label="Juego(s)"
                                :menu="menuDropdownListOpen"
                                multiple
                                @update:search="search($event)"
                                :loading="gameState.status == 1000"
                                closable-chips
                                placeholder="Buscar juegos..."
                                chips
                            >
                                <template v-slot:chip="{ props, item }">
                                    <v-chip
                                        v-bind="props"
                                        :text="item.value.name"
                                    >
                                    </v-chip>
                                </template>

                                <template v-slot:item="{ props, item }">
                                    <v-list-item
                                        v-bind="props"
                                        :subtitle="item.value.year_published"
                                        :title="item.value.name"
                                    ></v-list-item>
                                </template>
                            </v-autocomplete>
                            <v-select
                                label="Cuantos personas"
                                v-model="currentEvent.slots"
                                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                            ></v-select>

                            <Editor
                                :value="currentEvent.description"
                                @onUpdate="currentEvent.description = $event"
                            />
                        </v-col>
                    </v-card-text>
                    <template v-slot:actions>
                        <v-btn
                            class="ms-auto"
                            text="Cancelar"
                            @click="$emit('handleClose')"
                        ></v-btn>
                        <v-btn
                            :text="
                                currentEvent.id !== null ? 'Editar' : 'Agendar'
                            "
                            @click="createOrUpdateEvent"
                        ></v-btn>
                    </template>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>
<script setup>
import debounce from 'lodash.debounce'
const settingStore = useSettingStore()
const userStore = useUserStore()
const {
    getRegions,
    searchGames,
    createOrUpdateEvent,
    getEvents,
    clearCurrentEvent,
    updateDate,
    updateHour,
    updateMinute,
} = settingStore
const { regionState, gameState, createEventState, currentEvent } =
    storeToRefs(settingStore)
const { user } = storeToRefs(userStore)
const openDatePicker = ref(false)
const menuDropdownListOpen = ref(false)
const uniqueKey = ref(0)

const emit = defineEmits([
    'handleClose',
    'updateDate',
    'updateHour',
    'updateMinute',
])

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
})
const search = debounce(async (query) => {
    if (query.trim() !== '') {
        searchGames(query)
    }
}, 500)
onMounted(() => {
    getRegions(1) // NOTE: se deja con el pais 1, que es chile por default
})
watch(gameState, () => {
    uniqueKey.value += 1
    menuDropdownListOpen.value = true
})

watch(createEventState, async (newEvent, oldEvent) => {
    if (newEvent.status == 201) {
        emit('handleClose')
        clearCurrentEvent()
    }
})
const itemProps = (item) => ({
    title: item.name,
})
</script>
