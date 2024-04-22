export class Game {
    id: string
    name: string
    year_published: number
    constructor(id: string, name: string, year_published: number) {
        this.id = id
        this.name = name
        this.year_published = year_published
    }
}
