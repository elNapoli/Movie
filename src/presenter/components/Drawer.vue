<template>
    <q-drawer :modelValue="open" class="bg-grey-8">
        <q-list dark>
            <q-item-label header>Essential Links</q-item-label>

            <q-item
                v-for="menu in menus"
                clickable
                rel="noopener"
                :to="menu.route"
            >
                <q-item-section avatar>
                    <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label> {{ menu.name }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>

<script setup>
const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
})
import { Menu } from '@domain/models/menu'
import { menuService } from '@domain/services/MenuService'
import { menuRepository } from '@data/instances/supabase/menuRepository'
const menus = ref([])
onMounted(() => {
    menuService(menuRepository)
        .getMenus()
        .then((response) => (menus.value = response))
})
</script>
