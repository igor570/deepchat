import { io } from 'socket.io-client'

const socket = io('http://localhost:8000', {
    auth: {
        token: 'jwt',
    },
})

socket.on('connect', () => {
    console.log('Connected to server')

    socket.emit('chat-message', 'Hello from test!')

    socket.on('reply', (data) => {
        console.log('AI Reply:', data)
    })
})

socket.on('error', (err) => {
    console.error('Socket error:', err)
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})
