import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generateTypeTest, generateUnitTest } from '../services/testService';
import Swal from 'sweetalert2';
import { Editor } from '@monaco-editor/react';
import TestNavBar from '../components/TestNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { Typography } from '@mui/material';
import { saveTests } from '../features/testSlice';

type Props = {};

const Test = (props: Props) => {
  const [outputTest, setOutputTest] = useState<string>('');
  const [editorWidth, setEditorWidth] = useState('100%');
  const [selectedOption, setSelectedOption] = useState('type-tests');

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const editorRef = useRef(null);
  const outputRef = useRef(null);

  ///////////
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setEditorWidth('45%');
      } else if (window.innerWidth > 600) {
        setEditorWidth('70%');
      } else {
        setEditorWidth('100%');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateTest = async (input: string) => {
    try {
      console.log('clicked generateTest');
      console.log('INPUT: ', input);

      let test;

      switch (selectedOption) {
        case 'type-tests':
          test = await generateTypeTest(input);
          break;
        case 'unit-tests':
          test = await generateUnitTest(input); //make unit test function
          break;
        case 'integration-tests':
          test = 'hahahahah'; //make integration test func
          break;

        default:
          test = await generateTypeTest(input);
      }
      // const test = await generateTypeTest(input);
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

  const handleCopy = () => {
    navigator.clipboard.writeText(outputTest);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Tests copied to clipboard',
    });
  };

  const saveTest = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    //@ts-ignore
    if (!outputRef.current.getValue()) {
      Toast.fire({
        icon: 'error',
        title: 'Unable to save empty test',
      });
    } else if (!user) {
      Toast.fire({
        icon: 'error',
        title: 'Please sign in to save tests',
      });
    } else {
      console.log('selected option: ', selectedOption);
      dispatch(
        saveTests({
          test: outputTest,
          testType: selectedOption,
        })
      );
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Tests Saved',
      });
    }
  };

  const handleEditorDidMountLeft = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monaco.editor.defineTheme('my-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#49405e',
        'editor.lineHighlightBorder': '#44475A',
        'editorCursor.foreground': '#ffffff',
      },
    });
    monaco.editor.setTheme('my-theme');
  };

  const handleEditorDidMountRight = (editor: any) => {
    outputRef.current = editor;
  };

  return (
    <>
      <TestNavBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: '4rem',
          marginTop: '5rem',
          padding: '2.5rem',
          /*flexDirection*/
          flexDirection:
            window.innerWidth > 900 || window.innerWidth > 600
              ? 'row'
              : 'column',
          overflow: 'scroll',
        }}
      >
        <div className='editor-container' style={{ width: editorWidth }}>
          <Typography
            sx={{ color: 'white', mb: '12px', ml: '5px', fontSize: 'large' }}
          >
            Input
          </Typography>
          <Editor
            height='620px'
            width='100%'
            onMount={handleEditorDidMountLeft}
            language='javascript'
            options={{
              wordWrap: 'on',
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
        <div className='editor-container' style={{ width: editorWidth }}>
          <div className='dropdown-menu'>
            <select
              className='left-dropdown'
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option className='dropdown-option' value='type-tests'>
                Type-Tests
              </option>
              <option className='dropdown-option' value='unit-tests'>
                Resolver Unit Tests
              </option>
              <option className='dropdown-option' value='integration-tests'>
                Integration Tests
              </option>
            </select>
            <button>
              <ContentCopyIcon
                id='copy-button'
                sx={{ color: 'white' }}
                onClick={handleCopy}
              />
            </button>
          </div>
          <Editor
            height='620px'
            width='100%'
            onMount={handleEditorDidMountRight}
            language='javascript'
            value={outputTest}
            //@ts-ignore
            onChange={() => setOutputTest(outputRef.current.getValue())}
            options={{
              wordWrap: 'on',
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {/* <Button
          variant='outlined'
          //@ts-ignore
          onClick={() => generateTest(editorRef.current.getValue())}
        >
          Generate
        </Button>
        <Button variant='outlined' onClick={() => getEditorValue()}>
          Save
        </Button> */}

        <button
          className='test-button'
          //@ts-ignore
          onClick={() => generateTest(editorRef.current.getValue())}
        >
          Generate
        </button>
        <button className='test-button' onClick={saveTest}>
          Save
        </button>
      </Box>
    </>
  );
};

export default Test;
