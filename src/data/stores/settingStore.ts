import type { Menu } from '~~/src/domain/models/menu'
import { menuRepository } from '../di/moduleRepository'

interface State {
    menuList: Menu[]
}

export const useSettingStore = defineStore('settingStore', {
    state: (): State => {
        return {
            menuList: [],
        }
    },
    getters: {},
    actions: {
        async getMenu() {
            this.menuList = await menuRepository.getMenus()
        },
    },
})
