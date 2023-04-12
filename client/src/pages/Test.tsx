import React, { useState, useRef, useEffect } from 'react';
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
  const [editorWidth, setEditorWidth] = useState('100%');
  // const [flexDirection, setFlexDirection] = useState('column');
  const editorRef = useRef(null);

  ///////////
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setEditorWidth('45%');
        // setFlexDirection('row');
      } else if (window.innerWidth > 600) {
        setEditorWidth('70%');
        // setFlexDirection('row');
      } else {
        setEditorWidth('100%');
        // setFlexDirection('column');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  ////////////
  const generateTest = async (input: any) => {
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

  const handleLeftDropDown = () => {};
  const handleRightDropDown = () => {};

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };
  const getEditorValue = () => {
    //@ts-ignore
    generateTest(editorRef.current.getValue());
  };

  return (
    <>
      <TestHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          /*flexDirection*/
          flexDirection:
            window.innerWidth > 900 || window.innerWidth > 600
              ? 'row'
              : 'column',
        }}
      >
        {/* <div className='dropdown-menu'>
          <select className='left-dropdown' onChange={handleLeftDropDown}>
            <option className='dropdown-option' value='schema'>
              Schema
            </option>
            <option className='dropdown-option' value='resolvers'>
              Resolvers
            </option>
          </select>
        </div> */}
        <div className='editor-container' style={{ width: editorWidth }}>
          <Editor
            height='500px'
            width='100%'
            flex-basis='100%'
            onMount={handleEditorDidMount}
            theme='vs-dark'
            language='javascript'
            options={{
              wordWrap: 'on',
            }}
          />
        </div>
        {/* <div className='dropdown-menu'>
          <select className='left-dropdown' onChange={handleRightDropDown}>
            <option className='dropdown-option' value='type-tests'>
              Type-Tests
            </option>
            <option className='dropdown-option' value='unit-tests'>
              Resolver Unit tests
            </option>
            <option className='dropdown-option' value='integration-tests'>
              Integration Tests
            </option>
          </select>
        </div> */}
        <div className='editor-container' style={{ width: editorWidth }}>
          <Editor
            height='500px'
            width='100%'
            flex-basis='100%'
            theme='vs-dark'
            language='javascript'
            options={{
              wordWrap: 'on',
            }}
          />
        </div>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '1rem' }}>
        <Button variant='outlined' onClick={() => generateTest(userInput)}>
          Generate
        </Button>
        <Button variant='outlined' onClick={() => getEditorValue()}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default Test;
