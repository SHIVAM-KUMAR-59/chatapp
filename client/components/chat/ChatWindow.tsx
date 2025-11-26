"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { getAvatar } from "@/utils/util"
import { ChatData } from "@/types/types"

interface ChatWindowProps {
  chatData: ChatData | null
  onSendMessage: (message: string) => void
  fetchingMessages: boolean
  currentUser: {
    id: string
    email: string
    username: string
  } | undefined
}

const formatMessageTime = (isoString: string): string => {
  const date = new Date(isoString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)
  
  // If less than 24 hours, show time only
  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  // If less than a week, show day and time
  if (diffInHours < 168) {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Otherwise show full date
  return date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  chatData, 
  onSendMessage, 
  fetchingMessages, 
  currentUser 
}) => {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatData?.messages])

  const handleSend = () => {
    if (!message.trim()) return
    onSendMessage(message)
    setMessage("")
  }

  // Get the other participant's name
  const getOtherParticipant = () => {
    if (!chatData?.participants || chatData.participants.length === 0) {
      return ""
    }
    
    const otherParticipant = chatData.participants.find(
      p => p._id !== currentUser?.id
    )
    
    return otherParticipant?.username || ""
  }

  const otherUsername = getOtherParticipant()

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Desktop Chat Header */}
      <div className="p-4 border-b hidden items-center justify-between bg-white md:flex">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {otherUsername ? getAvatar(otherUsername) : "?"}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {otherUsername || "Unknown User"}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      {fetchingMessages ? (
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Loading messages...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {chatData?.messages && chatData.messages.length > 0 ? (
            <>
              {chatData.messages.map((msg) => {
                const isMe = msg.sender === currentUser?.id
                return (
                  <div key={msg._id} className={`flex ${isMe ? "justify-end" : ""}`}>
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        isMe
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-900 shadow-sm"
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                      <p className={`text-xs mt-1 ${isMe ? "text-blue-100" : "text-gray-500"}`}>
                        {formatMessageTime(msg.sentAt)}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
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
    </div>
  )
}

export default ChatWindow