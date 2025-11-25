"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition } from "react"
import { MessageCircle, Users, UserCircle, LogOut, Plus, Send, MoreVertical, Menu } from "lucide-react"
import Logo from "@/components/ui/Logo"

const ChatInterface = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

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

  const setActiveTab = (tab: "chats" | "friends" | "account") => {
    updateURL({ tab, chatId: null, search: null })
    // Only close sidebar on mobile when switching to account tab
    if (tab === "account" && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const setSelectedChat = (chat: any) => {
    updateURL({ tab: "chats", chatId: chat.id.toString() })
    // Close sidebar on mobile after selecting chat
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const setSearchQuery = (query: string) => {
    updateURL({ tab: "friends", search: query || null })
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    console.log(message)
    setMessage("")
  }

  const handleLogout = () => {
    console.log("Logout")
    // Add signOut from next-auth here
  }

  const filteredFriends = friends.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

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
        <div
          id="sidebar"
          className={`
            border-r border-gray-200 flex flex-col bg-white z-30 fixed md:static
            w-72 transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            h-screen
          `}
        >
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Logo />
          </div>

          {/* Tabs */}
          <div className="flex">
            {[
              { id: "chats", icon: <MessageCircle className="w-4 h-4 mt-1 text-blue-600" />, label: "Chats" },
              { id: "friends", icon: <Users className="w-4 h-4 mt-1 text-blue-600" />, label: "Friends" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 flex justify-center gap-2 font-medium transition-colors ${
                  activeTab === tab.id ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center gap-2">
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

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-gray-200">
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "account" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              <UserCircle className="w-5 h-5" /> Account
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col relative">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {selectedChat ? (
              // Show selected chat info on mobile
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

          {activeTab === "account" ? (
            // Account Page
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gray-50">
              <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
                {user.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{user.username}</h2>
              <p className="text-gray-600 mb-6">{user.email}</p>
              
              <div className="w-full max-w-md space-y-4 mt-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">User ID</h3>
                  <p className="text-gray-900">{user.id}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Member Since</h3>
                  <p className="text-gray-900">January 2024</p>
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          ) : selectedChat ? (
            // Chat Page
            <>
              {/* Desktop Chat Header */}
              <div className="p-4 border-b flex items-center justify-between bg-white hidden md:flex">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500">Active now</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : ""}`}>
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === "me" ? "bg-blue-500 text-white" : "bg-white text-gray-900 shadow-sm"
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
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </>
          ) : (
            // Empty Screen
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-gray-50">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No chat selected</h2>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ChatInterface