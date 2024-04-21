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

class SettingRepository implements ISettingRepository {
    private service: EventService
    constructor(service: EventService) {
        this.service = service
    }
    async getMenus(): Promise<Menu[]> {
        const data = await this.service.getMenus()
        return data.map(
            (dto: MenuDto): Menu => ({
                id: dto.id,
                name: dto.name,
                icon: dto.icon,
                route: dto.route,
            })
        )
    }
    async getCountries(): Promise<Country[]> {
        const data = await this.service.getCountries()
        return data.map(
            (dto: CountryDto): Country => ({
                id: dto.id,
                name: dto.name,
                code: dto.code,
            })
        )
    }
    async getMunicipalities(region_id: string): Promise<Municipality[]> {
        const data = await this.service.getMunicipalities(region_id)
        return data.map(
            (dto: MunicipalityDto): Municipality => ({
                id: dto.id,
                name: dto.name,
                region_id: dto.region_id,
            })
        )
    }
    async getRegions(country_id: string): Promise<Region[]> {
        const data = await this.service.getRegions(country_id)
        return data.data.map(
            (dto: RegionDto): Region => ({
                id: dto.id,
                name: dto.name,
                country_id: dto.country_id,
            })
        )
    }
}

export default SettingRepository
