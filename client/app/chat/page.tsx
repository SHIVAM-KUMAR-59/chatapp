"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {  useEffect, useState, useTransition } from "react"
import { Menu } from "lucide-react"
import Logo from "@/components/ui/Logo"
import Sidebar from "@/components/chat/Sidebar"
import ChatWindow from "@/components/chat/ChatWindow"
import AccountView from "@/components/chat/AccountView"
import EmptyState from "@/components/chat/EmptyState"

export default function ChatInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const activeTab = (searchParams.get("tab") || "chats") as "chats" | "friends" | "account"
  const selectedChatId = searchParams.get("chatId")

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data
  const user = { id: "1", username: "John Doe", email: "john@example.com" }
  const chats = [
    { id: 1, name: "Alice Johnson", avatar: "AJ" },
    { id: 2, name: "Bob Smith", avatar: "BS" },
    { id: 3, name: "Carol White", avatar: "CW" },
    { id: 4, name: "David Brown", avatar: "DB" },
    { id: 5, name: "Emma Davis", avatar: "ED" },
  ]

  const selectedChat = chats.find((c) => c.id === Number.parseInt(selectedChatId || ""))
  const messages = selectedChat
    ? [
        { id: 1, sender: "them" as const, text: "Hey! How are you?", time: "10:30 AM" },
        { id: 2, sender: "me" as const, text: "I'm good! You?", time: "10:32 AM" },
      ]
    : []

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

  const handleTabChange = (tab: "chats" | "friends" | "account") => {
    updateURL({ tab, chatId: null, search: null })
    if (tab === "account" && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleChatSelect = (chat: any) => {
    updateURL({ tab: "chats", chatId: chat.id.toString() })
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }


  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message)
  }

  const handleLogout = () => {
    console.log("Logging out")
    // Add signOut from next-auth here
  }


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
          chats={chats}
          sidebarOpen={sidebarOpen}
          onTabChange={handleTabChange}
          onChatSelect={handleChatSelect}
          onLogout={handleLogout}
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
            
            {selectedChat ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                  {selectedChat.avatar}
                </div>
                <span className="font-semibold text-gray-900">{selectedChat.name}</span>
              </div>
            ) : (
              <Logo />
            )}
            
            <div className="w-10" />
          </div>

          {/* Content */}
          {activeTab === "account" ? (
            <AccountView user={user} />
          ) : selectedChat ? (
            <ChatWindow 
              selectedChat={selectedChat} 
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  )
}