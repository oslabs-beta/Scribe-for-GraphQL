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
import { useNavigate } from 'react-router';

type Props = {};

// type Resolvers = {
//   queryIntTests?: string;
//   mutationIntTests?: string;
//   resolverUnitTests?: string;
// }

const Test = (props: Props) => {
  const [outputTest, setOutputTest] = useState<string>('');
  const [editorWidth, setEditorWidth] = useState('100%');
  const [selectedOption, setSelectedOption] = useState('type-tests');
  // const [resolversTests, setResolversTests] = useState<Resolvers | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
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
      // console.log('INPUT: ', input);
      //@ts-ignore
      console.log('unit', await generateUnitTest(input));

      let test;
      let response;
      switch (selectedOption) {
        case 'type-tests':
          test = await generateTypeTest(input);
          break;
        case 'unit-tests':
          // if (resolversTests === null) {
          //   let resolvers = await generateUnitTest(input);
          //   setResolversTests(resolvers)
          // }
          // console.log(resolversTests);
          response = await generateUnitTest(input);
          test = response.resolverUnitTests; //make unit test function
          break;
        case 'query-mock-integration-tests':
          // if (resolversTests === null) {
          //   let resolvers = await generateUnitTest(input);
          //   setResolversTests(resolvers)
          // }
          // console.log(resolversTests)
          response = await generateUnitTest(input);
          test = response.queryIntTests; //make integration test func
          break;
        case 'mutation-mock-integration-tests':
          // if (resolversTests === null) {
          //   let resolvers = await generateUnitTest(input);
          //   setResolversTests(resolvers)
          // }
          response = await generateUnitTest(input);
          test = response.mutationIntTests;
          break;
        default:
          console.log('default case hit');
          test = await generateTypeTest(input);
      }
      // const test = await generateTypeTest(input);
      console.log('test test test ', test);
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
      Swal.fire({
        title: 'Hold Up',
        text: 'please sign in to save and manage your tests!',
        icon: 'warning',
        confirmButtonColor: '#6c6185',
        confirmButtonText: 'sign in',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signin');
        }
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
              <option
                className='dropdown-option'
                value='query-mock-integration-tests'
              >
                Query Mock Integration Tests
              </option>
              <option
                className='dropdown-option'
                value='mutation-mock-integration-tests'
              >
                Mutation Mock Integration Tests
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
