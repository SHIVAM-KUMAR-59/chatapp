"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import api from "@/utils/axios"
import { getAvatar } from "@/utils/util"
import { PlusCircle, ArrowRight } from "lucide-react"
import { User } from "@/types/types"

interface FriendsListProps {
  onChatSelect: (userId: string) => void
}

const FriendsList = ({ onChatSelect }: FriendsListProps) => {
  const { data: session } = useSession()

  const [friends, setFriends] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [searchedData, setSearchedData] = useState<User[]>([])
  const [searching, setSearching] = useState(false)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch Friends
  const fetchFriends = async () => {
    try {
      const res = await api.get("/user/friends")
      if (res.data.success) {
        setFriends(res.data.friends)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [])

  // Debounced Search
  const onSearchChangeInternal = (query: string) => {
    setSearch(query)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setSearchedData([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSearching(true)
        const res = await api.get(`/user/search?query=${query}`)
        if (res.data.success) {
          setSearchedData(res.data.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setSearching(false)
      }
    }, 400)
  }

  // Add Friend
  const onAddClick = async (e: React.FormEvent, user: User) => {
    e.stopPropagation()

    try {
      const res = await api.post("/user/add-friend", { friendId: user._id })
      if (res.data.success) {
        // Update local state instantly
        setFriends((prev) => [...prev, user])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const isFriend = (userId: string) => {
    return friends.some((f) => f._id === userId)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Input */}
      <input
        placeholder="Search friends"
        value={search}
        onChange={(e) => onSearchChangeInternal(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
      />

      {!search ? (
        friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onChatSelect(friend._id)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {getAvatar(friend.username)}
              </div>
              <h3 className="font-medium text-gray-900">{friend.username}</h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No friends found. Search for a friend to start a conversation!
          </p>
        )
      ) : searching ? (
        <p className="text-center text-gray-500 mt-10">Searching...</p>
      ) : searchedData.length > 0 ? (
        searchedData.map((user) => {
          const me = user._id === session?.user.id
          const friendAlready = isFriend(user._id)

          return (
            <div
              key={user._id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => !me && onChatSelect(user._id)}
            >
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {getAvatar(user.username)}
                </div>

                <h3 className="font-medium text-gray-900">
                  {me ? "You" : user.username}
                </h3>
              </div>


              {!me && (
                friendAlready ? (
                  <ArrowRight className="w-5 h-5 text-gray-600" />
                ) : (
                  <PlusCircle
                    className="w-5 h-5 text-blue-600"
                    onClick={(e) => onAddClick(e, user)}
                  />
                )
              )}
            </div>
          )
        })
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No users found for &quot;{search}&quot;.
        </p>
      )}
    </div>
  )
}

export default FriendsList
