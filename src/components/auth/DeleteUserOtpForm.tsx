"use client";
import useMutationApi from "@/hooks/useMutationApi";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

interface DeleteUserOtpFormProps {
  phone?: string;
  email?: string;
  userType?: 'influencer' | 'brand';
}

export default function DeleteUserOtpForm({ phone, email, userType }: DeleteUserOtpFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter()

  const {mutateAsync: verifyOtp, isPending: verifyOtpLoading} = useMutationApi({
    endpoint: 'auth/verify-delete-otp',
    method: 'POST',
    onSuccess: () => {
      // OTP verified successfully, show success toast
      toast.success("Account deleted successfully!");

      // Trigger the redirect after a short delay
      setTimeout(() => {
        router.push('/auth')
      }, 1000);
    }
  })

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    // Update the state with the new value
    setOtp(updatedOtp);

    // Automatically move to the next input if a value is entered
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const updatedOtp = [...otp];

      // If current input is empty, move focus to the previous input
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }

      // Clear the current input
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (event.key === "ArrowRight" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Get the pasted text
    const pasteData = event.clipboardData.getData("text").slice(0, 6).split("");

    // Update OTP with the pasted data
    const updatedOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (idx < updatedOtp.length) {
        updatedOtp[idx] = char;
      }
    });

    setOtp(updatedOtp);

    // Focus the last filled input
    const filledIndex = pasteData.length - 1;
    if (inputsRef.current[filledIndex]) {
      inputsRef.current[filledIndex].focus();
    }
  };

  const displayText = phone || email || "";
  const isOtpComplete = otp.every(digit => digit !== "");

  const handleContinueClick = async () => {
    if (isOtpComplete) {
      // Build endpoint dynamically with current OTP value
      const params = new URLSearchParams();

      if (userType) {
        params.append('userType', userType);
      }

      const otpString = otp.join("");
      params.append('otp', otpString);

      if (userType === 'influencer' && phone) {
        params.append('phone', phone);
      } else if (userType === 'brand' && email) {
        params.append('email', email);
      }

      // Call verify OTP API with query parameters
      await verifyOtp({
        dynamicEndpointSuffix: `?${params.toString()}`
      });
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full mx-auto">
        <div className="mb-5 sm:mb-8 md:text-center">
          <h1 className="mb-0.5 font-bold text-black">
            OTP Verification
          </h1>
          <p className="text-xs text-[#555]">
            You have received an OTP at {displayText}
          </p>
        </div>
        <div>
          <div className="space-y-5">
            <div>
              <div className="flex gap-1.5 sm:gap-4" id="otp-container">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                    ref={(el) => {
                      if (el) {
                        inputsRef.current[index] = el;
                      }
                    }}
                    className={`border-2 rounded-full w-12 flex-1 h-16 flex items-center justify-center text-center font-medium ${
                      otp[index] ? "border-black" : "border-[#E4E4E4]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="mt-5 fixed bottom-6 left-0 right-0 px-4">
              <button
                onClick={handleContinueClick}
                disabled={!isOtpComplete || verifyOtpLoading}
                className={`w-full py-4 rounded-full font-medium text-base transition-colors ${
                  isOtpComplete && !verifyOtpLoading
                    ? 'bg-[#FF3B30] text-white'
                    : 'bg-[#E4E4E4] text-[#999] cursor-not-allowed'
                }`}
              >
                {verifyOtpLoading ? 'Verifying...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
