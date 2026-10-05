import { create } from "zustand"

interface User {
    _id: string,
    email: string,
    createAt: string,
    token: string
}


interface AuthStore {
    token: string | null,
    user: User| null,
    setAuth: (token: string, user: User) => void,
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    user: null,
    setAuth: (token, user) => set({ token: token, user: user }),
    logout: () => set({ token: null, user: null })
}))