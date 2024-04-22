import type { User } from '../models/User'

export interface IAuthRepository {
    getUser: () => Promise<User | null>
    signIn: () => Promise<User | null>
    signOut: () => Promise<null>
}
