<template>
    <div class="pa-4">
        <v-dialog
            :modelValue="open"
            @update:value="open = $event"
            max-width="600"
            persistent
            transition="dialog-bottom-transition"
        >
            <v-form fast-fail @submit.prevent="createEvent">
                <v-card prepend-icon="mdi-update" title="Agendar nueva junta">
                    <v-card-text>
                        <v-col cols="12">
                            <v-alert
                                class="mb-5"
                                text="Errores al buscar datos"
                                v-show="regionState.error"
                                title="Error!"
                                type="error"
                            ></v-alert>
                            <DatepickerTextField
                                :open="openDatePicker"
                                :initialDate="date"
                                @updateDate="$emit('updateDate', $event)"
                                @updateHour="$emit('updateHour', $event)"
                                @updateMinute="$emit('updateMinute', $event)"
                            />
                            <v-select
                                label="Region"
                                v-model="formState.currentRegion"
                                :item-props="itemProps"
                                :items="regionState.data"
                            ></v-select>

                            <v-select
                                label="Comuna"
                                v-model="formState.currentMunicipality"
                                :item-props="itemProps"
                                :items="
                                    formState.currentRegion.municipalityList
                                "
                            ></v-select>
                            <v-autocomplete
                                :key="uniqueKey"
                                v-model="formState.gamesToPlay"
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
                            <v-text-field
                                label="Dirección"
                                v-model="formState.currentAddress"
                            ></v-text-field>
                        </v-col>
                    </v-card-text>
                    <template v-slot:actions>
                        <v-btn
                            class="ms-auto"
                            text="Cancelar"
                            @click="$emit('handleClose')"
                        ></v-btn>
                        <v-btn text="Agendar" @click="createEvent"></v-btn>
                    </template>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>
<script setup>
import debounce from 'lodash.debounce'
const settingStore = useSettingStore()
const { getRegions, searchGames, createEventInSupabase } = settingStore
const { regionState, gameState } = storeToRefs(settingStore)
const openDatePicker = ref(false)
const menuDropdownListOpen = ref(false)
const uniqueKey = ref(0)
const currentMunicipality = ref(null)
const formState = reactive({
    currentAddress: '',
    currentRegion: {},
    gamesToPlay: null,
    currentMunicipality: null,
})
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
    date: {
        type: String,
        required: true,
    },
})
const search = debounce(async (query) => {
    if (query.trim() !== '') {
        searchGames(query)
    }
}, 500) // 300 es el tiempo de espera en milisegundos
onMounted(() => {
    getRegions(1) // NOTE: se deja con el pais 1, que es chile por default
})
watch(gameState, () => {
    uniqueKey.value += 1
    menuDropdownListOpen.value = true
})

const itemProps = (item) => ({
    title: item.name,
})

const createEvent = () => {
    createEventInSupabase(toRaw(formState))
}
</script>
