import type { Menu } from '~~/src/domain/models/Menu'
import { settingRepository } from '../di/moduleRepository'
import { Region } from '~~/src/domain/models/Region'
import type { Game } from '~~/src/domain/models/Games'
import type { BaseResponse } from '~~/src/domain/models/BaseResponse'
import { InitState, LoadingState } from './BaseStore'
import type { EventEntry } from '../http/entries/EventEntry'

interface State {
    menuState: BaseResponse<Menu[]>
    regionState: BaseResponse<Region[]>
    gameState: BaseResponse<Game[]>
    createEventState: BaseResponse<Boolean>
    eventState: BaseResponse<Event[]>
}
export const useSettingStore = defineStore('settingStore', {
    state: (): State => {
        return {
            menuState: InitState<Menu[]>(),
            regionState: InitState<Region[]>(),
            gameState: InitState<Game[]>(),
            createEventState: InitState<Boolean>(),
            eventState: InitState<Event[]>(),
        }
    },
    getters: {},
    actions: {
        async getMenu() {
            this.menuState = await settingRepository.getMenus()
        },
        async getEvents() {
            this.eventState = await settingRepository.getEvents()
        },

        async getRegions(country_id: string) {
            this.regionState = await settingRepository.getRegions(country_id)
        },
        async createEventInSupabase(form: any) {
            const data: EventEntry = {
                date: form.date,
                slots: form.slots,
                host_id: form.host_id,
                municipality_id: form.municipality.id,
                address: form.address,
                games: form.games,
            }
            this.createEventState = await settingRepository.createEvent(data)
        },
        async searchGames(query: string) {
            this.gameState = LoadingState()
            this.gameState = await settingRepository.searchGames(query)
        },
    },
})
