import { Button } from '@mui/material';
import React from 'react';
import IndexHeader from '../components/IndexHeader';
import LoginModal from '../components/SignInModal';
import RegisterModal from '../components/RegisterModal';

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div>
      <IndexHeader />
      Homepage
      <h1>hello</h1>
    </div>
  );
};

export default Homepage;
