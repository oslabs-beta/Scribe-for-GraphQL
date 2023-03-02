import { Button } from '@mui/material';
import React from 'react';
import IndexHeader from '../components/IndexHeader';
import LoginModal from '../components/LoginModal';

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div>
      <IndexHeader />
      Homepage
      <Button variant='contained' style={{ textTransform: 'lowercase' }}>
        button{' '}
      </Button>
    </div>
  );
};

export default Homepage;
