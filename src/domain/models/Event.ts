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
}
