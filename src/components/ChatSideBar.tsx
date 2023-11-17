'use client'
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
    chats: DrizzleChat[],
    chatId: number
}

const ChatSideBar = ({chats, chatId}: Props) => {
  return (
    <div className='w-full h-screen overflow-scroll soff p-4 text-gray-200 bg-gray-900'>
        
        {/* New chat button */}
        <Link href='/'>
            <Button variant="secondary" className='w-full border-white border'>
                <PlusCircle className='mr-2 w-4 h-4'/>
                New Chat
            </Button>
        </Link>

        <div className='flex flex-col gap-2 mt-2'>
            {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`} className='rounded-md'>
                <div
                className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                    "bg-slate-700 text-white": chat.id === chatId,
                    "hover:text-white": chat.id !== chatId,
                })}
                >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                    {chat.pdfName}
                </p>
                </div>
            </Link>
            ))}
        </div>



        <div className='absolute bottom-4 left-4'>
            <div className='flex items-center gap-2 flex-wrap text-sm text-gray-500'>
                <Link href='/'>Home</Link>
                <Link href='/'>Source</Link>
                {/* Stripe button */}
            </div>
        </div>





    </div>
  )
}

export default ChatSideBar