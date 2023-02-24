import { Button } from '@mui/material';
import React from 'react';
import IndexHeader from '../components/IndexHeader';

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
