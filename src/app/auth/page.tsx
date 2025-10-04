"use client"
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center md:justify-start md:py-0 md:items-start md:px-0">
      <div className="max-w-md md:max-w-full h-dvh flex-1 md:h-[90vh] w-full text-center flex flex-col border border-[#E4E4E4] justify-around px-4" style={{backgroundImage: 'url(/images/bg/auth-landing-page-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className='space-y-5 md:space-y-3 md:bg-[#403c3c] w-full md:flex items-center flex-col md:pb-10'>
        </div>
        
        <div className="space-y-4 mt-auto md:flex w-full md:w-1/2 gap-x-3 pb-4">
          <div className="flex items-center font-extrabold text-lg text-[#555] justify-center">
            <span>CONNECT.</span>
            <span>COLLABORATE.</span>
            <span>CREATE.</span>
          </div>
          <div className='flex items-center justify-center'>
            <span className="text-[#999] font-medium">Find your next collaboration, showcase your profile, or hire the right talent</span>
          </div>
          <div className="buttons flex flex-col px-8 gap-y-3">
            <button onClick={() => router.push('/auth/signin')} className='bg-theme-primary text-white font-bold px-12 rounded-full py-4'>Join as an Influencer</button>
            <button onClick={() => router.push('/auth/brands/signin')} className='bg-white border border-[#E4E4E4] text-theme-primary font-bold flex-1 rounded-full py-4'>Join as a Brand</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage