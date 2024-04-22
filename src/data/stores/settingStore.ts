import type { Menu } from '~~/src/domain/models/menu'
import { settingRepository } from '../di/moduleRepository'
import type { Country } from '~~/src/domain/models/country'
import type { Region } from '~~/src/domain/models/region'
import type { Municipality } from '~~/src/domain/models/municipality'
import type { Game } from '~~/src/domain/models/games'

interface State {
    menuList: Menu[]
    regionList: Region[]
    municipalityList: Municipality[]
    countryList: Country[]
    gameList: Game[]
    loadingGames: Boolean
}

export const useSettingStore = defineStore('settingStore', {
    state: (): State => {
        return {
            menuList: [],
            countryList: [],
            regionList: [],
            municipalityList: [],
            gameList: [],
            loadingGames: false,
        }
    },
    getters: {},
    actions: {
        async getMenu() {
            this.menuList = await settingRepository.getMenus()
        },
        async getCountries() {
            this.countryList = await settingRepository.getCountries()
        },
        async getMunicipalities(region_id: string) {
            this.municipalityList =
                await settingRepository.getMunicipalities(region_id)
        },
        async getRegions(country_id: string) {
            this.regionList = await settingRepository.getRegions(country_id)
        },
        async searchGames(query: string) {
            this.loadingGames = true
            this.gameList = await settingRepository.searchGames(query)
            this.loadingGames = false
        },
    },
})
