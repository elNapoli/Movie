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
                '*, users(id, email), municipalities(id,name, regions(id, name, municipalities(id,name))), games(id, name,year_published)'
            )
        return data
    }
    async getGamesBeforeUpdate(schedule_id: string): Promise<number[]> {
        const { data, error } = await this.client
            .getClient()
            .from('schedules_games')
            .select('game_id')
            .eq('schedule_id', schedule_id)

        if (error) {
            throw error
        }

        return data.map((row) => row.game_id)
    }
    async deleteGames(schedule_id: string, games_id: number[]): Promise<any> {
        const { error } = await this.client
            .getClient()
            .from('schedules_games')
            .delete()
            .eq('schedule_id', schedule_id)
            .in('game_id', games_id)

        if (error) {
            throw error
        }
    }
    async addGames(schedule_id: string, games) {
        const game_to_insert = games.map((g) => ({
            game_id: g.id,
            schedule_id: schedule_id,
        }))
        return await this.client
            .getClient()
            .from('schedules_games')
            .insert(game_to_insert)
            .select('id')
    }

    async addGamesIntoSchedule(schedule_id: string, games: GameDto[]) {
        const games_before_update = await this.getGamesBeforeUpdate(schedule_id)
        const games_to_delete = games_before_update.filter(
            (gameId) => !games.some((g) => g.id === gameId)
        )
        const games_to_add = games.filter(
            (g) => !games_before_update.includes(g.id)
        )
        await this.deleteGames(schedule_id, games_to_delete)
        return await this.addGames(schedule_id, games_to_add)
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
        return await this.addGames(response.data!![0].id, games)
    }
    async updateEvent(
        data: EventEntry,
        id: string
    ): Promise<BaseResponseDto<boolean>> {
        const games = data.games
        delete data.games
        const response = await this.client
            .getClient()
            .from('schedules')
            .update(data)
            .eq('id', id)
            .select('id')
        if (response.error !== null) {
            return response
        }
        return this.addGamesIntoSchedule(id, games)
    }
    async deleteEvent(
        schedule_id: string,
        games: GameDto[]
    ): Promise<BaseResponseDto<boolean>> {
        const games_to_delete = games.map((g) => g.id)

        await this.deleteGames(schedule_id, games_to_delete)
        return await this.client
            .getClient()
            .from('schedules')
            .delete()
            .eq('id', schedule_id)
    }
}

export default EventService
