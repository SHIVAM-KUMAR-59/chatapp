"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { getAvatar } from "@/utils/util"

interface ChatWindowProps {
  chatData: {
    participants: {
      username: string
    }[] | null
    messages: {
      _id: string
      sender: string
      text: string
    }[] | null
  }
  onSendMessage: (message: string) => void
  fetchingMessages: boolean
  currentUsername: string | undefined
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatData, onSendMessage, fetchingMessages, currentUsername }) => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    onSendMessage(message)
    setMessage("")
  }

  return (
    <>
      {/* Desktop Chat Header */}
      <div className="p-4 border-b hidden items-center justify-between bg-white md:flex">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {chatData && chatData.messages && chatData.participants && chatData.participants.length > 0 ? getAvatar(chatData.participants[0].username) : null}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {chatData && chatData.messages && chatData.participants && chatData.participants.length > 0
                ? (chatData.participants[0].username === currentUsername
                    ? (chatData.participants.length > 1 ? chatData.participants[1].username : "")
                    : chatData.participants[0].username)
                : ""}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      {!fetchingMessages ? <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {chatData && chatData.messages && chatData.messages.map((msg) => (
          <div key={msg._id} className={`flex ${msg.sender === "me" ? "justify-end" : ""}`}>
            <div
              className={`max-w-md px-4 py-2 rounded-2xl ${
                msg.sender === "me" 
                  ? "bg-blue-500 text-white" 
                  : "bg-white text-gray-900 shadow-sm"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div> : <div className=" bg-gray-50 min-h-[90vh] flex items-center justify-center">
            <p className="text-gray-500">Loading messages...</p>
      </div>}

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </>
  )
}

export default ChatWindow