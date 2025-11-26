"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import api from "@/utils/axios"
import { getAvatar } from "@/utils/util"
import { PlusCircle } from "lucide-react"
import { User } from "@/types/types"


interface FriendsListProps {
  onChatSelect: (user: User) => void
}

const FriendsList = ({ onChatSelect }: FriendsListProps) => {
  const { data: session } = useSession()

  const [userData, setUserData] = useState({
    friends: []
  })
  const [search, setSearch] = useState("")
  const [searchedData, setSearchedData] = useState([])
  const [searching, setSearching] = useState<boolean>(false)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const onSearchChangeInternal = (query: string) => {
    setSearch(query)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    // If query is empty → clear & return
    if (!query.trim()) {
      debounceRef.current = null
      return
    }

    // Set new debounce timer
    debounceRef.current = setTimeout(async () => {
      try {
        setSearching(true)
        const res = await api.get(`/user/search?query=${query}`)
        console.log("Search result:", res.data)
        if (res.data.success) {
          setSearchedData(res.data.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setSearching(false)
      }
    }, 400) // debounce delay
  }

  const onAddClick = async (e: React.FormEvent, user: User) => {
    e.stopPropagation()
    console.log(user)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/user/friends")
        console.log(res.data)
        const data = res.data
        if (data.success) {
          setUserData({ friends: data.friends })
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="p-4 space-y-4">
      <input
        placeholder="Search friends"
        value={search}
        onChange={(e) => onSearchChangeInternal(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
      />

      {!search ? (
        userData.friends.length > 0 ? (
          userData.friends.map((friend: User) => (
            <div
              key={friend._id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onChatSelect(friend)}
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
        searchedData.map((user: User) => (
          <div
            key={user._id}
            className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => onChatSelect(user)}
          >
            <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {getAvatar(user.username)}
                </div>
                <h3 className="font-medium text-gray-900">
                {user._id === session?.user.id ? "You" : user.username}
                </h3>
            </div>
            {user._id !== session?.user.id && <PlusCircle className="w-5 h-5 text-blue-600" onClick={(e) => onAddClick(e, user)} />}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No users found for &quot;{search}&quot;.
        </p>
      )}
    </div>
  )
}

export default FriendsList