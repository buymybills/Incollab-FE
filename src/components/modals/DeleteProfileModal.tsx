import Dialog from '@mui/material/Dialog';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface DeleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteProfileModal({ isOpen, onClose, onDelete }: DeleteProfileModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const deleteReasons = [
    'Moving to another platform',
    'Not satisfied with the service',
    'Other reasons'
  ];

  // Determine if current theme is dark
  const localTheme = typeof Storage !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkMode = localTheme === 'dark';

  const handleDelete = () => {
    if (selectedReason) {
      onDelete();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-profile-title"
      PaperProps={{
        sx: {
          maxWidth: '28rem', // max-w-md equivalent
          width: '100%',
          maxHeight: '100vh',
          backgroundColor: isDarkMode ? '#1B1B1B' : '#ffffff',
        },
      }}
    >
      <div className="max-w-md w-full p-0">
        <div className="p-6">
        <button onClick={onClose} className="text-base flex items-center gap-x-2 font-bold mb-4 dark:text-white">
          <ArrowLeft className="text-[#000] dark:text-white" />
          <span className="text-base font-bold">Delete Account</span>
        </button>
        <div className="mb-4 text-sm text-[#000] dark:text-white p-1">
          Please select a reason for deleting your account:
        </div>
        <form className="flex flex-col gap-4 mb-6 p-1">
          {deleteReasons.map((reason, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="delete-reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className={`accent-[#000] w-5 h-5 ${isDarkMode ? 'accent-white' : ''}`}
              />
              <span className="text-sm font-medium dark:text-white">{reason}</span>
            </label>
          ))}
        </form>
        <button
          onClick={handleDelete}
          disabled={!selectedReason}
          className={`w-full ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-[#FF3B30] hover:bg-red-700'} text-white font-semibold rounded-xl py-3 text-base mt-2 transition`}
        >
          Delete Account
        </button>
      </div>
      </div>
    </Dialog>
  );
}