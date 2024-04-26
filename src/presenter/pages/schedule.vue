<template>
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
        @delete-event="console.log('Eliminar evengo', $event)"
        @date-was-clicked="createEvent($event)"
        @datetime-was-clicked="createEvent($event)"
    />
</template>

<script setup>
import { Qalendar } from 'qalendar'
const dayJs = useDayjs()
const settingStore = useSettingStore()
const { getEvents, setCurrentEvent, updateEventDates, clearCurrentEvent } =
    settingStore
const { eventState, createEventState } = storeToRefs(settingStore)
const openDialog = ref(false)
const date_start = ref('')
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
