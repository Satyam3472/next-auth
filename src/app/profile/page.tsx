'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string; username: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/me')
        if (res.data.success) {
          setUser(res.data.user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const logOut = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.log("Logout failed", error)
      toast.error('Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-500">
        <h2 className="text-lg font-medium animate-pulse">Loading profile...</h2>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-emerald-100">
        <h1 className="text-2xl font-bold text-emerald-700 mb-4">Welcome, {user.username}!</h1>
        <div className="border-b border-emerald-200 my-3"></div>

        <div className="text-left space-y-3">
          <p className='text-gray-600'><span className="font-semibold text-gray-700">Unique Id:</span> {user.id}</p>
          <p className='text-gray-600'><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
        </div>

        <button
          onClick={logOut}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-[1.03]"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
