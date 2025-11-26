"use client"

import { MessageCircle, Users, UserCircle, LogOut } from "lucide-react"
import Logo from "@/components/ui/Logo"
import ChatList from "./ChatList"
import FriendsList from "./FriendsList"
import { signOut } from "next-auth/react"

interface Chat {
  id: number
  name: string
  avatar: string
}

interface ChatSidebarProps {
  activeTab: "chats" | "explore" | "account"
  selectedChatId: string | null
  chats: Chat[]
  sidebarOpen: boolean
  onTabChange: (tab: "chats" | "explore" | "account") => void
  onChatSelect: (chat: Chat) => void
}

const Sidebar = ({
  activeTab,
  selectedChatId,
  chats,
  sidebarOpen,
  onTabChange,
  onChatSelect,
}: ChatSidebarProps) => {
  
  const onLogout = async () => {
     try {
      console.log("Signing out...")
        await signOut()
        window.location.href = '/auth/login';
     } catch (error) {
        console.error("Error during sign out:", error)
     }
  }
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
          { id: "explore", icon: <Users className="w-4 h-4 text-blue-600 mt-1" />, label: "Explore" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as "chats" | "account" | "explore")}
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
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onChatSelect={onChatSelect}
          />
        )}

        {activeTab === "explore" && (
          <FriendsList onChatSelect={onChatSelect} />
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