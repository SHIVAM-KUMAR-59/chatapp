"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {  useEffect, useState, useTransition } from "react"
import { Menu } from "lucide-react"
import Logo from "@/components/ui/Logo"
import Sidebar from "@/components/chat/Sidebar"
import ChatWindow from "@/components/chat/ChatWindow"
import AccountView from "@/components/chat/AccountView"
import EmptyState from "@/components/chat/EmptyState"
import { useSession } from "next-auth/react"
import { useToast } from "@/context/ToastContext"
import api from "@/utils/axios"

export default function ChatInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const { error } = useToast()
  const { data: session } = useSession()

  const { status } = useSession()

  const activeTab = (searchParams.get("tab") || "friends") as "friends" | "explore" | "account"
  const selectedChatId = searchParams.get("chatId")

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatData, setChatData] = useState({
    participants: null,
    messages: null
  })
  const [fetchingMessages, setFetchingMessages] = useState(false)

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
      const res = await api.get(`/chat/messages/${userId}`)
      setChatData({
        messages: res.data.messages.messages,
        participants: res.data.messages.participants
    });
    } catch (err) {
      console.log(err)
    } finally {
      setFetchingMessages(false)
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
    console.log("Sending message:", message)
  }

  const [chatList, setChatList] = useState([])
    // Fetch Friends
  const fetchFriends = async () => {
    try {
      const res = await api.get("/user/friends")
      console.log(res.data)
      if (res.data.success) {
        setChatList(res.data.friends)
      }
    } catch (err) {
      console.log(err)
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
        setChatList((prev) => prev.filter((chat: any) => chat._id !== userId))
        if (selectedChatId === userId) {
          updateURL({ chatId: null })
        }
        await fetchFriends()
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if(status === "unauthenticated") {
      error("You must be logged in to access the chat.")
      setTimeout(() => {
        router.replace('/auth/login')
      }, 2000)
    }
  }, [status, router])

  useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (selectedChatId) {
        updateURL({ chatId: null })  // close chat
      }
    }
  }

  window.addEventListener("keydown", handleEsc)
  return () => window.removeEventListener("keydown", handleEsc)
  }, [selectedChatId])


  return (
    <main className="bg-white">
      {status === "authenticated" ? <div className="flex h-screen bg-white max-w-7xl mx-auto">
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
            
            {selectedChatId ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                  {/* {selectedChat.avatar} */}
                  AB
                </div>
                <span className="font-semibold text-gray-900">
                  {/* {selectedChat.name} */}
                  AB
                  </span>
              </div>
            ) : (
              <Logo />
            )}
            
            <div className="w-10" />
          </div>

          {/* Content */}
          {activeTab === "account" ? (
            <AccountView user={session?.user} />
          ) : selectedChatId ? (
            <ChatWindow 
              chatData={chatData}
              onSendMessage={handleSendMessage}
              fetchingMessages={fetchingMessages}
              currentUsername={session?.user.username}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div> : (
        status === "loading" ? <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </div> : <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      )}
    </main>
  )
}