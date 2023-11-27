import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/SubscriptionButton';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import Navbar from '@/components/Navbar';

// async makes sure that its a server component
export default async function Home() {

  const {userId} = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
    <Navbar/>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">Talk with PDF</h1>
          <UserButton afterSignOutUrl='/'/>
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
      </div>
    </div>
  </div>
  )
}