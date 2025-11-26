"use client"

import { useState } from "react"
import { Send } from "lucide-react"


const ChatWindow = ({ selectedChatId, messages, onSendMessage }) => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    onSendMessage(message)
    setMessage("")
  }

  const fetchMessages = async (chatId: string) => {

  }

  return (
    <>
      {/* Desktop Chat Header */}
      <div className="p-4 border-b hidden items-center justify-between bg-white md:flex">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {/* {selectedChat.avatar} */}
            AB
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {/* {selectedChat.name} */}
              AB
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : ""}`}>
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
      </div>

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