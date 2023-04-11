import { Button } from '@mui/material';
import React from 'react';
import IndexHeader from '../components/IndexHeader';
import NavBar from '../components/NavBar';
import Editor from '@monaco-editor/react';

// const code = 'const a = 0;';

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div>
      {/* <IndexHeader /> */}
      <NavBar />
    </div>
  );
};

export default Homepage;
