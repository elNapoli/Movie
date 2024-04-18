<template>
    <div class="pa-4">
        <DatePickerDialog
            :open="openDatePicker"
            :date="date"
            @pickedDate=";(openDatePicker = false), (date = $event)"
        />
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
                            <v-text-field
                                label="Fecha"
                                readonly
                                append-inner-icon="mdi-calendar"
                                :modelValue="date"
                                @update:modelValue="date = $event"
                                @update:focused="openDatePicker = true"
                            ></v-text-field>
                            <v-select
                                label="Region"
                                :items="[
                                    'California',
                                    'Colorado',
                                    'Florida',
                                    'Georgia',
                                    'Texas',
                                    'Wyoming',
                                ]"
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
const openDatePicker = ref(false)
const emit = defineEmits(['handleClose'])

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
</script>
