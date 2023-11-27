'use client'
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import SubscriptionButton from './SubscriptionButton'

type Props = {
    chats: DrizzleChat[];
    chatId: number;
    isPro: boolean
}

const ChatSideBar = ({chats, chatId, isPro}: Props) => {

  const [loading, setLoading] = React.useState(false);
  const handleSubscription =async () => {
    try {
        setLoading(true);
        const response = await axios.get('/api/stripe');
        // console.log('response = ', response)
        window.location.href = response.data.url;
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }  


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



        {/* <div className='absolute bottom-2 left-4'> */}
            {/* <div className='text-lg text-gray-900 bg-slate-200 m-1 p-2 rounded-md w-72 text-center'>
                <Link href='/'>Home</Link>
               
            </div> */}
            {/* <Button className='mt-2 text-white bg-slate-700' disabled={loading} onClick={handleSubscription}>
                Upgrade to Pro
            </Button> */}
            {/* <SubscriptionButton isPro={isPro}/> */}
        {/* </div> */}





    </div>
  )
}

export default ChatSideBar