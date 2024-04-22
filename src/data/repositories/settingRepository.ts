import { Menu } from '@domain/models/menu'
import type { ISettingRepository } from '@domain/repositories/ISettingRepository'
import type EventService from '../services/EventService'
import type { Country } from '~~/src/domain/models/country'
import type { Municipality } from '~~/src/domain/models/municipality'
import type { Region } from '~~/src/domain/models/region'
import type { RegionDto } from '../http/dto/RegionDto'
import type { MunicipalityDto } from '../http/dto/MunicipalityDto'
import type { CountryDto } from '../http/dto/CountryDto'
import type { MenuDto } from '../http/dto/MenuDto'
import type { GameDto } from '../http/dto/GameDto'
import type { Game } from '~~/src/domain/models/games'
import type { BaseResponse } from '~~/src/domain/models/baseResponse'

class SettingRepository implements ISettingRepository {
    private service: EventService
    constructor(service: EventService) {
        this.service = service
    }
    async getMenus(): Promise<BaseResponse<Menu[]>> {
        const data = await this.service.getMenus()
        console.log('que paso con ', data)
        return {
            message: data.error?.message
                ? data.error?.message
                : 'Todo fue un exito',
            status: data.status,
            error: data.error ? true : false,
            data: data.data?.map(
                (dto: MenuDto): Menu => ({
                    id: dto.id,
                    name: dto.name,
                    icon: dto.icon,
                    route: dto.route,
                })
            ),
        }
    }
    async getCountries(): Promise<BaseResponse<Country[]>> {
        const data = await this.service.getCountries()
        return {
            message: data.error?.message
                ? data.error?.message
                : 'Todo fue un exito',
            status: data.status,
            error: data.error ? true : false,
            data: data.data?.map(
                (dto: CountryDto): Country => ({
                    id: dto.id,
                    name: dto.name,
                    code: dto.code,
                })
            ),
        }
    }
    async getMunicipalities(
        region_id: string
    ): Promise<BaseResponse<Municipality[]>> {
        const data = await this.service.getMunicipalities(region_id)
        return {
            message: data.error?.message
                ? data.error?.message
                : 'Todo fue un exito',
            status: data.status,
            error: data.error ? true : false,
            data: data.data?.map(
                (dto: MunicipalityDto): Municipality => ({
                    id: dto.id,
                    name: dto.name,
                    region_id: dto.region_id,
                })
            ),
        }
    }
    async getRegions(country_id: string): Promise<BaseResponse<Region[]>> {
        const data = await this.service.getRegions(country_id)
        return {
            message: data.error?.message
                ? data.error?.message
                : 'Todo fue un exito',
            status: data.status,
            error: data.error ? true : false,
            data: data.data?.map(
                (dto: RegionDto): Region => ({
                    id: dto.id,
                    name: dto.name,
                    country_id: dto.country_id,
                    municipalityList: dto.municipalities,
                })
            ),
        }
    }
    async searchGames(query: string): Promise<BaseResponse<Game[]>> {
        const data = await this.service.searchGames(query)
        return {
            message: data.error?.message
                ? data.error?.message
                : 'Todo fue un exito',
            status: data.status,
            error: data.error ? true : false,
            data: data.data?.map(
                (dto: GameDto): Game => ({
                    id: dto.id,
                    name: dto.name,
                    year_published: dto.year_published,
                })
            ),
        }
    }
    async createEvent(dataEntry: any): Promise<BaseResponse<Boolean>> {
        const data = await this.service.createEvent(dataEntry)
        return {
            message: data.error?.message
                ? data.error?.message
                : 'Todo fue un exito',
            status: data.status,
            error: data.error ? true : false,
            data: true, // TODO: lo deje quemado por mientras, se debe modificar
        }
    }
}

export default SettingRepository
