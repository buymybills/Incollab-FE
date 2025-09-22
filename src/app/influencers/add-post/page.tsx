"use client"
import React, { useRef, useState } from 'react'
import useGoBack from '@/hooks/useGoBack'
import { ChevronLeft, Upload, X } from 'lucide-react'
const AddPostPage = () => {
    const goBack = useGoBack();
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [postText, setPostText] = useState('');
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    
    const removeFile = () => {
        setSelectedFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        setPostText(textarea.value);
    };
    return (
        <div>
            <div className='border-b border-dashed border-[#E4E4E4] flex items-center justify-between px-4 py-3'>
                <div className='flex items-center gap-2'>
                    <button onClick={goBack}>
                        <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                    <h1 className="font-extrabold text-black">Add Post</h1>
                </div>
                <button className={`bg-[#E4E4E4] text-white rounded-full py-1.5 px-4 ${postText.length > 0 ? 'bg-theme-primary' : 'bg-[#E4E4E4]'}`}>Post</button>
            </div>
            <div className="textarea px-4 mt-2">
                <textarea 
                    placeholder="What do you want to share..." 
                    className='text-[#999] text-xl w-full focus:outline-none resize-none min-h-[60px] max-h-[300px]'
                    ref={textareaRef}
                    onChange={handleTextareaChange}
                    rows={1}
                />
            </div>
            
            {/* File Preview Section */}
            {selectedFile && (
                <div className="px-4 mt-4">
                    <div className="relative inline-block">
                        {selectedFile.type.startsWith('image/') ? (
                            <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Preview" 
                                className="max-w-full h-64 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">{selectedFile.name}</p>
                                </div>
                            </div>
                        )}
                        <button 
                            onClick={removeFile}
                            className="absolute -top-2 -right-2 bg-theme-primary text-white rounded-full p-1 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}
            <div className="add-media fixed bottom-0 right-4 pb-1">
                <button className='text-black flex items-center gap-2' onClick={() => inputRef.current?.click()}>
                    <Upload/>
                    <span>Add Media</span>
                </button>
            </div>
            <input 
                type="file" 
                name="" 
                id="" 
                className='hidden' 
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
            />
        </div>
    )
}

export default AddPostPage