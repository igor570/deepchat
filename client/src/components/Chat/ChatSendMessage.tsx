export const ChatSendMessage = () => {
    return (
        <div className="chat__send-message">
            <input
                type="text"
                placeholder="send a message..."
                className="chat__send-message__input"
            ></input>
            <button type="submit">Send</button>
        </div>
    )
}
