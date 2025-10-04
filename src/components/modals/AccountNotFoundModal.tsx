import Dialog from '@mui/material/Dialog';

interface AccountNotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAccount: () => void;
  onTryAgain: () => void;
  email?: string;
}

export default function AccountNotFoundModal({
  isOpen,
  onClose,
  onCreateAccount,
  onTryAgain,
  email
}: AccountNotFoundModalProps) {

  // Determine if current theme is dark
  const localTheme = typeof Storage !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkMode = localTheme === 'dark';

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="account-not-found-modal"
      PaperProps={{
        sx: {
          maxWidth: '20rem', // max-w-xs equivalent (320px)
          width: '100%',
          backgroundColor: isDarkMode ? '#1B1B1B' : '#ffffff',
          margin: '16px',
          borderRadius: '20px',
          padding: '0',
        },
      }}
    >
      <div className="w-full p-6 text-center">
        {/* Title */}
        <h2 className="text-xl font-semibold text-black mb-4">
          Can&apos;t find account
        </h2>

        {/* Description */}
        <p className="text-sm text-[#555] font-medium leading-relaxed mb-4">
          We can&apos;t find account with{' '}
          <span className="font-medium">{email || ''}</span>. Either you have
          entered wrong email id or wrong password.
          If you don&apos;t have any account you can create
          a new one
        </p>

        {/* Create Account Button */}
        <button
          onClick={onCreateAccount}
          className="w-full text-theme-primary font-bold py-3 border-b border-[#E4E4E4]"
        >
          Create Account
        </button>

        {/* Try Again Button */}
        <button
          onClick={onTryAgain}
          className="w-full text-black font-bold py-3"
        >
          Try Again
        </button>
      </div>
    </Dialog>
  );
}