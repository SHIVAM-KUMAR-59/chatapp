"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { MessageCircle, Users, UserCircle, LogOut, Plus, Send, MoreVertical, Menu, X } from "lucide-react"
import Logo from "@/components/ui/Logo"

const ChatInterfaceContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeTab = (searchParams.get("tab") || "chats") as "chats" | "friends" | "account"
  const selectedChatId = searchParams.get("chatId")
  const searchQuery = searchParams.get("search") || ""

  const [message, setMessage] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock user + data
  const user = { id: "1", username: "John Doe", email: "john@example.com" }
  const chats = [
    { id: 1, name: "Alice Johnson", avatar: "AJ" },
    { id: 2, name: "Bob Smith", avatar: "BS" },
    { id: 3, name: "Carol White", avatar: "CW" },
    { id: 4, name: "David Brown", avatar: "DB" },
    { id: 5, name: "Emma Davis", avatar: "ED" },
  ]
  const friends = chats
  const selectedChat = chats.find((c) => c.id === Number.parseInt(selectedChatId || ""))
  const messages = selectedChat
    ? [
        { id: 1, sender: "them", text: "Hey! How are you?", time: "10:30 AM" },
        { id: 2, sender: "me", text: "I'm good! You?", time: "10:32 AM" },
      ]
    : []

  const setActiveTab = (tab: "chats" | "friends" | "account") => {
    router.push(`/chat?tab=${tab}`)
  }

  const setSelectedChat = (chat: any) => {
    router.push(`/chat?tab=chats&chatId=${chat.id}`)
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const setSearchQuery = (query: string) => {
    if (query) {
      router.push(`/chat?tab=friends&search=${encodeURIComponent(query)}`)
    } else {
      router.push("/chat?tab=friends")
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    console.log(message)
    setMessage("")
  }

  const handleLogout = () => console.log("Logout")

  const filteredFriends = friends.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Close sidebar on chat selection on mobile
  useEffect(() => {
    if (selectedChat && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }, [selectedChat])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const menuButton = document.getElementById("menu-button")
      const target = e.target as Node

      // Only close if click is outside BOTH sidebar and menu button
      if (sidebar && menuButton && !sidebar.contains(target) && !menuButton.contains(target)) {
        setSidebarOpen(false)
      }
    }

    if (sidebarOpen && window.innerWidth < 768) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [sidebarOpen])

  // ESC closes chat and sidebar
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedChatId) router.push("/chat?tab=chats")
        setSidebarOpen(false)
      }
    }
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [selectedChatId, router])

  return (
    <main className="bg-white">
      <div className="flex h-screen bg-white max-w-7xl mx-auto">
        {/* Sidebar */}
        <div
          id="sidebar"
          className={`
            border-r border-gray-200 flex flex-col bg-white z-30 fixed md:static
            w-72 transition-transform duration-200
            md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            h-screen md:h-auto
          `}
        >
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Logo />
          </div>

          {/* Tabs */}
          <div className="flex">
            {[
              { id: "chats", icon: <MessageCircle className="w-4 h-4" />, label: "Chats" },
              { id: "friends", icon: <Users className="w-4 h-4" />, label: "Friends" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 flex justify-center gap-2 font-medium ${
                  activeTab === tab.id ? "text-black border-b-2 border-black" : "text-gray-500"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "chats" && (
              <div>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 cursor-pointer transition ${
                      selectedChat?.id === chat.id ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {chat.avatar}
                      </div>
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "friends" && (
              <div className="p-4 space-y-4">
                <input
                  placeholder="Search friends"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                />
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg flex justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Friend
                </button>

                {filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedChat(friend)}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                      {friend.avatar}
                    </div>
                    <h3 className="font-medium text-gray-900">{friend.name}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "account" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              <UserCircle className="w-5 h-5" /> Account
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-red-600"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col relative">
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <button
              id="menu-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Logo />
            <div className="w-10" />
          </div>

          {/* Overlay for sidebar on mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {activeTab === "account" ? (
            // Account Page
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
                {user.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ) : selectedChat ? (
            // Chat Page
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between hidden md:flex">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {selectedChat.avatar}
                  </div>
                  <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                </div>
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : ""}`}>
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === "me" ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-50 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </>
          ) : (
            // Empty Screen
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold">Select a chat</h2>
              <p className="text-gray-500">Pick a conversation from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

const ChatInterface = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatInterfaceContent />
    </Suspense>
  )
}

export default ChatInterface
