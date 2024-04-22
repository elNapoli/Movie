<template>
    <v-navigation-drawer :modelValue="open" @update:modelValue="open = $event">
        <v-card class="mx-auto" max-width="300">
            <v-list density="compact">
                <v-list-subheader>Menu</v-list-subheader>

                <v-list-item
                    v-if="menuState !== null"
                    v-for="(item, i) in menuState.data"
                    :key="i"
                    :to="item.route"
                    :value="item"
                    color="primary"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-navigation-drawer>
</template>

<script setup>
const settingStore = useSettingStore()

const { menuState } = storeToRefs(settingStore)
const { getMenu } = settingStore

onMounted(() => {
    getMenu()
})
</script>
