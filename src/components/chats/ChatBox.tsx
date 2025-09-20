"use client"
import { ArrowLeft, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import useGoBack from "@/hooks/useGoBack";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "support",
      content: (
        <>
          <div className="whitespace-pre-line font-medium text-[#222222] dark:text-white px-4">
            Hii, Lorem ipsum dolor sit amet, consectetur adipiscing.\nHow we can help you??
          </div>
          <div className="text-xs text-right font-medium text-[#000] dark:text-[#B0B0B0] mt-2 py-2 px-4">11.23AM</div>
        </>
      ),
    },
    {
      id: 2,
      type: "support",
      content: (
        <>
          <div className="text-base font-medium text-[#000] dark:text-white mb-2 px-4">Please Tell Us about your concern.</div>
          <div className="text-xs text-right font-medium text-[#000] dark:text-[#B0B0B0] mt-2 px-4">11.23AM</div>
          <div className="flex flex-col pt-4">
            {[1, 2, 3, 4].map(i => (
              <a
                key={i}
                href="#"
                className="text-[#0566EA] dark:text-[#4F8FFF] last:rounded-br-xl px-4 text-base font-medium border-b bg-white dark:bg-[#232323] border-[#E0E0E0] dark:border-[#333] py-2 hover:underline break-words"
                style={{ display: 'block' }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </a>
            ))}
          </div>
        </>
      ),
    },
  ]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newId = messages.length + 1;
    setMessages(prev => [
      ...prev,
      {
        id: newId,
        type: "user",
        content: (
          <>
            <div className="text-base font-medium text-[#000] dark:text-white break-words overflow-wrap-anywhere">{input}</div>
            <div className="text-xs font-medium text-right text-[#222222] dark:text-[#B0B0B0] mt-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
          </>
        ),
      },
    ]);
    setInput("");
    setAnimatingId(newId);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (animatingId !== null) {
      const timeout = setTimeout(() => setAnimatingId(null), 500);
      return () => clearTimeout(timeout);
    }
  }, [animatingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const goback = useGoBack();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");

  return (
    <div className="flex flex-col bg-transparent rounded-[20px] overflow-hidden h-full">
      {/* Header - Fixed height */}
      <div className='flex items-center gap-2 p-4 md:border-b dark:border-[#555] dark:text-white flex-shrink-0'>
        <ArrowLeft className='md:hidden cursor-pointer' onClick={goback} />
        <h2 className="text-xl font-bold">BMB Chat Support</h2>
      </div>
      
      {/* Chat Area - Takes remaining height with scroll */}
      <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
        <div className="flex flex-col px-5 sm:px-0 py-4 sm:py-8 max-w-md mx-auto w-full flex-1">
          <div className="flex flex-col items-stretch space-y-4 min-h-full justify-end">
            {messages.map((msg) =>
              msg.type === "support" ? (
                <div
                  key={msg.id}
                  className="bg-[#F6F6F6] dark:bg-[#2A2A2A] rounded-xl rounded-bl-none max-w-full sm:max-w-[350px] w-full border border-[#E4E4E4] dark:border-[#555] px-0 pt-3 self-start break-words overflow-wrap-anywhere"
                >
                  {msg.content}
                </div>
              ) : (
                <div
                  key={msg.id}
                  className={`bg-[#E6F0FA] dark:bg-[#1E3A5F] rounded-t-xl rounded-bl-xl px-4 sm:px-5 py-3 max-w-full self-end transition-all duration-500 break-words overflow-wrap-anywhere ${animatingId === msg.id ? 'opacity-0 translate-y-4 animate-fadein' : 'opacity-100 translate-y-0'}`}
                  style={animatingId === msg.id ? { animation: 'fadein 0.5s forwards' } : {}}
                >
                  {msg.content}
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      {/* Input at bottom - Fixed height */}
      <div className="border-t border-[#E0E0E0] dark:border-[#333] bg-white dark:bg-[#232323] py-4 flex-shrink-0">
        <div className="flex items-start flex-col gap-2 sm:gap-4 px-4">
          {previewUrl && (
            <div className="image h-[40px] w-[40px] relative rounded-xl overflow-hidden">
              <Image src={previewUrl} alt="preview" fill className="object-contain" />
            </div>
          )}
          <div className="flex items-center gap-2 w-full">
            <button className="left-0 flex-shrink-0 h-4 w-4 md:h-8 md:w-8 relative" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="text-[#555] h-4 w-4 md:h-6 md:w-6"/>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
            <input
              type="text"
              placeholder="Write a message"
              className="w-full border-0 outline-none bg-transparent font-bold dark:text-white text-base sm:text-xl placeholder:text-[#999] dark:placeholder:text-[#666666]"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button className="ml-1 sm:ml-2 flex-shrink-0 h-4 w-4 md:h-8 md:w-8 relative" onClick={handleSend}>
              <Image src={"/images/icons/send-message.svg"} alt="send-message-icon" fill className="object-contain dark:filter dark:invert" />
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .animate-fadein {
          animation: fadein 0.5s forwards;
        }
        
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .overflow-wrap-anywhere {
          overflow-wrap: anywhere;
          word-break: break-word;
          hyphens: auto;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}