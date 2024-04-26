import type { Game } from './Games'
import type { Municipality } from './Municipality'
import type { Region } from './Region'

export class Event {
    id: string | null
    title: string
    time: {
        start: string
        end: string
    }
    color: string
    isEditable: boolean
    public: boolean
    with: string | null
    description: string
    games: Game[]
    location: string
    address: string
    region: Region | null
    municipality: Municipality | null
    constructor(date_start?: string, date_end?: string, event?: Event) {
        if (event) {
            this.id = event.id
            this.title = event.title
            this.time = {
                start: event.time.start,
                end: event.time.end,
            }
            this.color = event.color
            this.isEditable = event.isEditable
            this.with = event.with
            this.public = event.public
            this.description = event.description
            this.games = event.games
            this.location = event.location
            this.address = event.address
            this.region = event.region
            this.municipality = event.municipality
        } else {
            this.id = null
            this.title = ''
            this.time = {
                start: date_start ? date_start : '',
                end: date_end ? date_end : '',
            }
            this.color = 'green'
            this.isEditable = false
            this.with = null
            this.public = false
            this.description = ''
            this.games = []
            this.location = ''
            this.address = ''
            this.region = null
            this.municipality = null
        }
    }
}
