"use client";
import { useAuthContext } from "@/auth/context/auth-provider";
import useMutationApi from "@/hooks/useMutationApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ArrowFilledButton from "../buttons/ArrowFilledButton";

interface OtpForm {
    phone: string;
}

interface OtpFormResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  phone: string;
  profileCompleted: boolean;
  requiresProfileCompletion: boolean;
  verificationKey: string;
}

export default function OtpForm({phone}: OtpForm) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const {setVerificationKey, setAccessToken, verificationKey} = useAuthContext();

  const {mutateAsync: verifyOtp, isPending: verifyOtpLoading} = useMutationApi<OtpFormResponse>({
    endpoint: 'auth/influencer/verify-otp',
    method: 'post',
  })

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = () => {
    setResendTimer(20);
    setCanResend(false);
    // Add your resend OTP logic here
    console.log("Resending OTP...");
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await verifyOtp({
      phone: phone,
      otp: otp.join("")
    })

    if (response?.profileCompleted) {
      setAccessToken(response?.accessToken, 'influencer');
      console.log("inside if condition")
      router.push("/influencers");
    } else {
      // Store phone or other identifier for incomplete profiles
      setVerificationKey(response?.verificationKey);
      console.log({verificationKey})
      setAccessToken(response?.accessToken, 'influencer');
      router.push("/auth/profile");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8 md:text-center">
          <h1 className="mb-0.5 font-bold text-black">
            OTP Verification
          </h1>
          <p className="text-xs text-[#555]">
            You have received an OTP at {phone}
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
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

              {/* <!-- Button --> */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Didn&apos;t get the code?{" "}
                </p>
                <div>
                {canResend ? (
                    <button
                      onClick={handleResend}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Resend
                    </button>
                  ) : (
                    <span className="text-gray-400">
                      {"("}Resend in {"00:"}{resendTimer}{")"}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <ArrowFilledButton text={verifyOtpLoading ? "Verifying OTP..." : "Continue"} textCenter={true}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
