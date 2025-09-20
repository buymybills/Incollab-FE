import { ArrowLeft, Clapperboard, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface BookingInfo {
    image: string;
    status: string;
    statusColor: string;
    place: string;
    location: string;
    id: string;
    guests: number;
    date: string;
}

interface ReviewBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    booking: BookingInfo;
}

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

const ReviewBottomSheet: React.FC<ReviewBottomSheetProps> = ({ isOpen, onClose, booking }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const sheetRef = useRef<HTMLDivElement>(null);
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);

    // Image upload state
    const [images, setImages] = useState<File[]>([]);
    console.log(images);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Video upload state
    const [videos, setVideos] = useState<File[]>([]);
    console.log(videos);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY.current;
        if (deltaY > 0) {
            setDragY(Math.min(deltaY, 120));
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (dragY > 80) {
            onClose();
        }
        setDragY(0);
    };

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(prev => [...prev, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
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

    const handleSubmit = () => {
        setRating(0);
        setReview('');
        setImages([]);
        setImagePreviews([]);
        setVideos([]);
        setVideoPreviews([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-[#000]/70 z-40" onClick={onClose} />
            {/* Bottom Sheet */}
            <div
                ref={sheetRef}
                className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#282828] z-50 rounded-t-2xl transition-transform duration-300 ease-out max-h-[90vh] flex flex-col"
                style={{
                    transform: `translateY(${dragY}px)`
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-1">
                    {/* Drag Handle */}
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 pt-2 pb-4">
                        <button onClick={onClose} className="dark:text-white text-[#000]">
                            <ArrowLeft />
                        </button>
                        <span className="font-bold text-base dark:text-white text-[#000]">Add Feedback</span>
                    </div>
                    {/* Booking Info */}
                    <div className="flex items-center px-4 gap-x-4 mt-4">
                        <div className="w-20 h-20 relative mb-2">
                            <Image src={booking.image} alt={booking.place} fill className="rounded-lg object-cover" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className={`text-xs font-bold ${booking.statusColor}`}>{booking.status}</div>
                            <div className="font-bold text-base text-[#000] dark:text-white">{booking.place}</div>
                            <div className="text-sm font-bold text-[#000]/70 dark:text-white/70">{booking.location}</div>
                            <div className="text-sm text-[#999]">
                                Booking ID - <span className="font-bold text-[#000] dark:text-white">{booking.id}</span>
                            </div>
                            <div className="font-medium text-[#666666] dark:text-[#999] text-sm">{booking.guests} Guest</div>
                            <div className="font-medium text-sm text-[#666666] dark:text-[#999]">{booking.date}</div>
                        </div>
                    </div>
                    {/* Rating */}
                    <div className="mb-2 font-bold text-sm text-[#555555] px-4 mt-4">Rate Your Experience</div>
                    <div className="flex gap-2 mb-4 justify-between px-4">
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
                    <div className="mb-4 px-4">
                        <div className="font-bold text-sm text-[#555555] mb-3 text-left">Capture and add your Product Experience</div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="flex items-center justify-center border-2 border-dotted border-[#0566EA] rounded-xl px-2 flex-1 transition hover:bg-[#f6faff] gap-x-1.5 py-1"
                                onClick={handleImageButtonClick}
                            >
                                <ImageIcon size={20} className='dark:text-white'/>
                                <div className="flex flex-col items-start">
                                    <p className="font-bold text-sm text-[#000] dark:text-white">Add Image</p>
                                    <p className="text-xs text-[#000] dark:text-gray-400 text-nowrap">At least 3-4 Images</p>
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
                            <button
                                type="button"
                                className="flex items-center justify-center border-2 border-dotted border-[#0566EA] rounded-xl px-2 flex-1 transition hover:bg-[#f6faff] gap-x-1.5 py-2"
                                onClick={handleVideoButtonClick}
                            >
                                <Clapperboard size={20} className='dark:text-white'/>
                                <div className="flex flex-col items-start">
                                    <p className="font-bold text-sm text-[#000] dark:text-white">Add Video</p>
                                    <p className="text-xs text-[#000] dark:text-gray-400 text-nowrap">At least 30 Sec Long</p>
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
                                <p className="font-bold text-sm text-[#555555] text-left mt-4">Images</p>
                                <div className="flex gap-3 overflow-x-auto py-4 no-scrollbar">
                                    {imagePreviews.map((src, idx) => (
                                        <div key={idx} className="relative w-20 h-20 group shrink-0">
                                            <Image
                                                src={src}
                                                alt={`preview-${idx}`}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                style={{transform: 'translate(40%,-40%)'}}
                                                onClick={() => {
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
                                <div className="flex gap-3 overflow-x-auto py-4 no-scrollbar">
                                    {videoPreviews.map((src, idx) => (
                                        <div key={idx} className="relative w-28 h-20 group shrink-0">
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

                    {/* Review Textarea */}
                    <p className="font-bold text-sm text-[#555555] px-4 mt-5">Write Personalised review to let organiser know.</p>
                    <div className="px-4 mb-4 mt-3">
                        <textarea
                            className="w-full rounded-xl border border-gray-300 p-3 text-sm min-h-[80px] text-[#999] dark:bg-[#333] dark:border-gray-600 dark:text-white"
                            placeholder="Please Specify in detail"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </div>
                </div>
                
                {/* Fixed Submit Button */}
                <div className="px-4 py-4 bg-white dark:bg-[#282828] border-t border-gray-200 dark:border-gray-600">
                    <button
                        className="w-full bg-[#0566EA] text-white font-semibold rounded-xl py-3 text-base hover:bg-blue-700 transition"
                        onClick={handleSubmit}
                    >
                        Submit Feedback
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReviewBottomSheet;