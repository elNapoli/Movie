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
            <v-form fast-fail @submit.prevent="createEvent">
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
                                :open="openDatePicker"
                                :initialDate="date_start"
                                @updateDate="
                                    $emit('updateDate', {
                                        type: 'start',
                                        date: $event,
                                    })
                                "
                                @updateHour="
                                    $emit('updateHour', {
                                        type: 'start',
                                        hour: $event,
                                    })
                                "
                                @updateMinute="
                                    $emit('updateMinute', {
                                        type: 'start',
                                        minute: $event,
                                    })
                                "
                            />
                            <DatepickerTextField
                                :open="openDatePicker"
                                :initialDate="date_end"
                                @updateDate="
                                    $emit('updateDate', {
                                        type: 'end',
                                        date: $event,
                                    })
                                "
                                @updateHour="
                                    $emit('updateHour', {
                                        type: 'end',
                                        hour: $event,
                                    })
                                "
                                @updateMinute="
                                    $emit('updateMinute', {
                                        type: 'end',
                                        minute: $event,
                                    })
                                "
                            />

                            <v-select
                                label="Region"
                                v-model="formState.region"
                                :item-props="itemProps"
                                :items="regionState.data"
                            ></v-select>

                            <v-select
                                label="Comuna"
                                v-model="formState.municipality"
                                :item-props="itemProps"
                                :items="formState.region.municipalityList"
                            ></v-select>
                            <v-text-field
                                label="Dirección"
                                v-model="formState.address"
                            ></v-text-field>
                            <v-autocomplete
                                :key="uniqueKey"
                                v-model="formState.games"
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
                                v-model="formState.slots"
                                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                            ></v-select>

                            <Editor
                                :value="formState.description"
                                @input="formState.description = $event"
                            />
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
const userStore = useUserStore()
const { getRegions, searchGames, createEventInSupabase, getEvents } =
    settingStore
const { regionState, gameState, createEventState } = storeToRefs(settingStore)
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
    date_start: {
        type: String,
        required: true,
    },
    date_end: {
        type: String,
        required: true,
    },
})
const formState = reactive({
    address: '',
    date_start: props.date_start,
    date_end: props.date_end,
    slots: 1,
    region: {},
    description: `
        <h2>
          ¡Hola a todos!,
        </h2>
        <p>
            Están cordialmente invitados a un evento, donde la diversión y la buena comida se mezclan con risas y juegos.
        </p>
        <p>
            Traigan sus comidas favoritas para compartir mientras disfrutamos de una tarde emocionante con los siguientes juegos de mesa:
        </p>
        <ul>
          <li>
            Juego 1
          </li>
          <li>
            Juego 2
          </li>
        </ul>
        <p>
       Esperamos contar con su presencia para disfrutar juntos de una tarde llena de diversión y buenos momentos.
        </p>`,
    games: null,
    municipality: null,
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
watch(
    () => props.date_end,
    (newValue, oldValue) => {
        formState.date_end = newValue
    }
)

watch(
    () => props.date_start,
    (newValue, oldValue) => {
        formState.date_start = newValue
    }
)

watch(createEventState, async (newEvent, oldEvent) => {
    if (newEvent.status == 201) {
        formState.address = ''
        formState.slots = 1
        formState.region = {}
        formState.games = null
        formState.municipality = null
        menuDropdownListOpen.value = false
        getEvents()
        emit('handleClose')
    }
})
const itemProps = (item) => ({
    title: item.name,
})

const createEvent = () => {
    createEventInSupabase(toRaw(formState))
}
</script>
