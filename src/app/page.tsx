import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link';
import { ArrowRight, ChevronDownSquare, LogIn } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/SubscriptionButton';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

// async makes sure that its a server component
export default async function Home() {

  const {userId} = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  const chatPageImageURL = 'https://talking-with-pdf.s3.ap-south-1.amazonaws.com/assets/chatPage.png';
  const socialLogins = 'https://talking-with-pdf.s3.ap-south-1.amazonaws.com/assets/signIns.png';

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
   <>
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
      <Navbar/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Talk with PDF</h1>
            
          </div>

          <div className="flex mt-2">
          {
            isAuth && firstChat && 
            <Link href={`/chat/${firstChat.id}`}>
              <Button>Go to chats <ArrowRight className='ml-2'/> </Button>
            </Link>
          }

          {/* <div className="ml-3">
            <SubscriptionButton isPro={isPro}/>
          </div> */}

          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-700">
          Empowering Students, Researchers, and Professionals Worldwide with instant AI-Powered Knowledge and Research Insights.
          </p>

          <div className="w-full mt-4">
              {isAuth ? (
                <FileUpload/>
              ) : (
                <Link href="/sign-in">
                  <Button>
                    Login to get Started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
          </div>
          { !isAuth &&
            <div className="flex items-center justify-center w-[20vw] translate-y-[35.5vh] rounded-lg h-14 shadow-2xl bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-slate-500">
              <ChevronDownSquare size={40} strokeWidth={1.5} className='text-white mt-7'/>
            </div>
          }
          { isAuth &&
            <div className="flex items-center justify-center w-[20vw] translate-y-52 rounded-lg h-14 shadow-2xl bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-slate-500">
              <ChevronDownSquare size={40} strokeWidth={1.5} className='text-white mt-7'/>
            </div>
          }
        </div>
      </div>
    </div>
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-600 via-gray-300 to-gray-300">
    
      <div className="flex flex-col items-center justify-center h-screen"> 
        <div className='flex -translate-x-32'>
        <span className="mb-4 text-slate-900 translate-y-6 -translate-x-6">We have your favorite social logins!</span>
          <div className=" p-4 rounded-lg shadow-2xl max-w-[20vw] max-h-[10vh]">
            {/* <img
              src={socialLogins}
              alt="Desktop"
              className="w-full h-30px object-cover rounded-lg"
            /> */}
            <Image
              src={socialLogins}
              width={10000}
              height={10000}
              alt="Picture of social logins"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        <div className='flex items-center'>
          <div className="p-4 rounded-lg shadow-2xl max-w-[70vw] max-h-[70vh] w-full h-full mt-8">
            {/* <img
              src={chatPageImageURL}
              alt="Desktop"
              className="w-full h-full object-cover rounded-lg"
            /> */}
            <Image
              src={chatPageImageURL}
              width={10000}
              height={10000}
              alt="Picture of the chat UI"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="ml-4 p-1">
          <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-lg w-[300px]">
            <p className="text-gray-800 text-lg font-semibold">Glimpse of Chat UI</p>
            <p className="text-gray-600">Highly Secured, Fast and Smooth</p>
          </div>
          </div>
        </div>
      </div>

    </div>

    <Footer/>

   </>
  )
}