<template>
    {{ pickedDate }}
    <VueDatePicker v-model="date"></VueDatePicker>
    <NewEventDialog
        :open="openDialog"
        :date="pickedDate"
        @handleClose="openDialog = false"
    />
    <Qalendar
        :events="events"
        :config="config"
        @edit-event="console.log('Editar evento', $event)"
        @delete-event="console.log('Eliminar evengo')"
        @date-was-clicked="createEvent($event)"
        @datetime-was-clicked="createEvent($event)"
    />
</template>

<script setup>
import { Qalendar } from 'qalendar'

const openDialog = ref(false)
const pickedDate = ref('')
const events = [
    // ...
    {
        title: 'Advanced algebra',
        with: 'Chandler Bing',
        time: {
            start: '2024-04-16 12:05',
            end: '2024-04-17 13:35',
        },
        color: 'green',
        isEditable: true,
        id: '753944708f0f',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!',
    },
    {
        title: 'Ralph on holiday',
        with: 'Rachel Greene',
        time: { start: '2022-05-10', end: '2022-05-22' },
        color: 'green',
        isEditable: true,
        id: '5602b6f589fc',
    },
    // ...
]
const config = {
    locale: 'es-ES',
    showCurrentTime: true,
    defaultMode: 'month',
}
const createEvent = (date) => {
    pickedDate.value = new Date(date)
    openDialog.value = true
}
</script>

<style>
@import 'qalendar/dist/style.css';
</style>
