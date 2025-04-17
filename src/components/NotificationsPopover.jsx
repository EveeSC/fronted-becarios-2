import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import { BellIcon } from '@heroicons/react/24/outline';

const NotificationItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const notifications = [
  {
    title: "Tasks 3 notifications needs",
    content: [
      "Type something is known.",
      "Note 2 else",
      "It's to encourage a student or mentor as one man..."
    ]
  },
  {
    title: "Centre requests",
    content: [
      "The centre are requesting an explicit location details...",
      "Note 2 else",
      "Current queries",
      "Note 3 else",
      "The centre can be mentioned in current details..."
    ]
  }
];

export default function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: '#fde208',
          '&:hover': {
            backgroundColor: '#fde208',
            opacity: 0.9
          }
        }}
      >
        <BellIcon className="h-6 w-6 text-gray-900" />
      </IconButton>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1.5,
          '& .MuiPaper-root': {
            width: 400,
            maxHeight: 500,
            overflow: 'auto',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Notifications
          </Typography>
          
          {notifications.map((notification, index) => (
            <React.Fragment key={index}>
              <NotificationItem>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                  {notification.title}
                </Typography>
                {notification.content.map((item, i) => (
                  <Typography key={i} variant="body2" component="div" sx={{ mt: 0.5 }}>
                    {item}
                  </Typography>
                ))}
              </NotificationItem>
              {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </Box>
      </Popover>
    </div>
  );
}