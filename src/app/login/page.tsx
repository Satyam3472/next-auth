'use client'
import Link from "next/link"
import React, { useEffect } from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onLogIn = async () => {
        const response = await axios.post('/api/users/login', user)
        .then((response) => {
            if(response.status === 200){
                toast.success('Login Successful');
                router.push('/profile');
            }
        })
        .catch((error) => {
            console.error('Login failed:', error);
            // alert('Login failed. Please check your credentials and try again.');
        });
    };

    useEffect(() => {
      toast('Welcome Back! Please Log In to Continue.');
      if(!user.email || !user.password){
        setButtonDisabled(true);
      }else{
        setButtonDisabled(false);
      }
    }, [user])
    

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Login Here</h1>
        <p className="text-gray-300 text-center mb-6">
          Join our fitness community today 💪
        </p>
        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col gap-4">

          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
            />
          </div>

          <button
            onClick={onLogIn}
            disabled={buttonDisabled}
            className={`${buttonDisabled ? 'opacity-40': ''} mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02]`}
          >
            Log In
          </button>

          <p className="text-center text-gray-400 text-sm mt-3">
            Create new account?{" "}
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
    )
}
