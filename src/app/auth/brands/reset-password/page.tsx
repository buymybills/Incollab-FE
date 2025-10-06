"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import PasswordChangeScreen from '@/components/screens/PasswordChangeScreen'
import useMutationApi from '@/hooks/useMutationApi'
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

interface BrandSignupFormData {
  email: string
  password: string
  confirmPassword: string
}

interface PasswordRequirement {
  text: string
  isValid: boolean
}

interface ForgotPasswordResponse {
  message: string
  token: string
  newPassword: string
}

const BrandsResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [signupResponseData, setSignupResponseData] = useState<ForgotPasswordResponse | null>(null)
  const router = useRouter()
  const { verificationKey } = useAuthContext()
  const [showPasswordChangeScreen, setShowPasswordChangeScreen] = useState<boolean>(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<BrandSignupFormData>({
    mode: 'onChange'
  })

  const password = watch('password', '')

  const { mutateAsync: brandResetPassword, isPending: resetPasswordLoading } = useMutationApi<ForgotPasswordResponse, { token: string; newPassword: string }>({
    endpoint: 'auth/brand/reset-password',
    method: 'POST',
    options: {
      headers: {
        "x-verification-key": verificationKey
      }
    },
    onSuccess: () => {
      setShowPasswordChangeScreen(true)
    }
  })

  // Password validation requirements
  
  const passwordRequirements = useMemo(() => {      
      const getPasswordRequirements = (password: string): PasswordRequirement[] => [
        { text: 'Minimum 8 characters', isValid: password.length >= 8 },
        { text: 'At least 1 lowercase letter (a-z)', isValid: /[a-z]/.test(password) },
        { text: 'At least 1 uppercase letter (A-Z)', isValid: /[A-Z]/.test(password) },
        { text: 'At least 1 number (0-9)', isValid: /\d/.test(password) },
        { text: 'At least 1 special character (@$%*?&)', isValid: /[@$%*?&]/.test(password) }
      ]
      return getPasswordRequirements(password);
  }, [password]);
  console.log(passwordRequirements)
  const allPasswordRequirementsMet = passwordRequirements.every(req => req.isValid)

  const onSubmit = async (data: BrandSignupFormData) => {
    try {
      const signupData = {
        token: data.email,
        newPassword: data.password
      }

      console.log("Submitting brand signup data:", signupData)
      const response = await brandResetPassword(signupData)
      console.log("Brand signup successful:", response)
    } catch (error) {
      console.error("Brand signup failed:", error)
    }
  }

  const handleGoBack = () => {
    if (showOtpForm) {
      setShowOtpForm(false)
      setSignupResponseData(null)
    } else {
      router.back()
    }
  }

  // If showing OTP form, render it
  if (showOtpForm && signupResponseData) {
    return (
      <div className="min-h-screen bg-white flex flex-col px-4">
        {/* Header */}
        <div className="py-4 flex items-center gap-4">
          <button onClick={handleGoBack}>
            <ChevronLeft size={24} className="text-[#090A0A]" />
          </button>
          <h1 className="font-bold text-[#090A0A]">OTP Verification</h1>
        </div>
      </div>
    )
  }

  if(showPasswordChangeScreen){
    return(
        <PasswordChangeScreen/>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-2 py-4 flex items-center gap-4">
        <button onClick={handleGoBack}>
          <ChevronLeft size={24} className="text-[#090A0A]" />
        </button>
        <h1 className="font-bold text-[#090A0A]">Set New Password</h1>
      </div>

      <p className='text-xs text-center'>Enter your new password below for dhruvbhatia912@gmail.com clas</p>

      {/* Main Content */}
      <div className="flex-1 bg-white px-4 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">

          {/* Add Password */}
          <div>
            <label className="block font-bold text-black mb-2">
              Add Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Full Name"
                {...register("password", {
                  required: "Password is required",
                  validate: () => allPasswordRequirementsMet || "Password must meet all requirements"
                })}
                className={`w-full px-4 py-4 border border-[#E4E4E4] rounded-full text-black placeholder:text-[#E4E4E4] focus:outline-none ${
                    errors.password ? 'border-red-500 ' : 'border-gray-300 focus:ring-theme-primary focus:ring-2'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400" />
                ) : (
                  <Eye size={20} className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-bold text-black mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Full Name"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match"
                })}
                className={`w-full px-4 py-4 border border-[#E4E4E4] rounded-full text-black placeholder:text-[#E4E4E4] focus:outline-none ${
                    errors.confirmPassword ? 'border-red-500 ' : 'border-[#E4E4E4] focus:ring-theme-primary focus:ring-2'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-400" />
                ) : (
                  <Eye size={20} className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="space-y-1 pb-20">
            <p className="text-sm font-light text-black">Password Must Contain -</p>
            <ul>
              {passwordRequirements.map((requirement, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div className={`w-1.5 h-1.5 rounded-full mr-3 ${
                    requirement.isValid ? 'bg-green-500' : 'bg-[#555]'
                  }`} />
                  <span className={requirement.isValid ? 'text-green-600' : 'text-[#555]'}>
                    {requirement.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="fixed bottom-6 w-full px-4">
        <div className="max-w-md mx-auto">
          <ArrowFilledButton
            text={resetPasswordLoading ? "Changing Password..." : "Submit Password"}
            textCenter={true}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !allPasswordRequirementsMet || resetPasswordLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default BrandsResetPassword