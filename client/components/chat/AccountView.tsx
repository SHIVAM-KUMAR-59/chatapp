"use client"

interface User {
  id: string
  username: string
  email: string
}

interface AccountViewProps {
  user: User | undefined
}

const AccountView = ({ user }: AccountViewProps) => {
  if(!user) {
    return (
      <div className="min-h-screen felx justify-center items-center">
        <p className="text-2xl text-gray-500">Fetching User Details...</p>
      </div>
    )
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
        {user.username.split(" ").map((n) => n[0]).join("")}
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
  )
}

export default AccountView