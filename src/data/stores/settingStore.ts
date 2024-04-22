import type { Menu } from '~~/src/domain/models/menu'
import { settingRepository } from '../di/moduleRepository'
import type { Region } from '~~/src/domain/models/region'
import type { Game } from '~~/src/domain/models/games'
import type { BaseResponse } from '~~/src/domain/models/baseResponse'

interface State {
    menuState: BaseResponse<Menu[]> | null
    regionState: BaseResponse<Region[]> | null
    gameState: BaseResponse<Game[]> | null
    loadingGames: Boolean
    loadingCreateEvent: Boolean
    error: Boolean
}

export const useSettingStore = defineStore('settingStore', {
    state: (): State => {
        return {
            menuState: null,
            regionState: null,
            gameState: null,
            loadingGames: false,
            loadingCreateEvent: false,
            error: false,
        }
    },
    getters: {},
    actions: {
        async getMenu() {
            this.menuState = await settingRepository.getMenus()
        },

        async getRegions(country_id: string) {
            this.regionState = await settingRepository.getRegions(country_id)
        },
        async createEventInSupabase(form: any) {
            this.loadingGames = true
            await settingRepository.createEvent(form)
            this.loadingGames = false
        },
        async searchGames(query: string) {
            this.loadingGames = true
            this.gameState = await settingRepository.searchGames(query)
            this.loadingGames = false
        },
    },
})
