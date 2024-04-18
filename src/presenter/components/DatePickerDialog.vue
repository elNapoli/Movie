<template>
    <div class="pa-4 text-center">
        <v-text-field
            label="Fecha del evento"
            append-inner-icon="mdi-calendar"
            @update:focused="dialog = true"
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <template v-slot:text>
                    <v-row justify="space-around">
                        <v-date-picker width="400">
                            <template #actions>
                                <container
                                    @click="dialog2 = true"
                                    class="text-center pa-1 text-h5 w-100"
                                    v-ripple
                                >
                                    <v-icon
                                        icon="mdi-clock-outline"
                                        size="24"
                                        @click="dialog2 = true"
                                    ></v-icon>
                                </container>
                            </template>
                        </v-date-picker>
                    </v-row>
                </template>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Aceptar"
                        variant="text"
                        @click="dialog = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialog2"
            persistent
            max-width="240"
            max-height="900"
            transition="dialog-top-transition"
        >
            <v-card>
                <template v-slot:text>
                    <v-row>
                        <v-col>
                            <v-row class="d-flex justify-center">
                                <v-btn
                                    icon="mdi-chevron-up"
                                    @click="incrementHour"
                                    variant="text"
                                    color="white"
                                ></v-btn>
                            </v-row>
                            <v-row class="d-flex justify-center">
                                <Transition :name="transitionName">
                                    <span
                                        v-if="isHourEven"
                                        class="text-h4 number"
                                    >
                                        {{ formattedHour }}
                                    </span>
                                    <span v-else class="text-h4 number">
                                        {{ formattedHour }}
                                    </span>
                                </Transition>
                            </v-row>
                            <v-row class="d-flex justify-center pt-10">
                                <v-btn
                                    icon="mdi-chevron-down"
                                    @click="decrementHour"
                                    variant="text"
                                    color="white"
                                ></v-btn>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row class="d-flex justify-center">
                                <v-btn
                                    icon="mdi-chevron-up"
                                    @click="incrementMinute"
                                    variant="text"
                                    color="white"
                                ></v-btn>
                            </v-row>
                            <v-row class="d-flex justify-center">
                                <Transition :name="transitionName">
                                    <span
                                        v-if="isMinuteEven"
                                        class="text-h4 number"
                                    >
                                        {{ formattedMinutes }}
                                    </span>
                                    <span v-else class="text-h4 number">
                                        {{ formattedMinutes }}
                                    </span>
                                </Transition>
                            </v-row>
                            <v-row class="d-flex justify-center pt-10">
                                <v-btn
                                    icon="mdi-chevron-down"
                                    @click="decrementMinute"
                                    variant="text"
                                    color="white"
                                ></v-btn>
                            </v-row>
                        </v-col>
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
                            @click="dialog2 = fals"
                        ></v-icon>
                    </container>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog3" width="auto">
            <v-card title="Dialog 3">
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Close"
                        variant="text"
                        @click="dialog3 = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
const minutes = ref(0)
const hour = ref(0)
const transitionName = ref('slide-up')
const dialog = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
const docState = ref('saved')
const isHourEven = computed(() => hour.value % 2 === 0)
const isMinuteEven = computed(() => minutes.value % 2 === 0)
const formattedHour = computed(() => {
    if (hour.value < 10) {
        return `0${hour.value}`
    }

    return `${hour.value}`
})
const formattedMinutes = computed(() => {
    if (minutes.value < 10) {
        return `0${minutes.value}`
    }

    return `${minutes.value}`
})

const incrementHour = () => {
    transitionName.value = 'slide-up'
    if (hour.value < 23) {
        hour.value++
    }
}
const decrementHour = () => {
    transitionName.value = 'slide-down'
    if (hour.value > 0) {
        hour.value--
    }
}
const incrementMinute = () => {
    transitionName.value = 'slide-up'
    if (minutes.value < 59) {
        minutes.value++
    }
}
const decrementMinute = () => {
    transitionName.value = 'slide-down'
    if (minutes.value > 0) {
        minutes.value--
    }
}
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
