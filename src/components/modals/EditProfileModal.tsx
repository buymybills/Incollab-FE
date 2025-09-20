"use client"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { ArrowLeft, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfileName: string;
}

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export default function EditProfileModal({
  isOpen,
  onClose,
  initialProfileName,
}: EditProfileModalProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [profileName, setProfileName] = useState(initialProfileName);
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine if current theme is dark
  const localTheme = typeof Storage !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkMode = localTheme === 'dark';
  useEffect(() => {
    // Reset changes when modal opens
    setHasChanges(false);
    setProfileName(initialProfileName);
  }, [isOpen, initialProfileName]);

  const handleEditImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-profile-title"
      PaperProps={{
        sx: {
          maxWidth: '30vw',
          width: '30%',
          maxHeight: '100vh',
          borderRadius: '16px',
          backgroundColor: isDarkMode ? '#1B1B1B' : '#ffffff',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <ArrowLeft onClick={onClose} className='text-[#000] dark:text-white cursor-pointer'/>
        <span className="text-base font-bold text-[#000] dark:text-white">Edit Profile</span>
      </DialogTitle>
      <StyledDialogContent>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-2">
            <Image
              src={"/images/user/user-01.jpg"}
              alt="avatar"
              fill
              className="rounded-full object-cover"
            />
            <div
              className={`absolute bottom-2 right-2 rounded-full p-1 border cursor-pointer dark:bg-[#555] dark:border-[#555] bg-white border-gray-200`}
              onClick={handleEditImageClick}
            >
              <Edit size={15} className={`dark:text-white text-black`} />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-base font-normal text-[#52525B] dark:text-[#999999] mb-1">Name</label>
          <div className={`flex items-center rounded-sm px-3 py-2
            dark:bg-[#282828] bg-[#E4E4E4]`}>
            {isEditingName ? (
              <input
                className={`flex-1 bg-transparent outline-none text-sm font-medium dark:text-white text-[#000]`}
                value={profileName}
                onChange={(e) => {
                  setProfileName(e.target.value);
                  setHasChanges(e.target.value !== initialProfileName);
                }}
                onBlur={() => setIsEditingName(false)}
                autoFocus
              />
            ) : (
              <>
                <span className={`flex-1 text-base font-medium dark:text-white text-[#000]`}>{profileName}</span>
                <button
                  className={`text-[#0F71FA] text-sm font-semibold ml-2 border-l px-2 dark:border-[#555] border-[#000]`}
                  onClick={() => setIsEditingName(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-base font-normal text-[#52525B] dark:text-[#999999] mb-1">Number</label>
          <div className={`flex items-center rounded-sm px-3 py-2
            dark:bg-[#282828] bg-[#E4E4E4]`}>
          <input
            className={`flex-1 bg-transparent outline-none text-sm font-medium text-[#999]`}
            value="+91 8731298877"
            disabled
          />
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-base font-normal text-[#52525B] dark:text-[#999999] mb-1">Email</label>
          <div className={`flex items-center rounded-sm px-3 py-2
            dark:bg-[#282828] bg-[#E4E4E4]`}>
          <input
            className={`flex-1 bg-transparent outline-none text-sm font-medium text-[#999]`}
            value="hdcbabkmun@gmail.com"
            disabled
          />
          </div>
        </div>
        <div className={`text-xs mt-2 mb-4 ${
          isDarkMode ? 'text-[#999]' : 'text-[#000]'
        }`}>
          <span className="text-red-600 ms-1">*</span>Contact Number and email is not editable.<br />
          To edit contact number nad email please contact <Link href="#" className="text-[#0F71FA] underline">Tech Support</Link>
        </div>
        <button 
          className={`rounded-sm text-white w-full py-3 font-bold text-base mt-8 ${
            hasChanges ? 'bg-[#0566EA] cursor-pointer' : 'dark:bg-[#555] bg-[#E4E4E4] cursor-not-allowed'
          }`}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save Changes
        </button>
      </StyledDialogContent>
    </Dialog>
  );
}