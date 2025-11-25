"use client"

import { MessageCircle, Users, UserCircle, LogOut, Plus } from "lucide-react"
import Logo from "@/components/ui/Logo"

interface Chat {
  id: number
  name: string
  avatar: string
}

interface ChatSidebarProps {
  activeTab: "chats" | "friends" | "account"
  selectedChatId: string | null
  searchQuery: string
  chats: Chat[]
  friends: Chat[]
  sidebarOpen: boolean
  onTabChange: (tab: "chats" | "friends" | "account") => void
  onChatSelect: (chat: Chat) => void
  onSearchChange: (query: string) => void
  onLogout: () => void
}

const Sidebar = ({
  activeTab,
  selectedChatId,
  searchQuery,
  chats,
  friends,
  sidebarOpen,
  onTabChange,
  onChatSelect,
  onSearchChange,
  onLogout,
}: ChatSidebarProps) => {
  const filteredFriends = friends.filter((f) => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      id="sidebar"
      className={` lg:min-w-[350px]
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
          { id: "chats", icon: <MessageCircle className="w-4 h-4 text-blue-600 mt-1" />, label: "Chats" },
          { id: "friends", icon: <Users className="w-4 h-4 text-blue-600 mt-1" />, label: "Friends" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as "chats" | "friends")}
            className={`flex-1 py-3 flex justify-center gap-2 font-medium transition-colors ${
              activeTab === tab.id 
                ? "text-black border-b-2 border-black" 
                : "text-gray-500 hover:text-gray-700"
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
            {chats.length > 0 ? chats.map((chat) => (
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
            )) : (
                <p className="p-4 text-center text-gray-500 mt-20">No chats available. Start a new conversation!</p>
            )}
          </div>
        )}

        {activeTab === "friends" && (
          <div className="p-4 space-y-4">
            <input
              placeholder="Search friends"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
            />

            {filteredFriends.length > 0 ? filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => onChatSelect(friend)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {friend.avatar}
                </div>
                <h3 className="font-medium text-gray-900">{friend.name}</h3>
              </div>
            )) : (
              <>
                <p className="text-center text-gray-500 mt-10">No friends found. Search for a friend to start a conversation!</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 space-y-2 border-t border-gray-200">
        <button
          onClick={() => onTabChange("account")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === "account" ? "bg-gray-100" : "hover:bg-gray-100"
          }`}
        >
          <UserCircle className="w-5 h-5" /> Account
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar