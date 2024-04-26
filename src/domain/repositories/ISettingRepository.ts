import type { Menu } from '@domain/models/Menu'
import type { Country } from '../models/Country'
import type { Municipality } from '../models/Municipality'
import type { Region } from '../models/Region'
import type { Game } from '../models/Games'
import type { BaseResponse } from '../models/BaseResponse'
import type { Event } from '../models/Event'

export interface ISettingRepository {
    getMenus: () => Promise<BaseResponse<Menu[]>>
    getCountries: () => Promise<BaseResponse<Country[]>>
    getMunicipalities: (
        region_id: string
    ) => Promise<BaseResponse<Municipality[]>>
    getRegions: (country_id: string) => Promise<BaseResponse<Region[]>>
    searchGames: (query: string) => Promise<BaseResponse<Game[]>>
    createEvent: (dataEntry: any) => Promise<BaseResponse<boolean>>
    updateEvent: (dataEntry: any, id: string) => Promise<BaseResponse<boolean>>
    getEvents: () => Promise<BaseResponse<Event[]>>
}
