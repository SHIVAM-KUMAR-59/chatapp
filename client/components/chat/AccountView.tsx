"use client"

import { useEffect, useState } from "react"
import api from "@/utils/axios"
import EditProfileModal from "./EditProfileModal"
import { getAvatar } from "@/utils/util"
import { User } from "@/types/types"

interface UserProfile {
  username: string
  email: string
  friends: User[]
}

export default function AccountView() {
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const getUser = async () => {
    try {
      setLoading(true)
      const res = await api.get("/user/profile")
      setUserProfile(res.data.profile)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Fetching user profile...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
            {getAvatar(userProfile.username)}
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {userProfile.username}
          </h2>
          <p className="text-gray-600 mb-6">{userProfile.email}</p>

          <div className="w-full max-w-md space-y-4 mt-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Friends</h3>
              <p className="text-gray-900">{userProfile.friends.length}</p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>

          </div>
        </>
      )}

      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onUpdated={getUser}
      />
    </div>
  )
}
