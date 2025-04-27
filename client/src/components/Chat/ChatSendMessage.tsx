import { useState } from 'react'

interface ChatSendMessageProps {
    onSubmit: (message: string) => void
}

export const ChatSendMessage = ({ onSubmit }: ChatSendMessageProps) => {
    const [value, setValue] = useState('')

    const handleSubmit = (value: string) => {
        onSubmit(value)
        setValue('')
    }

    return (
        <div className="chat__send-message">
            <input
                type="text"
                placeholder="send a message..."
                className="chat__send-message__input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></input>
            <button type="submit" onClick={() => handleSubmit(value)}>
                Send
            </button>
        </div>
    )
}
