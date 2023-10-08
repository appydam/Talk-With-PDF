import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import FileUpload from '@/components/FileUpload';

// async makes sure that its a server component
export default async function Home() {

  const {userId} = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">Talk with PDF</h1>
          <UserButton afterSignOutUrl='/'/>
        </div>

        <div className="flex mt-2">
         {
          isAuth && <Button>Go to chats</Button>
         }
        </div>

        <p className="max-w-xl mt-1 text-lg text-slate-700">
        Empowering Students, Researchers, and Professionals Worldwide with Instant AI-Powered Knowledge and Research Insights.
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