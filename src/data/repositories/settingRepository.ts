import type { ISettingRepository } from '@domain/repositories/ISettingRepository'
import type { Country } from '~~/src/domain/models/Country'
import type { Municipality } from '~~/src/domain/models/Municipality'
import type { Region } from '~~/src/domain/models/Region'
import type { RegionDto } from '../http/dto/RegionDto'
import type { MunicipalityDto } from '../http/dto/MunicipalityDto'
import type { CountryDto } from '../http/dto/CountryDto'
import type { MenuDto } from '../http/dto/MenuDto'
import type { GameDto } from '../http/dto/GameDto'
import type { Game } from '~~/src/domain/models/Games'
import type { BaseResponse } from '~~/src/domain/models/BaseResponse'
import BaseRepository from './BaseRepository'
import type { Menu } from '~~/src/domain/models/Menu'
import type { Event } from '~~/src/domain/models/Event'
import type { EventDto } from '../http/dto/EventDto'

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
    async updateEvent(
        dataEntry: any,
        id: string
    ): Promise<BaseResponse<boolean>> {
        return this.handleResponse(
            this.service.updateEvent(dataEntry, id),
            () => true
        )
    }
    async deleteEvent(
        id: string,
        games: Game[]
    ): Promise<BaseResponse<boolean>> {
        return this.handleResponse(
            this.service.deleteEvent(id, games),
            () => true
        )
    }
    async createEvent(dataEntry: any): Promise<BaseResponse<boolean>> {
        return this.handleResponse(
            this.service.createEvent(dataEntry),
            () => true
        )
    }
    async getEvents(byUser: boolean): Promise<BaseResponse<Event[]>> {
        const dayjs = useDayjs()
        return this.handleResponse(
            this.service.getEvents(byUser),
            (dataResponse: EventDto[]): Event[] =>
                dataResponse.map(
                    (dto: EventDto): Event => ({
                        id: dto.id,
                        time: {
                            start: dayjs(dto.date_start).format(
                                'YYYY-MM-DD HH:mm'
                            ),
                            end: dayjs(dto.date_end).format('YYYY-MM-DD HH:mm'),
                        },
                        color: 'green',
                        region: dto.municipalities.regions,
                        municipality: dto.municipalities,
                        address: dto.address,
                        slots: dto.slots,
                        isEditable: dto.isEditable,
                        public: dto.public,
                        with: dto.users.email,
                        description: dto.description,
                        title: `Junta de ${dto.users.email}`,
                        location: `${dto.municipalities.regions!!.name} ${dto.municipalities.name} ${dto.address}`,
                        games: dto.games.map(
                            (game: GameDto): Game => ({
                                id: game.id,
                                name: game.name,
                                year_published: game.year_published,
                            })
                        ),
                    })
                )
        )
    }
    async getPublicEvents(
        date_start: string,
        date_end: string
    ): Promise<BaseResponse<Event[]>> {
        const dayjs = useDayjs()
        return this.handleResponse(
            this.service.getPublicEvents(date_start, date_end),
            (dataResponse: EventDto[]): Event[] =>
                dataResponse.map(
                    (dto: EventDto): Event => ({
                        id: dto.id,
                        time: {
                            start: dayjs(dto.date_start).format(
                                'DD-MM-YYYY HH:mm'
                            ),
                            end: dayjs(dto.date_end).format('DD-MM-YYYY HH:mm'),
                        },
                        color: 'green',
                        region: dto.municipalities.regions,
                        municipality: dto.municipalities,
                        address: dto.address,
                        slots: dto.slots,
                        isEditable: dto.isEditable,
                        public: dto.public,
                        with: dto.users.email,
                        description: dto.description,
                        title: `Junta de ${dto.users.email}`,
                        location: `${dto.municipalities.regions!!.name} ${dto.municipalities.name} ${dto.address}`,
                        games: dto.games.map(
                            (game: GameDto): Game => ({
                                id: game.id,
                                name: game.name,
                                year_published: game.year_published,
                            })
                        ),
                    })
                )
        )
    }
}

export default SettingRepository
