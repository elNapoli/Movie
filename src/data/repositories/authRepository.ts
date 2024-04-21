import type { IAuthRepository } from '@domain/repositories/IAuthRepository'
import type AuthService from '../services/AuthService'
import type { User } from '@domain/domain/models/user'

class AuthRepository implements IAuthRepository {
    private service: AuthService
    constructor(service: AuthService) {
        this.service = service
    }
    async getUser(): Promise<User> {
        return await this.service.getUser()
    }
    async signIn(): Promise<User> {
        return await this.service.signIn()
    }
    async signOut(): Promise<null> {
        return await this.service.signOut()
    }
}

export default AuthRepository
