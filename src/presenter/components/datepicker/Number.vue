<template>
    <v-col>
        <v-row class="d-flex justify-center">
            <v-btn
                icon="mdi-chevron-up"
                @click="increment"
                variant="text"
                color="white"
            ></v-btn>
        </v-row>
        <v-row class="d-flex justify-center">
            <Transition :name="transitionName">
                <span v-if="isNumberEven" class="text-h4 number">
                    {{ timeNumberFormatted(initialNumber) }}
                </span>
                <span v-else class="text-h4 number">
                    {{ timeNumberFormatted(initialNumber) }}
                </span>
            </Transition>
        </v-row>
        <v-row class="d-flex justify-center pt-10">
            <v-btn
                icon="mdi-chevron-down"
                @click="decrement"
                variant="text"
                color="white"
            ></v-btn>
        </v-row>
    </v-col>
</template>
<script setup>
const props = defineProps({
    delta: {
        type: Number,
        default: 1,
    },
    initialNumber: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['onChange'])

const transitionName = ref('slide-up')
const isNumberEven = computed(() => props.initialNumber % 2 === 0)

const increment = () => {
    transitionName.value = 'slide-up'
    emit('onChange', props.initialNumber + props.delta)
}
const decrement = () => {
    transitionName.value = 'slide-down'
    emit('onChange', props.initialNumber - props.delta)
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
