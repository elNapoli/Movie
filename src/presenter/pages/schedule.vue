<template>
    {{ pickedDate }}
    <NewEventDialog
        :open="openDialog"
        :date="pickedDate"
        @updateDate="updateDate($event)"
        @updateMinute="updateMinute($event)"
        @updateHour="updateHour($event)"
        @handleClose="openDialog = false"
    />
    <Qalendar
        :events="eventState.data"
        :config="config"
        @edit-event="console.log('Editar evento', $event)"
        @delete-event="console.log('Eliminar evengo')"
        @date-was-clicked="createEvent($event)"
        @datetime-was-clicked="createEvent($event)"
    />
</template>

<script setup>
import { Qalendar } from 'qalendar'
const settingStore = useSettingStore()
const { getEvents } = settingStore
const { eventState } = storeToRefs(settingStore)
const openDialog = ref(false)
const pickedDate = ref('')
const config = {
    locale: 'es-ES',
    showCurrentTime: true,
    defaultMode: 'month',
}
onMounted(() => {
    getEvents()
})
const createEvent = (date) => {
    updateDate(new Date(date))
    openDialog.value = true
}

const updateDate = (newDate) => {
    pickedDate.value = newDate
}
const updateHour = (hour) => {
    const newDate = new Date(pickedDate.value)
    newDate.setHours(hour)
    pickedDate.value = newDate
}
const updateMinute = (minute) => {
    const newDate = new Date(pickedDate.value)
    newDate.setMinutes(minute)
    pickedDate.value = newDate
}
</script>

<style>
@import 'qalendar/dist/style.css';
</style>
