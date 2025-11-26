"use client"

import { useState, useEffect } from "react"
import api from "@/utils/axios"
import { useToast } from "@/context/ToastContext"

interface UserProfile {
  username: string
  email: string
}

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  onUpdated?: () => void
}

export default function EditProfileModal({ open, onClose, onUpdated }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { success, error } = useToast()

  const [form, setForm] = useState<UserProfile>({
    username: "",
    email: ""
  })

  const getUser = async () => {
    try {
      setLoading(true)
      const res = await api.get("/user/profile")
      setForm({
        username: res.data.profile.username,
        email: res.data.profile.email,
      })
    } catch (err) {
      error("Failed to fetch user profile")
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async () => {
    try {
      setSaving(true)
      const res = await api.patch("/user/edit-profile", form)
      success("Profile updated successfully")
      onUpdated && onUpdated()
      onClose()
    } catch (err) {
      error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (open) getUser()
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-4">

            <div>
              <label className="block text-sm text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <button
              disabled={saving}
              onClick={updateUser}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        )}
      </div>
    </div>
  )
}
