import { SupabaseService } from '../services/SupabaseService'
import MenuService from '../services/MenuService'
import AuthService from '../services/AuthService'

const supabaseService = new SupabaseService()

const menuService = new MenuService(supabaseService)
const authService = new AuthService(supabaseService)

export { supabaseService, menuService, authService }
