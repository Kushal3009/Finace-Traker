import React from 'react'
import Header from '../components/Header'
import Login from '../components/Login'

export default function SignIn() {
  return (
    <div>
      <div className="min-h-full max-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-2 p-7 rounded-md border-black border-2">
          <Header
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/signup"
            />
            <Login/>
        </div>
      </div>
    </div>
  )
}
