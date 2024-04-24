import type { CountryDto } from '../http/dto/CountryDto'
import type { GameDto } from '../http/dto/GameDto'
import type { MenuDto } from '../http/dto/MenuDto'
import type { MunicipalityDto } from '../http/dto/MunicipalityDto'
import type { RegionDto } from '../http/dto/RegionDto'
import type { BaseResponseDto } from '../http/dto/BaseResponseDto'
import type { SupabaseService } from './SupabaseService'
import type { EventEntry } from '../http/entries/EventEntry'
import type { EventDto } from '../http/dto/EventDto'

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
            .select(
                `id, created_at, name, municipalities(id, created_at, name)`
            )
            .eq('country_id', country_id)
    }

    async searchGames(query: string): Promise<BaseResponseDto<GameDto[]>> {
        return await this.client
            .getClient()
            .from('games')
            .select()
            .ilike('name', `%${query}%`)
    }
    async getEvents(): Promise<BaseResponseDto<EventDto[]>> {
        const data = await this.client
            .getClient()
            .from('schedules')
            .select(
                '*, users(id, email), municipalities(id,name, regions(id, name)), games(id, name,year_published)'
            )
        return data
    }
    async createEvent(data: EventEntry): Promise<BaseResponseDto<boolean>> {
        const games = data.games
        delete data.games
        const response = await this.client
            .getClient()
            .from('schedules')
            .insert(data)
            .select('id')
        if (response.error !== null) {
            return response
        }
        const game_to_insert = games.map((g) => ({
            game_id: g.id,
            schedule_id: response.data!![0].id,
        }))
        return await this.client
            .getClient()
            .from('schedules_games')
            .insert(game_to_insert)
            .select('id')
    }
}

export default EventService
