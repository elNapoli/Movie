import { MenuRepository } from '@domain/repositories/MenuRepository'

export const menuService = (repository: MenuRepository): MenuRepository => ({
    getMenus: () => {
        return repository.getMenus()
    },
})
