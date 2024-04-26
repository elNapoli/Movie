import SettingRepository from '../repositories/settingRepository'
import AuthRepository from '../repositories/authRepository'
import { authService, eventService } from './moduleService'

const settingRepository = new SettingRepository(eventService)
const authRepository = new AuthRepository(authService)

export { settingRepository, authRepository }
