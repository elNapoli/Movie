import type { Menu } from '~~/src/domain/models/Menu'
import { settingRepository } from '../di/moduleRepository'
import { Region } from '~~/src/domain/models/Region'
import type { Game } from '~~/src/domain/models/Games'
import type { BaseResponse } from '~~/src/domain/models/BaseResponse'
import { InitState, LoadingState } from './BaseStore'

interface State {
    menuState: BaseResponse<Menu[]>
    regionState: BaseResponse<Region[]>
    gameState: BaseResponse<Game[]>
}
export const useSettingStore = defineStore('settingStore', {
    state: (): State => {
        return {
            menuState: InitState<Menu[]>(),
            regionState: InitState<Region[]>(),
            gameState: InitState<Game[]>(),
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
            await settingRepository.createEvent(form)
        },
        async searchGames(query: string) {
            this.gameState = LoadingState()
            this.gameState = await settingRepository.searchGames(query)
        },
    },
})
