import { useQuery } from '@tanstack/react-query'
import { Message } from '../types/message'

const baseurl = 'http://localhost:8000'

export const useGetMessages = (userId: string) => {
    return useQuery({
        queryKey: ['getAllMessages'],
        queryFn: () => getAllMessages({ userId }),
    })
}

const getAllMessages = async ({
    userId,
}: {
    userId: string
}): Promise<Message[]> => {
    const response = await fetch(`${baseurl}/get-messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to sign up')
    }

    return response.json()
}
