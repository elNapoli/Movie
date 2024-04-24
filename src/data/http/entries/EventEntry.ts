import type { Game } from '~~/src/domain/models/Games'

export interface EventEntry {
    date_start: string
    date_end: string
    slots: number
    host_id?: string
    municipality_id: number
    address: string
    games: Game[]
    description: string
}
