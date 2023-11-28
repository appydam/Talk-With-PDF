//   /chat/id
// folder name '[chatId]' is a wildcard in nextjs, its routed to chat/{any chat id}, like ' chat/dfjdfjds'

import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: {
    chatId: string;     // this 'chatId' should match with the folder name
  }
}

const ChatPage = async({params: {chatId}}: Props) => {   // we have just passed params. Getting chatId via nested destructuring
  
  const {userId} = await auth();
  if(!userId) {
    return redirect('/sign-in')
  }

  // db from drizzleORM
  // chats coming from schema
  // _chats is the list returned from database
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId))   // gives us all the chats for a userId
  
  if(!_chats) {  // if there isn't any chat
    return redirect('/')
  }
  if(!_chats.find(chat => chat.id === parseInt(chatId))) { // if we couldnn't find chatId within the owner(user) _chats
    return redirect('/')
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();



  return (
    <div className="">
    <div className='flex h-[90vh] overflow-hidden rounded-2xl mx-4 my-4 border border-gray-900 '>
      <div className='flex w-full h-full overflow-hidden'>

        {/* chat sidebar */}
        <div className='flex-[1] max-w-xs'>
            <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro}/>
        </div>

        {/* pdf viewer */}
        <div className=' flex-[5] max-h-screen overflow-scroll p-4'>
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>

        {/* chat component */}
        <div className='flex-[3] border-l-4 border-l-slate-200'>
          <ChatComponent chatId={parseInt(chatId)}/>  {/* we passed this chatId to ChatComponent */}
        </div>

      </div>
      </div>

      <div className=" flex items-center justify-center -translate-y-5 p-4">
        <button className="flex bg-gray-500 text-white p-2 rounded-lg">
          <Link href='/'><span className='mr-2'>Home</span> </Link>
          <Home size={20} strokeWidth={1.5}/>
        </button>
      </div>



    </div>
  )
}

export default ChatPage