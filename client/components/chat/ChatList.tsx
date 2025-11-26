import { User } from "@/types/types"
import { getAvatar } from "@/utils/util"
import { UserX } from "lucide-react"

interface ChatListProps {
  chats: User[]
  selectedChatId: string | null
  onChatSelect: (userId: string) => void
  onRemoveFriend: (e: React.FormEvent, userId: string) => void
}

const ChatList = ({ chats, selectedChatId, onChatSelect, onRemoveFriend }: ChatListProps) => {

  return (
    <div>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onChatSelect(chat._id.toString())}
            className={`p-4 cursor-pointer transition ${
              selectedChatId === chat._id.toString()
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {getAvatar(chat.username)}
                </div>
                <h3 className="font-medium text-gray-900 truncate">{chat.username}</h3>
              </div>
              <UserX className="w-5 h-5 text-gray-400 hover:text-red-500" onClick={(e: React.FormEvent) => onRemoveFriend(e, chat._id.toString())}/>
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