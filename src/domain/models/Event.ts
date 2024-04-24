import type { Game } from './Games'

export interface Event {
    id: string
    title: string
    time: {
        start: string
        end: string
    }
    color: string
    isEditable: boolean
    with: string
    description: string
    address: string
    games: Game[]
    municipality: string
    region: string
}
