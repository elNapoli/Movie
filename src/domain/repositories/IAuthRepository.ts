import type { User } from '../models/user'

export interface IAuthRepository {
    getUser: () => Promise<User>
    signIn: () => Promise<User>
    SignOut: () => Promise<null>
}
