import type { User } from '../models/user'

export interface IAuthRepository {
    getUser: () => Promise<User | null>
    signIn: () => Promise<User | null>
    signOut: () => Promise<null>
}
