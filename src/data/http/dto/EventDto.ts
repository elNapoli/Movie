import type { GameDto } from './GameDto'
import type { MunicipalityDto } from './MunicipalityDto'
import type { UserDto } from './UserDto'

export interface EventDto {
    id: string
    create_at: string
    date_start: string
    date_end: string
    host_id: string
    slots: number
    address: string
    games: GameDto[]
    municipalities: MunicipalityDto
    public: boolean
    users: UserDto
}
