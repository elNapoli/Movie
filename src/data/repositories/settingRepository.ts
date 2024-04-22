import type { Menu } from '@domain/models/menu'
import type { ISettingRepository } from '@domain/repositories/ISettingRepository'
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
import BaseRepository from './BaseRepository'

class SettingRepository extends BaseRepository implements ISettingRepository {
    async getMenus(): Promise<BaseResponse<Menu[]>> {
        return this.handleResponse(
            this.service.getMenus(),
            (dataResponse: MenuDto[]): Menu[] =>
                dataResponse.map((dto: MenuDto) => ({
                    id: dto.id,
                    name: dto.name,
                    icon: dto.icon,
                    route: dto.route,
                }))
        )
    }
    async getCountries(): Promise<BaseResponse<Country[]>> {
        return this.handleResponse(
            this.service.getCountries(),
            (dataResponse: CountryDto[]): Country[] =>
                dataResponse.map(
                    (dto: CountryDto): Country => ({
                        id: dto.id,
                        name: dto.name,
                        code: dto.code,
                    })
                )
        )
    }
    async getMunicipalities(
        region_id: string
    ): Promise<BaseResponse<Municipality[]>> {
        return this.handleResponse(
            this.service.getMunicipalities(region_id),
            (dataResponse: MunicipalityDto[]): Municipality[] =>
                dataResponse.map(
                    (dto: MunicipalityDto): Municipality => ({
                        id: dto.id,
                        name: dto.name,
                        region_id: dto.region_id,
                    })
                )
        )
    }
    async getRegions(country_id: string): Promise<BaseResponse<Region[]>> {
        return this.handleResponse(
            this.service.getRegions(country_id),
            (dataResponse: RegionDto[]): Region[] =>
                dataResponse.map(
                    (dto: RegionDto): Region => ({
                        id: dto.id,
                        name: dto.name,
                        country_id: dto.country_id,
                        municipalityList: dto.municipalities,
                    })
                )
        )
    }
    async searchGames(query: string): Promise<BaseResponse<Game[]>> {
        return this.handleResponse(
            this.service.searchGames(query),
            (dataResponse: GameDto[]): Game[] =>
                dataResponse.map(
                    (dto: GameDto): Game => ({
                        id: dto.id,
                        name: dto.name,
                        year_published: dto.year_published,
                    })
                )
        )
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
