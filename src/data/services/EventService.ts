import type { CountryDto } from '../http/dto/CountryDto'
import type { MenuDto } from '../http/dto/MenuDto'
import type { MunicipalityDto } from '../http/dto/MunicipalityDto'
import type { RegionDto } from '../http/dto/RegionDto'
import type { SupabaseService } from './SupabaseService'

class EventService {
    private client: SupabaseService

    constructor(client: SupabaseService) {
        this.client = client
    }
    async getMenus(): Promise<MenuDto[]> {
        return this.client.getData('menu')
    }

    async getCountries(): Promise<CountryDto[]> {
        return await this.client.getData('countries')
    }
    async getMunicipalities(region_id: string): Promise<MunicipalityDto[]> {
        return this.client
            .getClient()
            .from('municipalities')
            .select()
            .eq('region_id', region_id)
    }
    async getRegions(country_id: string): Promise<RegionDto[]> {
        console.log(country_id)
        return this.client
            .getClient()
            .from('regions')
            .select()
            .eq('country_id', country_id)
    }
}

export default EventService
