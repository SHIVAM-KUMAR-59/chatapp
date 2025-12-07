'use client'
import { Suspense } from "react"
import ChatInterface from "@/components/chat/ChatInterface"

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatInterface />
    </Suspense>
  )
}
