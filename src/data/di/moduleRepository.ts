import MenuRepository from '../repositories/menuRepository'
import { menuService } from './moduleService'

const menuRepository = new MenuRepository(menuService)

export { menuRepository }
