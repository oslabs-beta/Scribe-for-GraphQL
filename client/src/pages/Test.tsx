import React, { useState} from 'react';
import TestHeader from '../components/TestHeader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generateTypeTest } from '../services/testService';
import Swal from 'sweetalert2';


type Props = {};

const Test = (props: Props) => {

  const [userInput, setUserInput] = useState<string>('');
  const [outputTest, setOutputTest] = useState<string>('');

  const generateTest = async (input: string) => {
    try{
      console.log('clicked generateTest')
      const test = await generateTypeTest(input);
      console.log('test ', test)
      if(test.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${test.message}`,
          confirmButtonText: 'Try Again',
          confirmButtonColor: ''
        })
        return;
      }
      setOutputTest(test);
    } catch(err:any){
      const message = err.response?.data.message || err.toString();
      window.alert(message);
    }

  }

  const saveTest = () => {
    
  }

  return (
    <>
      <TestHeader />
      <Box sx={{display:'flex', justifyContent: 'space-evenly'}}>
        <TextField
          id = 'userInput'
          value = {userInput}
          onChange = {(e)=> setUserInput(e.target.value)}
          label='user input'
          variant='filled'
          multiline
          minRows={20}
          maxRows={20}
          sx={{
            width: 0.49,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        />
        <TextField
          id = 'testOutput'
          value = {outputTest}
          onChange = {(e) => setOutputTest(e.target.value)}
          label='test'
          variant='filled'
          multiline
          minRows={20}
          maxRows={20}
          sx={{
            width: 0.49,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        />    
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt:'1rem'}}>
        <Button variant='outlined' onClick={()=>generateTest(userInput)}>Generate</Button>
        <Button variant='outlined' >Save</Button>
        </Box>
    </>
  );
};

export default Test;