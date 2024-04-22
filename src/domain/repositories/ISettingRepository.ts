import type { Menu } from '@domain/models/menu'
import type { Country } from '../models/country'
import type { Municipality } from '../models/municipality'
import type { Region } from '../models/region'
import type { Game } from '../models/games'
import type { BaseResponse } from '../models/baseResponse'

export interface ISettingRepository {
    getMenus: () => Promise<BaseResponse<Menu[]>>
    getCountries: () => Promise<BaseResponse<Country[]>>
    getMunicipalities: (
        region_id: string
    ) => Promise<BaseResponse<Municipality[]>>
    getRegions: (country_id: string) => Promise<BaseResponse<Region[]>>
    searchGames: (query: string) => Promise<BaseResponse<Game[]>>
    createEvent: (dataEntry: any) => Promise<BaseResponse<Boolean>>
}
