export class Menu {
    id: string
    name: string
    icon: string
    route: string
    constructor(id: string, name: string, icon: string, route: string) {
        this.id = id
        this.name = name
        this.icon = icon
        this.route = route
    }
}
