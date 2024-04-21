<template>
    <div>
        <v-text-field
            :label="placeholder"
            :modelValue="formattedDate(initialDate)"
            @update:modelValue="value = $event"
            append-inner-icon="mdi-calendar"
            @update:focused="datepickerOpen = true"
        ></v-text-field>
        <v-dialog v-model="datepickerOpen" max-width="400">
            <v-card>
                <template v-slot:text>
                    <v-row justify="space-around">
                        <v-date-picker
                            :modelValue="initialDate"
                            width="400"
                            @update:modelValue="$emit('updateDate', $event)"
                        >
                            <template #actions>
                                <container
                                    @click="timePickerDialog = true"
                                    class="text-center pa-1 text-h5 w-100"
                                    v-ripple
                                >
                                    <v-icon
                                        icon="mdi-clock-outline"
                                        size="24"
                                        @click="timePickerDialog = true"
                                    ></v-icon>
                                </container>
                            </template>
                        </v-date-picker>
                    </v-row>
                </template>

                <v-card-actions>
                    <span class="ml-7 text-subtitle-1">
                        {{ formattedDate(initialDate) }}
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn
                        text="Aceptar"
                        variant="text"
                        @click="datepickerOpen = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="timePickerDialog"
            persistent
            max-width="240"
            max-height="900"
            transition="dialog-top-transition"
        >
            <v-card>
                <template v-slot:text>
                    <v-row>
                        <DatepickerNumber
                            :initialNumber="initialDate.getHours()"
                            @onChange="$emit('updateHour', $event)"
                        />

                        <DatepickerNumber
                            :initialNumber="initialDate.getMinutes()"
                            :delta="15"
                            @onChange="$emit('updateMinute', $event)"
                        />
                    </v-row>
                </template>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <container
                        @click="dialog2 = fals"
                        class="text-center pa-1 text-h5 w-100"
                        v-ripple
                    >
                        <v-icon
                            icon="mdi-calendar-outline"
                            size="24"
                            @click="timePickerDialog = fals"
                        ></v-icon>
                    </container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
const settingStore = useSettingStore()
const { getCountries, getMunicipalities, getRegions } = settingStore
const { regionList } = storeToRefs(settingStore)
const emit = defineEmits(['updateDate', 'updateHour', 'updateMinute'])
const props = defineProps({
    placeholder: {
        type: String,
        default: 'Seleccionar fecha',
    },
    initialDate: Date,
})

const hora = ref(0)
const datepickerOpen = ref(false)
const timePickerDialog = ref(false)
onMounted(() => {
    getRegions(1) // NOTE:: se deja con el pais 1, que es chile por default
})
</script>
<style>
.number {
    position: absolute;
}
.slide-down-enter-active,
.slide-down-leave-active .slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to,
.slide-down-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}
</style>
