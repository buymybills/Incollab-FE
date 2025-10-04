"use client"
import React, { useRef, useState } from 'react'
import useGoBack from '@/hooks/useGoBack'
import { ChevronLeft, DiamondPlus, Upload, X } from 'lucide-react'
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/auth/context/auth-provider'

const AddPostPage = () => {
    const goBack = useGoBack();
    const router = useRouter();
    const { user } = useAuthContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [postText, setPostText] = useState('');

    const verificationStatus = user?.verificationStatus?.status;

    const {mutateAsync: addPost, isPending: addPostLoading} = useMutationApi({
        endpoint: 'posts',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onSuccess: () => {
            router.push('/influencers/me')
        }
    })
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setSelectedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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

    const handleSubmit = async () => {
        if (!postText.trim() && selectedFiles.length === 0) {
            alert('Please add some content or media to your post');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('content', postText);

            // Append media files
            selectedFiles.forEach((file) => {
                formData.append('media', file);
            });

            await addPost(formData as unknown as DynamicMutationPayload);
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    // Show verify profile screen if not approved
    if (verificationStatus !== 'approved') {
        return (
            <div>
                <div className='border-b border-dashed border-[#E4E4E4] flex items-center justify-between px-4 py-3'>
                    <div className='flex items-center gap-2'>
                        <button onClick={goBack}>
                            <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                        <h1 className="font-extrabold text-black">Add Post</h1>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-y-2 justify-center min-h-[70vh] px-4'>
                    <p className='text-[#555] font-medium text-sm text-center'>COMPLETE VERIFICATION TO POST CONTENT</p>
                    <button
                        className='flex items-center gap-x-2 border border-dashed border-theme-primary rounded-full px-3 py-2 font-semibold text-theme-primary'
                        onClick={() => router.push('/influencers/me/verify')}
                    >
                        <DiamondPlus size={16}/>
                        Verify Profile
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='border-b border-dashed border-[#E4E4E4] flex items-center justify-between px-4 py-3'>
                <div className='flex items-center gap-2'>
                    <button onClick={goBack}>
                        <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                    <h1 className="font-extrabold text-black">Add Post</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={addPostLoading || (!postText.trim() && selectedFiles.length === 0)}
                    className={`rounded-full py-1.5 px-4 transition-colors ${
                        postText.trim().length > 0 || selectedFiles.length > 0
                            ? 'bg-theme-primary text-white hover:bg-theme-primary/90'
                            : 'bg-[#E4E4E4] text-gray-400 cursor-not-allowed'
                    } ${addPostLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {addPostLoading ? 'Posting...' : 'Post'}
                </button>
            </div>
            <div className="textarea px-4 mt-2">
                <textarea 
                    placeholder="What do you want to share..." 
                    className='text-black placeholder:text-[#999] text-xl w-full focus:outline-none resize-none min-h-[60px] max-h-[300px]'
                    ref={textareaRef}
                    onChange={handleTextareaChange}
                    rows={1}
                />
            </div>
            
            {/* File Preview Section */}
            {selectedFiles.length > 0 && (
                <div className="px-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ) : file.type.startsWith('video/') ? (
                                    <video
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-48 object-cover rounded-lg"
                                        controls
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                                        <div className="text-center">
                                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600 truncate px-2">{file.name}</p>
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute -top-2 -right-2 bg-theme-primary text-white rounded-full p-1 hover:bg-theme-primary/90 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="add-media fixed bottom-0 right-4 pb-5">
                <button className='text-black flex items-center gap-2' onClick={() => inputRef.current?.click()}>
                    <Upload/>
                    <span>Add Media</span>
                </button>
            </div>
            <input
                type="file"
                className='hidden'
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                multiple
            />
        </div>
    )
}

export default AddPostPage