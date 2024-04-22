import type { Game } from './Games'

export interface Event {
    id: string
    date: string
    host_name: string
    slots: number
    address: string
    games: Game[]
}
