import type { Municipality } from './municipality'

export class Region {
    id: string
    name: string
    country_id: number
    municipalityList: Municipality[]
    constructor(
        id: string,
        name: string,
        country_id: number,
        municipalityList: Municipality[]
    ) {
        this.id = id
        this.name = name
        this.country_id = country_id
        this.municipalityList = municipalityList
    }
}
