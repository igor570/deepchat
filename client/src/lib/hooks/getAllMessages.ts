import { useQuery } from '@tanstack/react-query'
import { getAllMessagesPromise, MappedMessage } from '../types/message'

const baseurl = 'http://localhost:8000'

export const useGetMessages = (userId: string) => {
    return useQuery({
        queryKey: ['getAllMessages'],
        queryFn: () => getAllMessages({ userId }),
        enabled: !!userId, // enables fetch if userId is defined
    })
}

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
        throw new Error('Failed to fetch messages')
    }

    const data: getAllMessagesPromise[] = await response.json()

    const mappedArr: MappedMessage[] = data.map((row) => ({
        id: row.id,
        userId: row.user_id,
        content: row.content,
        senderType: row.sender_type,
        userTalkedTo: row.user_talked_to ?? '',
        createdAt: row.created_at,
    }))

    return mappedArr
}
