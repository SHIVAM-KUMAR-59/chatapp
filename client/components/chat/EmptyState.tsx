"use client"

import { MessageCircle } from "lucide-react"

const EmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <MessageCircle className="w-16 h-16 text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">No chat selected</h2>
      <p className="text-gray-500">Choose a conversation to start messaging</p>
    </div>
  )
}

export default EmptyState