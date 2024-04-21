import type { User } from '~~/src/domain/models/user'
import { authRepository } from '../di/moduleRepository'

interface State {
    user: User | null
}
export const useUserStore = defineStore('userStore', {
    state: (): State => {
        return {
            user: null,
        }
    },
    getters: {},
    actions: {
        async initUser() {
            this.user = await authRepository.getUser()
        },
        async signIn() {
            await authRepository.signIn()
        },
        async signOut() {
            this.user = await authRepository.signOut()
        },
    },
})
