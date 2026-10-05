

export interface AuthResponse  {
    success: boolean,
    message? :string,
    data?: {
        token: string,
        _id: string,
        email: string,
        createAt: string
    }
}