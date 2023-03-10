import { Button, Modal, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from '../app/store';
import Login from '../pages/Login';

const PopupModal = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const modalBody = (
    <Box sx={{ bgcolor: 'background.paper', width: 300 }}>
      <Login/>
    </Box>
  );

  return (
    <div>
      <Button variant='text' onClick={handleOpen} sx={{color:'white'}}>
        Login
      </Button>
      <Modal
        sx={{display: 'flex',
            justifyContent: 'center',
            alignItems:'center'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
};

export default PopupModal;
