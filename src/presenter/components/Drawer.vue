<template>
    <v-navigation-drawer :modelValue="open" @update:modelValue="open = $event">
        <v-card class="mx-auto" max-width="300">
            <v-list density="compact">
                <v-list-subheader>Menu</v-list-subheader>

                <v-list-item
                    v-for="(item, i) in menus"
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
import { defineProps, ref, onMounted } from 'vue'
import { Menu } from '@domain/models/menu'
import { menuService } from '@domain/services/MenuService'
import { menuRepository } from '@data/instances/supabase/menuRepository'

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
})

const menus = ref([])
onMounted(() => {
    menuService(menuRepository)
        .getMenus()
        .then((response) => (menus.value = response))
})
</script>
