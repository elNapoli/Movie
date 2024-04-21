import type { MenuDto } from '../http/dto/MenuDto'
import type { SupabaseService } from './SupabaseService'

class MenuService {
    private client: SupabaseService

    constructor(client: SupabaseService) {
        this.client = client
    }
    async getMenus(): Promise<MenuDto[]> {
        return this.client.getData('menu')
    }
}

export default MenuService
