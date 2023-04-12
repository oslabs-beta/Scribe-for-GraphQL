import React, { useState } from 'react';
import TestHeader from '../components/TestHeader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generateTypeTest } from '../services/testService';
import Swal from 'sweetalert2';
import { Editor } from '@monaco-editor/react';

type Props = {};

const Test = (props: Props) => {
  const [userInput, setUserInput] = useState<string>('');
  const [outputTest, setOutputTest] = useState<string>('');

  const generateTest = async (input: string) => {
    try {
      console.log('clicked generateTest');
      const test = await generateTypeTest(input);

      console.log('test ', test);
      if (test.message) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: test.message,
        });

        return;
      }
      setOutputTest(test);
    } catch (err: any) {
      const message = err.response?.data.message || err.toString();
      window.alert(message);
    }
  };

  const saveTest = () => {};

  return (
    <>
      <TestHeader />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Editor height='500px' width='500px' theme='vs-dark' />
        <Editor height='500px' width='500px' theme='vs-dark' />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '1rem' }}>
        <Button variant='outlined' onClick={() => generateTest(userInput)}>
          Generate
        </Button>
        <Button variant='outlined'>Save</Button>
      </Box>
    </>
  );
};

export default Test;
