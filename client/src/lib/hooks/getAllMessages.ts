import { useQuery } from '@tanstack/react-query'

const baseurl = 'http://localhost:8000'

export const useGetMessages = (userId: string) => {
    return useQuery({
        queryKey: ['getAllMessages'],
        queryFn: () => getAllMessages({ userId }),
    })
}

//Correct the promise typing when we see what we get back from DB
const getAllMessages = async ({ userId }: { userId: string }) => {
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

    const data = await response.json()

    return data
}
