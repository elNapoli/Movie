import { Menu } from '@domain/models/menu'
import type { Country } from '../models/country'
import type { Municipality } from '../models/municipality'
import type { Region } from '../models/region'
import type { Game } from '../models/games'

export interface ISettingRepository {
    getMenus: () => Promise<Menu[]>
    getCountries: () => Promise<Country[]>
    getMunicipalities: (region_id: string) => Promise<Municipality[]>
    getRegions: (country_id: string) => Promise<Region[]>
    searchGames: (query: string) => Promise<Game[]>
}
