import { SupabaseService } from '../services/SupabaseService'
import EventService from '../services/EventService'
import AuthService from '../services/AuthService'

const supabaseService = new SupabaseService()

const eventService = new EventService(supabaseService)
const authService = new AuthService(supabaseService)

export { supabaseService, eventService, authService }
