import type { CountryDto } from '../http/dto/CountryDto'
import type { GameDto } from '../http/dto/GameDto'
import type { MenuDto } from '../http/dto/MenuDto'
import type { MunicipalityDto } from '../http/dto/MunicipalityDto'
import type { RegionDto } from '../http/dto/RegionDto'
import type { BaseResponseDto } from '../http/dto/BaseResponseDto'
import type { SupabaseService } from './SupabaseService'

class EventService {
    private client: SupabaseService

    constructor(client: SupabaseService) {
        this.client = client
    }
    async getMenus(): Promise<BaseResponseDto<MenuDto[]>> {
        return this.client.getClient().from('menu').select()
    }

    async getCountries(): Promise<BaseResponseDto<CountryDto[]>> {
        return await this.client.getClient().from('countries').select()
    }
    async getMunicipalities(
        region_id: string
    ): Promise<BaseResponseDto<MunicipalityDto[]>> {
        return await this.client
            .getClient()
            .from('municipalities')
            .select()
            .eq('region_id', region_id)
    }
    async getRegions(
        country_id: string
    ): Promise<BaseResponseDto<RegionDto[]>> {
        return await this.client
            .getClient()
            .from('regions')
            .select()
            .eq('country_id', country_id)
    }

    async searchGames(query: string): Promise<BaseResponseDto<GameDto[]>> {
        return await this.client
            .getClient()
            .from('games')
            .select()
            .ilike('name', `%${query}%`)
    }
    async createEvent(data): Promise<BaseResponseDto<Boolean>> {
        return this.client.getClient().from('games').insert(data)
    }
}

export default EventService
