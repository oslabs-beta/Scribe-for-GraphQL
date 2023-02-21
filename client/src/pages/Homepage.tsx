import { Button } from '@mui/material';
import React from 'react';

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div>
      Homepage
      <Button variant='contained' style={{ textTransform: 'lowercase' }}>
        button{' '}
      </Button>
    </div>
  );
};

export default Homepage;
