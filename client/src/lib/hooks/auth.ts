import { useMutation } from '@tanstack/react-query'

// TODO: make env var for this
const baseurl = 'http://localhost:8000'

interface Payload {
    email: string
    password: string
}

interface LoginPromise {
    message: string
    token: string
    userId: string
}

/**** React Query Hooks ****/

export const useSignUp = () => {
    return useMutation({
        mutationKey: ['signup'],
        mutationFn: signUp,
        onSuccess: () => {
            console.log('User created successfully!')
        },
        onError: (error) => {
            console.error('Signup failed:', error.message)
        },
    })
}
export const useSignIn = () => {
    return useMutation({
        mutationKey: ['signin'],
        mutationFn: signIn,
        onSuccess: () => {
            console.log('User logged in successfully')
        },
        onError: (error) => {
            console.error('Login failed:', error.message)
        },
    })
}

/**** API Requests ****/

const signUp = async ({ email, password }: Payload): Promise<void> => {
    const response = await fetch(`${baseurl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    // Check for response errors
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to sign up')
    }
}

const signIn = async ({ email, password }: Payload): Promise<LoginPromise> => {
    const response = await fetch(`${baseurl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    // Check for response errors
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to login')
    }

    const data: LoginPromise = await response.json()

    localStorage.setItem('token', data.token)

    return {
        message: data.message,
        token: data.token,
        userId: data.userId,
    } as const
}
