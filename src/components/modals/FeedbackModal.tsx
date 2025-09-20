import React, { useRef, useState } from 'react'
import { Dialog, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowLeft, Clapperboard, ImageIcon } from 'lucide-react';
import Image from 'next/image';



interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyledDialogContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '32rem',
  width: '100%',
}));

const ReviewStar = ({ filled, onClick, onMouseEnter, onMouseLeave }: { filled: boolean, onClick: () => void, onMouseEnter: () => void, onMouseLeave: () => void }) => (
  <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill={filled ? '#FFD700' : 'none'}
      stroke={filled ? '#FFD700' : '#999999'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
  >
      <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
  </svg>
);

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  // Image upload state
  const [images, setImages] = useState<File[]>([]);
  console.log(images);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videos, setVideos] = useState<File[]>([]);
  console.log(videos);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Determine if current theme is dark
  const localTheme = typeof Storage !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkMode = localTheme === 'dark';

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Append new files to existing images
    setImages(prev => [...prev, ...files]);
    // Create preview URLs for new files and append
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const handleSubmit = () => {
    setRating(0);
    setReview('');
    setImages([]);
    setImagePreviews([]);
    setVideos([]);
    setVideoPreviews([]);
    onClose();
  };

  const handleVideoButtonClick = () => {
    videoInputRef.current?.click();
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setVideos(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setVideoPreviews(prev => [...prev, ...previews]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxHeight: '100vh',
          borderRadius: '16px',
          backgroundColor: isDarkMode ? '#1B1B1B' : '#ffffff',
        },
      }}
    >
      <StyledDialogContent>
        <div className="flex items-center gap-x-2 font-bold mb-8 dark:text-white">
          <IconButton onClick={onClose}>
            <ArrowLeft className="text-[#000] dark:text-white" />
          </IconButton>
          <span>Add Feedback</span>
        </div>
        <div className="flex gap-4 items-center mb-4">
          <div className='w-16 h-20 relative'>
            <Image
              src="/images/product/product-01.jpg"
              alt="United Coffee House"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="text-xs font-black text-[#57B400]">BOOKING CONFIRMED</div>
            <div className="font-bold text-base text-[#000] dark:text-[#666666]">United Coffee House</div>
            <div className="text-sm font-bold text-[#000]/70 dark:text-[#666666]">Noida Sector 18</div>
          </div>
          <div className="text-left text-sm text-[#666666]">
            <div>Booking ID - <span className="font-bold text-[#000] dark:text-white">382190</span></div>
            <div>4 Guest</div>
            <div>Sat, 21 Jan, 2025 at 12:00 PM</div>
          </div>
        </div>
        <div className="mb-3 font-bold text-sm text-[#555555]">Rate Your Experience</div>
        <div className="flex gap-2 mb-8 justify-between">
          {[1, 2, 3, 4, 5].map(i => (
            <ReviewStar
              key={i}
              filled={hoverRating ? i <= hoverRating : i <= rating}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        {/* Capture and add your Product Experience section */}
        <div className="mb-8">
          <div className="font-bold text-sm text-[#555555] mb-3 text-left">Capture and add your Product Experience</div>
          <div className="flex gap-4 justify-start flex-wrap">
            <button
              type="button"
              className="flex flex-1 items-center justify-center border-2 border-dotted border-[#0566EA] rounded-xl px-4 transition gap-x-1.5 py-2"
              onClick={handleImageButtonClick}
            >
              <ImageIcon size={24} className='dark:text-white'/>
              <div className="flex flex-col items-start">
                <p className="font-bold text-sm text-[#000] dark:text-white">Add Image</p>
                <p className="text-xs text-[#000] dark:text-white">At least 3-4 Images</p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </button>
            <button type="button" className="flex flex-1 items-center justify-center border-2 border-dotted border-[#0566EA] rounded-xl px-4 transition gap-x-1.5 py-2"
            onClick={handleVideoButtonClick}
            >
              <Clapperboard size={24} className='dark:text-white'/>
              <div className="flex flex-col items-start">
                <p className="font-bold text-sm text-[#000] dark:text-white">Add Video</p>
                <p className="text-xs text-[#000] dark:text-white">At least 30 Sec Long</p>
              </div>
              <input
                 type="file"
                 accept="video/*"
                 multiple
                 ref={videoInputRef}
                 style={{ display: 'none' }}
                 onChange={handleVideoChange}
              />
            </button>
          </div>
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <>
              <p className="font-bold text-sm text-[#555555] mb-3 text-left mt-1">Images</p>
              <div className="flex gap-3 mt-3 flex-wrap">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative w-20 h-20 group">
                    <Image
                      src={src}
                      alt={`preview-${idx}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                      style={{transform: 'translate(40%,-40%)'}} // visually outside top right
                      onClick={() => {
                        // Remove image and preview by index
                        setImages(prev => prev.filter((_, i) => i !== idx));
                        setImagePreviews(prev => prev.filter((_, i) => i !== idx));
                      }}
                      aria-label="Remove image"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

           {/* Video Previews */}
           {videoPreviews.length > 0 && (
                        <>
                            <p className="font-bold text-sm text-[#555555] mb-3 text-left mt-4">Videos</p>
                            <div className="flex gap-3 mt-3 flex-wrap">
                                {videoPreviews.map((src, idx) => (
                                    <div key={idx} className="relative w-28 h-20 group">
                                        <video
                                            src={src}
                                            controls
                                            className="object-cover rounded-lg w-full h-full"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                            style={{transform: 'translate(40%,-40%)'}}
                                            onClick={() => {
                                                setVideos(prev => prev.filter((_, i) => i !== idx));
                                                setVideoPreviews(prev => prev.filter((_, i) => i !== idx));
                                            }}
                                            aria-label="Remove video"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
        </div>
        <div className="mb-4 font-bold text-sm text-[#555555]">Write Personalised review to let organiser know.</div>
        <textarea
          className="w-full rounded-xl border border-gray-300 p-3 text-sm min-h-[80px] mb-4 dark:text-white"
          placeholder="Please Specify in detail"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button
          className="w-full bg-[#0F71FA] text-white font-semibold rounded-xl py-3 text-base hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </StyledDialogContent>
    </Dialog>
  );
}