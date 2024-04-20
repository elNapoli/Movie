import type { UserDto } from '../http/dto/UserDto'
import type { SupabaseService } from './SupabaseService'

class Authservice {
    private client: SupabaseService

    constructor(client: SupabaseService) {
        this.client = client
    }
    async getUser(): Promise<UserDto | null> {
        const { data } = await this.client.getClient().auth.getUser()
        if (data.user !== null) {
            const userDto: UserDto = {
                id: data.user.id,
                email: data.user.email!!,
                last_sign_in_at: data.user.last_sign_in_at!!,
                phone: data.user.phone!!,
                role: data.user.role!!,
            }
            return userDto
        }
        return null
    }
}

export default Authservice
