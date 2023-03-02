import React, { useState} from 'react';
import TestHeader from '../components/TestHeader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generateTypeTest } from '../services/testService';


type Props = {};

const Test = (props: Props) => {

  const [userInput, setUserInput] = useState<string>('');
  const [outputTest, setOutputTest] = useState<string>('');

  const generateTest = async (input: string) => {
    try{
      console.log('clicked generateTest')
      const test = await generateTypeTest(input);
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
          onChange = {(e)=> setUserInput(e.target.value)}
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
          value = {outputTest}
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
        <Button variant='outlined' onClick={()=>generateTest(userInput)}>Generate</Button>
        <Button variant='outlined' >Save</Button>
        </Box>
    </>
  );
};

export default Test;
