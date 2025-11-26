interface Chat {
  id: number
  name: string
  avatar: string
}

interface ChatListProps {
  chats: Chat[]
  selectedChatId: string | null
  onChatSelect: (chat: Chat) => void
}

const ChatList = ({ chats, selectedChatId, onChatSelect }: ChatListProps) => {
  return (
    <div>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`p-4 cursor-pointer transition ${
              selectedChatId === chat.id.toString()
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {chat.avatar}
              </div>
              <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
            </div>
          </div>
        ))
      ) : (
        <p className="p-4 text-center text-gray-500 mt-20">
          No chats available. Start a new conversation!
        </p>
      )}
    </div>
  )
}

export default ChatList