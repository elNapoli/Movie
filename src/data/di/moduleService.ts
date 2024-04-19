import { SupabaseService } from '../services/SupabaseService'
import MenuService from '../services/MenuService'

const supabaseService = new SupabaseService()

const menuService = new MenuService(supabaseService)

export { supabaseService, menuService }
