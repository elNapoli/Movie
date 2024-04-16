import { Menu } from '@domain/models/menu'
import { MenuRepository } from '@domain/repositories/MenuRepository'
import { Http } from '@domain/repositories/Http'
import { MenuDto } from '@data/http/dto/MenuDto'

export const menuRepositoryImpl = (client: Http): MenuRepository => ({
    getMenus: async () => {
        const data = await client.get<MenuDto>('menu')
        return data.map(
            (dto): Menu => ({
                id: dto.id,
                name: dto.name,
                icon: dto.icon,
                route: dto.route,
            })
        )
    },
})
