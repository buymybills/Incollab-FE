import Dialog from '@mui/material/Dialog';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

// Mock device data - replace with actual data from your backend
const mockDevices = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    isCurrent: true
  },
  {
    id: 2,
    name: "MacBook Pro",
    isCurrent: false
  },
  {
    id: 3,
    name: "iPad Air",
    isCurrent: false
  },
  {
    id: 4,
    name: "Samsung Galaxy",
    isCurrent: false
  }
];

export default function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
  const [devices, setDevices] = useState(mockDevices);

  // Determine if current theme is dark
  const localTheme = typeof Storage !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkMode = localTheme === 'dark';

  const handleDeviceLogout = (deviceId: number) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  const handleLogoutAllDevices = () => {
    onLogout();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="logout-modal-title"
      PaperProps={{
        sx: {
          maxWidth: '28rem', // max-w-md equivalent
          width: '100%',
          maxHeight: '100vh',
          backgroundColor: isDarkMode ? '#1B1B1B' : '#ffffff',
          margin: '16px',
          borderRadius: '16px',
        },
      }}
    >
      <div className="max-w-md w-full p-0">
        <div className="p-6">
          {/* Header */}
          <button 
            onClick={onClose} 
            className="text-base flex items-center gap-x-2 font-bold mb-6 dark:text-white"
          >
            <ArrowLeft className="text-[#000] dark:text-white" size={20} />
            <span className="text-base font-bold">Log Out</span>
          </button>

          {/* Current Device Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Current Device
            </h3>
            {devices
              .filter(device => device.isCurrent)
              .map(device => (
                <div
                  key={device.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3"
                >
                  <span className="text-base font-medium dark:text-white">
                    {device.name}
                  </span>
                </div>
              ))
            }
          </div>

          {/* Other Devices Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Other Device
            </h3>
            {devices
              .filter(device => !device.isCurrent)
              .map(device => (
                <div
                  key={device.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3 flex justify-between items-center"
                >
                  <span className="text-base font-medium dark:text-white">
                    {device.name}
                  </span>
                  <button
                    onClick={() => handleDeviceLogout(device.id)}
                    className="text-red-500 hover:text-red-600 font-medium text-sm"
                  >
                    Logout
                  </button>
                </div>
              ))
            }
          </div>

          {/* Logout All Button */}
          <button
            onClick={handleLogoutAllDevices}
            className="w-full bg-[#FF3B30] hover:bg-red-600 text-white font-semibold rounded-xl py-3 text-base transition duration-200"
          >
            Logout Current Devices
          </button>
        </div>
      </div>
    </Dialog>
  );
}