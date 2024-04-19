import { Menu } from '@domain/models/menu'
import { IMenuRepository } from '@domain/repositories/IMenuRepository'
import type MenuService from '../services/MenuService'

class MenuRepository implements IMenuRepository {
    private service: MenuService
    constructor(service: MenuService) {
        this.service = service
    }
    async getMenus(): Promise<Menu[]> {
        const data = await this.service.getMenus()
        return data.map(
            (dto): Menu => ({
                id: dto.id,
                name: dto.name,
                icon: dto.icon,
                route: dto.route,
            })
        )
    }
}

export default MenuRepository
