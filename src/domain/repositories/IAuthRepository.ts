import type { User } from '../models/user'

export interface IAuthRepository {
    getUser: () => Promise<User[]>
}
