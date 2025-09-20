import * as React from 'react';
import Popover from '@mui/material/Popover';

interface PopoverComponentProps extends React.PropsWithChildren {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function PopoverComponent({ children, open, anchorEl, onClose }: PopoverComponentProps) {
  const id = open ? 'heart-popover' : undefined;
  const currentTheme = typeof Storage !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDark = currentTheme === 'dark';

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isDark ? '#292929' : '#fff',
          boxShadow: 'none',
        },
      }}
    >
      {children}
    </Popover>
  );
}