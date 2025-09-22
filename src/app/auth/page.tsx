"use client"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import ArrowNonFilledButton from '@/components/buttons/ArrowNonFilledButton'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center md:justify-start md:py-0 md:items-start md:px-0">
      <div className="max-w-md md:max-w-full h-[100dvh] flex-1 md:h-[90vh] w-full text-center flex flex-col border border-[#E4E4E4] justify-around px-4">
        <div className='space-y-5 md:space-y-3 md:bg-[#403c3c] w-full md:flex items-center flex-col md:pb-10'>
            <div className="space-y-2 flex items-start flex-col md:flex-row md:gap-x-2">
                <h1 className="text-[32px] md:text-[64px] font-bold text-black tracking-tight">
                    CONNECT.
                </h1>
                <h1 className="text-[32px] md:text-[64px] font-bold text-black tracking-tight">
                    COLLABORATE.
                </h1>
                <h1 className="text-[32px] md:text-[64px] font-bold text-black tracking-tight">
                    CREATE.
                </h1>
            </div>
            
            <p className="text-[#999] text-base md:text-2xl leading-relaxed text-left">
                Find your next collaboration, showcase your profile, 
                or hire the right talent
            </p>
        </div>
        
        <div className="space-y-4 mt-12 md:flex w-full md:w-1/2 gap-x-3">
          <ArrowNonFilledButton className='w-full' text="Join as an Influencer" onClick={(() => router.push('/auth/signin'))}/>
          <ArrowFilledButton className='w-full' text="Join as an Brand" onClick={(() => router.push('/auth/brands/signin'))}/>
        </div>
      </div>
    </div>
  )
}

export default AuthPage