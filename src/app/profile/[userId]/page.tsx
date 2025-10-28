'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string; username: string } | null>(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        router.push('/login')
      }
    } catch (err) {
      console.error('Error loading user data:', err)
      router.push('/login')
    }
  }, [router])

  const logOut = async () => {
    try {
      await axios.get('/api/users/logout')
      localStorage.removeItem('user')
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.log("Logout failed", error)
      toast.error('Logout failed')
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <h2 className="text-lg font-medium animate-pulse">Loading profile...</h2>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-emerald-100">
        <h1 className="text-2xl font-bold text-emerald-700 mb-4 tracking-wide">Profile</h1>
        <div className="border-b border-emerald-200 my-3"></div>

        <div className="text-left space-y-3">
          <p><span className="font-semibold text-gray-700">User ID:</span> <span className="text-gray-600">{user.id}</span></p>
          <p><span className="font-semibold text-gray-700">Username:</span> <span className="text-gray-600">{user.username}</span></p>
          <p><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-600">{user.email}</span></p>
        </div>

        <button
          onClick={logOut}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-[1.03]"
        >
          Log Out
        </button>

        <Link href="/home" className="text-sm text-emerald-700 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
