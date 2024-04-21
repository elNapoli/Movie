import { Menu } from '@domain/models/menu'

export interface IMenuRepository {
    getMenus: () => Promise<Menu[]>
}
