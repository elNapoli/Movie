export class Municipality {
    id: string
    name: string
    region_id: number
    constructor(id: string, name: string, region_id: number) {
        this.id = id
        this.name = name
        this.region_id = region_id
    }
}
