import { Menu } from '@domain/models/menu'

export interface MenuRepository {
    getMenus: () => Promise<Menu[]>
}
