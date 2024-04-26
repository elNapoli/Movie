import type { Game } from '~~/src/domain/models/Games'

export interface EventEntry {
    date_start: string
    date_end: string
    slots: number
    municipality_id: number
    address: string
    public: boolean
    games: Game[]
    description: string
}
