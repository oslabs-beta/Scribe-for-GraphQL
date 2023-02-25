import React, { useState } from 'react';
import TestHeader from '../components/TestHeader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type Props = {};

const Test = (props: Props) => {

  function generateTest () {

  }

  function saveTest () {
    
  }

  return (
    <>
      <TestHeader />
      <Box sx={{display:'flex', justifyContent: 'space-evenly'}}>
        <TextField
          label='user input'
          variant='filled'
          multiline
          minRows={30}
          maxRows={30}
          sx={{
            width: 0.49,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        />
        <TextField
          label='test'
          variant='filled'
          multiline
          minRows={30}
          maxRows={30}
          sx={{
            width: 0.49,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        />    
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt:'1rem'}}>
        <Button variant='outlined' >Generate</Button>
        <Button variant='outlined' >Save</Button>
        </Box>
    </>
  );
};

export default Test;
