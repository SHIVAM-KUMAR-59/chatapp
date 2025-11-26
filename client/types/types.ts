export interface User {
    _id: string
    username: string,
    createdAt: string,
    updatedAt: string,
    friends: User[]
}

export interface Message {
  _id: string
  sender: string
  content: string
  sentAt: string // ISO date string
  edited?: boolean
  isRead?: boolean
}

export interface ChatData {
  participants: { _id: string; username: string }[] | null
  messages: Message[] | null
}