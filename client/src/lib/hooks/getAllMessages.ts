import { useQuery } from '@tanstack/react-query'
import { getAllMessagesPromise } from '../types/message'

const baseurl = 'http://localhost:8000'

export const useGetMessages = (userId: string) => {
    return useQuery({
        queryKey: ['getAllMessages'],
        queryFn: () => getAllMessages({ userId }),
    })
}

//TODO: Correct the promise typing when we see what we get back from DB
const getAllMessages = async ({ userId }: { userId: string }) => {
    const response = await fetch(
        `${baseurl}/api/get-messages?userId=${userId}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch messages')
    }

    const data: getAllMessagesPromise[] = await response.json()

    //TODO: map the data to js naming scheme before returning
    // eg userId: row[i].user_id

    return data
}
