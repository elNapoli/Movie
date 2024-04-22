import type { Game } from '~~/src/domain/models/Games'

export interface EventEntry {
    date: string
    slots: number
    host_id?: string
    municipality_id: number
    address: string
    games: Game[]
}
