import MenuRepository from '../repositories/menuRepository'
import AuthRepository from '../repositories/authRepository'
import { authService, menuService } from './moduleService'

const menuRepository = new MenuRepository(menuService)
const authRepository = new AuthRepository(authService)

export { menuRepository, authRepository }
