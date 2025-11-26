"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition, useRef } from "react"
import { Menu } from "lucide-react"
import Logo from "@/components/ui/Logo"
import Sidebar from "@/components/chat/Sidebar"
import ChatWindow from "@/components/chat/ChatWindow"
import AccountView from "@/components/chat/AccountView"
import EmptyState from "@/components/chat/EmptyState"
import { useSession } from "next-auth/react"
import { useToast } from "@/context/ToastContext"
import api from "@/utils/axios"
import { getSocket } from "@/utils/socket"
import { ChatData, Message, User } from "@/types/types"

export default function ChatInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const { error } = useToast()
  const { data: session, status } = useSession()
  const socketRef = useRef(getSocket())

  const activeTab = (searchParams.get("tab") || "friends") as "friends" | "explore" | "account"
  const selectedChatId = searchParams.get("chatId")

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatData, setChatData] = useState<ChatData>({
    participants: null,
    messages: null
  })
  const [fetchingMessages, setFetchingMessages] = useState(false)
  const [chatList, setChatList] = useState([])

  // Keep track of current chat ID to prevent stale updates
  const currentChatIdRef = useRef<string | null>(null)

  const updateURL = (params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ""
    
    startTransition(() => {
      router.push(`/chat${query}`, { scroll: false })
    })
  }

  const handleTabChange = (tab: "friends" | "explore" | "account") => {
    updateURL({ tab, chatId: null, search: null })
    if (tab === "account" && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const fetchMessages = async (userId: string) => {
    try {
      setFetchingMessages(true)
      currentChatIdRef.current = userId
      
      const res = await api.get(`/chat/messages/${userId}`)
      
      // Only update if this is still the current chat
      if (currentChatIdRef.current === userId) {
        setChatData({
          messages: res.data.messages.messages,
          participants: res.data.messages.participants
        })
      }
    } catch (err) {
      console.error("Error fetching messages:", err)
      error("Failed to load messages")
    } finally {
      if (currentChatIdRef.current === userId) {
        setFetchingMessages(false)
      }
    }
  }

  const handleChatSelect = async (userId: string) => {
    updateURL({ tab: "friends", chatId: userId })
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
    await fetchMessages(userId)
  }

  const handleSendMessage = (message: string) => {
    if (!session?.user?.id || !chatData.participants) return

    try {
      const socket = socketRef.current
      
      // Create optimistic message
      const optimisticMessage: Message = {
        _id: `temp-${Date.now()}`,
        sender: session.user.id,
        content: message,
        sentAt: new Date().toISOString(),
        edited: false,
        isRead: false
      }

      // Update UI immediately
      setChatData(prev => ({
        ...prev,
        messages: prev.messages ? [...prev.messages, optimisticMessage] : [optimisticMessage]
      }))

      // Send to server
      socket.emit("send_message", {
        text: message,
        sender: session.user.id,
        chatData: chatData
      })
    } catch (err) {
      console.error("Error sending message:", err)
      error("Failed to send message")
    }
  }

  // Fetch friends
  const fetchFriends = async () => {
    try {
      const res = await api.get("/user/friends")
      if (res.data.success) {
        setChatList(res.data.friends)
      }
    } catch (err) {
      console.error("Error fetching friends:", err)
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [])

  const onRemoveFriend = async (e: React.FormEvent, userId: string) => {
    e.stopPropagation()
    try {
      const res = await api.post(`/user/remove-friend`, { friendId: userId })
      if (res.data.success) {
        setChatList((prev) => prev.filter((chat: User) => chat._id !== userId))
        if (selectedChatId === userId) {
          updateURL({ chatId: null })
          setChatData({ participants: null, messages: null })
        }
        await fetchFriends()
      }
    } catch (err) {
      console.error("Error removing friend:", err)
    }
  }

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      error("You must be logged in to access the chat.")
      setTimeout(() => {
        router.replace('/auth/login')
      }, 2000)
    }
  }, [status, router])

  // Socket.IO listeners
  useEffect(() => {
    const socket = socketRef.current

    const handleConnect = () => {
      console.log("Connected:", socket.id)
    }

    const handleReceiveMessage = (data: Message) => {
      console.log("Received message:", data)
      
      // Only update if message is for current chat
      setChatData(prev => {
        // Check if this message is for the current chat
        const isForCurrentChat = prev.participants?.some(
          p => p._id === data.sender || p._id === session?.user?.id
        )
        
        if (!isForCurrentChat) {
          return prev
        }

        return {
          ...prev,
          messages: prev.messages ? [...prev.messages, data] : [data]
        }
      })
    }

    const handleDisconnect = () => {
      console.log("Disconnected")
    }

    socket.on("connect", handleConnect)
    socket.on("receive_message", handleReceiveMessage)
    socket.on("disconnect", handleDisconnect)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("receive_message", handleReceiveMessage)
      socket.off("disconnect", handleDisconnect)
    }
  }, [session?.user?.id])

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedChatId) {
        updateURL({ chatId: null })
        setChatData({ participants: null, messages: null })
        currentChatIdRef.current = null
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [selectedChatId])

  return (
    <main className="bg-white">
      {status === "authenticated" ? (
        <div className="flex h-screen bg-white max-w-7xl mx-auto">
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-20 md:hidden" 
              onClick={() => setSidebarOpen(false)} 
            />
          )}

          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            selectedChatId={selectedChatId}
            chats={chatList}
            sidebarOpen={sidebarOpen}
            onTabChange={handleTabChange}
            onChatSelect={handleChatSelect}
            onRemoveFriend={onRemoveFriend}
          />

          {/* Main Panel */}
          <div className="flex-1 flex flex-col relative">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {selectedChatId && chatData.participants ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                    {chatData.participants.find(p => p._id !== session?.user?.id)?.username.charAt(0).toUpperCase() || "?"}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {chatData.participants.find(p => p._id !== session?.user?.id)?.username || "Unknown"}
                  </span>
                </div>
              ) : (
                <Logo />
              )}
              
              <div className="w-10" />
            </div>

            {/* Content */}
            {activeTab === "account" ? (
              <AccountView/>
            ) : selectedChatId ? (
              <ChatWindow 
                chatData={chatData}
                onSendMessage={handleSendMessage}
                fetchingMessages={fetchingMessages}
                currentUser={session?.user}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      ) : status === "loading" ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      )}
    </main>
  )
}