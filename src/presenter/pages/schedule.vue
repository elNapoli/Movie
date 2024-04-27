<template>
    <LoaderFullScreen :isLoading="deleteEventState.status == 1000" />
    <v-dialog v-model="open_dialog_delete" max-width="600">
        <v-card
            prepend-icon="mdi-map-marker"
            text="Si eliminas esta junta no se podrá recuperar"
            title="¿Seguro que deseas eliminar esta junta?"
        >
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="open_dialog_delete = false"> Cancelar </v-btn>

                <v-btn @click="confirmDelete"> Eliminar</v-btn>
            </template>
        </v-card>
    </v-dialog>
    <NewEventDialog
        :open="openDialog"
        @updateMinute="updateMinute($event)"
        @updateHour="updateHour($event)"
        @handleClose="closeDialog()"
    />
    <Qalendar
        :events="eventState.data"
        :config="config"
        @edit-event="editEvent($event)"
        @delete-event="deleteEvent($event)"
        @date-was-clicked="createEvent($event)"
        @datetime-was-clicked="createEvent($event)"
        @event-was-dragged="draggedEvent($event)"
    />
</template>

<script setup>
import { Qalendar } from 'qalendar'
const dayJs = useDayjs()
const settingStore = useSettingStore()
const {
    getEvents,
    setCurrentEvent,
    updateEventDates,
    clearCurrentEvent,
    deleteCurrentEvent,
    draggedEvent,
} = settingStore
const { eventState, createEventState, deleteEventState } =
    storeToRefs(settingStore)
const openDialog = ref(false)
const date_start = ref('')
const open_dialog_delete = ref(false)
const date_end = ref('')
const config = {
    locale: 'es-ES',
    showCurrentTime: true,
    defaultMode: 'month',
}
onMounted(() => {
    getEvents()
})
const editEvent = (id) => {
    setCurrentEvent(id)
    openDialog.value = true
}
const confirmDelete = () => {
    deleteCurrentEvent()
    open_dialog_delete.value = false
}
const deleteEvent = (id) => {
    setCurrentEvent(id)
    open_dialog_delete.value = true
}
const closeDialog = () => {
    openDialog.value = false
    clearCurrentEvent()
    getEvents()
}
const createEvent = (date) => {
    const new_date = dayJs(date)

    date_start.value = new_date
    date_end.value = new_date.add(3, 'hour')
    updateEventDates(new_date, new_date.add(3, 'hour'))
    openDialog.value = true
}
watch(
    () => createEventState,
    (newValue, oldValue) => {
        if (newValue.status == 201) {
            opendialog.value = false
        }
    }
)

const updateHour = (data) => {
    const type = data.type
    const hour = data.hour

    if (type === 'start') {
        const new_date = date_start.value.hour(hour)
        date_start.value = new_date
    } else if (type === 'end') {
        const new_date = date_end.value.hour(hour)
        date_end.value = new_date
    }
}
const updateMinute = (data) => {
    const type = data.type
    const minute = data.minute
    if (type === 'start') {
        const new_date = date_start.value.minute(minute)
        date_start.value = new_date
    } else if (type === 'end') {
        const new_date = date_end.value.minute(minute)
        date_end.value = new_date
    }
}
</script>

<style>
@import 'qalendar/dist/style.css';
</style>
