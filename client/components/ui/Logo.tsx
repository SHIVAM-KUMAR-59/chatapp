import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className='flex items-center space-x-2 cursor-pointer'>
        <MessageCircle className='w-7 h-7 text-blue-500' />
        <span className='text-2xl font-bold text-blue-500'>
            ChatApp
        </span>
    </Link>
  )
}

export default Logo