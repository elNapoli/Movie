<template>
    <div class="pa-4">
        <v-dialog
            :modelValue="open"
            @update:value="open = $event"
            max-width="600"
            persistent
            transition="dialog-bottom-transition"
        >
            <v-card prepend-icon="mdi-update" title="Agendar nueva junta">
                <v-card-text>
                    <v-form>
                        <v-col cols="12">
                            <DatepickerTextField
                                :open="openDatePicker"
                                :initialDate="date"
                                @updateDate="$emit('updateDate', $event)"
                                @updateHour="$emit('updateHour', $event)"
                                @updateMinute="$emit('updateMinute', $event)"
                            />
                            <v-select
                                label="Region"
                                :item-props="itemProps"
                                :items="regionList"
                            ></v-select>

                            <v-text-field label="Dirección"></v-text-field>
                        </v-col>
                    </v-form>
                </v-card-text>
                <template v-slot:actions>
                    <v-btn
                        class="ms-auto"
                        text="Cancelar"
                        @click="$emit('handleClose')"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
const settingStore = useSettingStore()
const { getCountries, getMunicipalities, getRegions } = settingStore
const { regionList } = storeToRefs(settingStore)
const openDatePicker = ref(false)
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
onMounted(() => {
    getRegions(1) // TODO: se deja con el pais 1, que es chile por default
})

const itemProps = (item) => ({
    title: item.name,
})
</script>
