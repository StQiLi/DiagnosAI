import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'

const ChatsPage = () => {
    const chatProps = useMultiChatLogic('c5d63ebc-b1ce-4c18-aa71-d7eeb1203ffb', props.user.username, props.user.secret)
    return (
    <div style={{ height : '100vh' }}>
        <MultiChatSocket {...chatProps} />

        <MultiChatSocket {...chatProps} style={{ height: '100%'}} />
    </div>
    )
}

export default ChatsPage;