import type { Menu } from '~~/src/domain/models/Menu'
import { settingRepository } from '../di/moduleRepository'
import { Region } from '~~/src/domain/models/Region'
import type { Event } from '~~/src/domain/models/Event'
import type { Game } from '~~/src/domain/models/Games'
import type { BaseResponse } from '~~/src/domain/models/BaseResponse'
import { InitState, LoadingState } from './BaseStore'
import type { EventEntry } from '../http/entries/EventEntry'
const dayJs = useDayjs()
interface State {
    menuState: BaseResponse<Menu[]>
    regionState: BaseResponse<Region[]>
    gameState: BaseResponse<Game[]>
    createEventState: BaseResponse<Boolean>
    deleteEventState: BaseResponse<Boolean>
    eventState: BaseResponse<Event[]>
    eventDataTableState: BaseResponse<Event[]>
    currentEvent: Event
    requestEvent: Event | null
    requestState: BaseResponse<boolean>
}

const initCurrentEventState = {
    id: null,
    title: '',
    time: {
        start: null,
        end: null,
    },
    color: 'green',
    isEditable: false,
    with: null,
    slots: 1,
    public: false,
    description: `
        <h2>
          ¡Hola a todos!,
        </h2>
        <p>
            Están cordialmente invitados a un evento, donde la diversión y la buena comida se mezclan con risas y juegos.
        </p>
        <p>
            Traigan sus comidas favoritas para compartir mientras disfrutamos de una tarde emocionante con los siguientes juegos de mesa:
        </p>
        <ul>
          <li>
            Juego 1
          </li>
          <li>
            Juego 2
          </li>
        </ul>
        <p>
       Esperamos contar con su presencia para disfrutar juntos de una tarde llena de diversión y buenos momentos.
        </p>`,
    games: [],
    location: '',
    address: '',
    municipality: null,
    region: null,
}
export const useSettingStore = defineStore('settingStore', {
    state: (): State => {
        return {
            menuState: InitState<Menu[]>(),
            regionState: InitState<Region[]>(),
            gameState: InitState<Game[]>(),
            createEventState: InitState<Boolean>(),
            eventState: InitState<Event[]>(),
            eventDataTableState: InitState<Event[]>(),
            currentEvent: initCurrentEventState,
            deleteEventState: InitState<Boolean>(),
            requestEvent: null,
            requestState: InitState<Boolean>(),
        }
    },
    getters: {},
    actions: {
        async getMenu() {
            this.menuState = await settingRepository.getMenus()
        },
        updateEventDates(date_start: string, date_end: string) {
            this.currentEvent.time = {
                start: date_start,
                end: date_end,
            }
        },
        clearCurrentEvent() {
            this.currentEvent = initCurrentEventState
        },
        //TODO: refactorizar este codigo, se repite mucho....
        updateDate(data: any) {
            const type = data.type
            const date = dayJs(data.date)
            if (type === 'start') {
                this.currentEvent.time.start = date
                if (
                    this.currentEvent.time.start.diff(
                        this.currentEvent.time.end
                    ) > 0
                ) {
                    this.currentEvent.time.end = this.currentEvent.time.start
                }
            } else if (type === 'end') {
                this.currentEvent.time.end = date
                if (
                    this.currentEvent.time.start.diff(
                        this.currentEvent.time.end
                    ) < 0
                ) {
                    this.currentEvent.time.start = this.currentEvent.time.end
                }
            }
        },
        updateHour(data: any) {
            const type = data.type
            const hour = data.hour

            if (type === 'start') {
                const new_date = this.currentEvent.time.start.hour(hour)
                this.currentEvent.time.start = new_date
                if (
                    this.currentEvent.time.start.diff(
                        this.currentEvent.time.end
                    ) > 0
                ) {
                    this.currentEvent.time.end = this.currentEvent.time.start
                }
            } else if (type === 'end') {
                const new_date = this.currentEvent.time.end.hour(hour)
                this.currentEvent.time.end = new_date
                if (
                    this.currentEvent.time.start.diff(
                        this.currentEvent.time.end
                    ) > 0
                ) {
                    this.currentEvent.time.start = this.currentEvent.time.end
                }
            }
        },
        updateMinute(data: any) {
            const type = data.type
            const minute = data.minute

            if (type === 'start') {
                const new_date = this.currentEvent.time.start.minute(minute)
                this.currentEvent.time.start = new_date
                if (
                    this.currentEvent.time.start.diff(
                        this.currentEvent.time.end
                    ) > 0
                ) {
                    this.currentEvent.time.end = this.currentEvent.time.start
                }
            } else if (type === 'end') {
                const new_date = this.currentEvent.time.end.minute(minute)
                this.currentEvent.time.end = new_date
                if (
                    this.currentEvent.time.start.diff(
                        this.currentEvent.time.end
                    ) > 0
                ) {
                    this.currentEvent.time.start = this.currentEvent.time.end
                }
            }
        },

        async getEvents(byUser: boolean) {
            this.eventState = await settingRepository.getEvents(byUser)
        },
        async getEventsDataTable(date_start, date_end) {
            this.eventDataTableState = LoadingState()
            this.eventDataTableState = await settingRepository.getPublicEvents(
                date_start.format('YYYY-MM-DDTHH:mm:ssZ'),
                date_end.format('YYYY-MM-DDTHH:mm:ssZ')
            )
        },
        async sendRequestToEvent() {
            this.requestState = LoadingState()
            console.log('enviando')
        },
        async loadRequests(schedule_id: string) {
            if (schedule_id !== undefined) {
                this.guestState = LoadingState()
            }
        },
        async draggedEvent(event: Event) {
            const data: EventEntry = {
                date_start: dayJs(event.time.start),
                date_end: dayJs(event.time.end),
                games: event.games,
            }
            this.createEventState = await settingRepository.updateEvent(
                data,
                event.id
            )
        },
        setRequestEvent(event: Event) {
            this.requestEvent = event
        },
        setCurrentEvent(id: string) {
            const event = this.eventState.data.find((t) => t.id === id)
            const updatedEvent = {
                ...event,
                time: {
                    ...event!!.time,
                    end: dayJs(event!!.time.end),
                    start: dayJs(event!!.time.start),
                },
            }
            this.currentEvent = updatedEvent
        },

        async getRegions(country_id: string) {
            this.regionState = await settingRepository.getRegions(country_id)
        },
        async deleteCurrentEvent() {
            this.deleteEventState = LoadingState()
            this.deleteEventState = await settingRepository.deleteEvent(
                this.currentEvent.id,
                this.currentEvent.games
            )
            this.clearCurrentEvent()
            await this.getEvents(true)
        },
        async createOrUpdateEvent() {
            this.createEventState = LoadingState()
            const data: EventEntry = {
                date_start: this.currentEvent.time.start,
                date_end: this.currentEvent.time.end,
                slots: this.currentEvent.slots,
                public: this.currentEvent.public,
                municipality_id: this.currentEvent.municipality!!.id,
                address: this.currentEvent.address,
                games: this.currentEvent.games,
                description: this.currentEvent.description,
            }
            if (this.currentEvent.id !== null) {
                this.createEventState = await settingRepository.updateEvent(
                    data,
                    this.currentEvent.id
                )
            } else {
                this.createEventState =
                    await settingRepository.createEvent(data)
            }
        },
        async searchGames(query: string) {
            this.gameState = LoadingState()
            this.gameState = await settingRepository.searchGames(query)
        },
    },
})
