import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generateTypeTest, saveTests } from '../services/testService';
import Swal from 'sweetalert2';
import { Editor } from '@monaco-editor/react';
import TestNavBar from '../components/TestNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';

type Props = {};

const Test = (props: Props) => {
  const [outputTest, setOutputTest] = useState<string>('');
  const [editorWidth, setEditorWidth] = useState('100%');
  const [rightSelectedOption, setRightSelectedOption] = useState('');
  const [leftSelectedOption, setLeftSelectedOption] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const editorRef = useRef(null);

  function convertToJSON(inputString: any) {
    const outputObj: any = {};
    const lines = inputString.split('\n');
    let currentObj: any = null;

    lines.forEach((line: any) => {
      if (line.includes('{')) {
        // Start of a new object
        const name = line.split(':')[0].trim();
        currentObj = {};
        outputObj[name] = currentObj;
      } else if (line.includes('}')) {
        // End of the current object
        currentObj = null;
      } else if (currentObj) {
        // Inside an object
        const [name, value] = line.split(':');
        currentObj[name.trim()] = value.trim();
      }
    });

    return JSON.stringify(outputObj, null, 2);
  }

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
  ////////////
  const generateTest = async (input: any) => {
    try {
      console.log('clicked generateTest');
      console.log('INPUT: ', input);
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
  const handleLeftDropDown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLeftSelectedOption(event.target.value);
  };
  const handleRightDropDown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRightSelectedOption(event.target.value);
  };

  // const saveTest = () => {
  //   dispatch(
  //     saveTests({
  //       test: outputTest, // value of second editor
  //       testType: RightselectedOption, //whatever option the user has selected in the drop down
  //     })
  //   );
  // };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };
  const getEditorValue = () => {
    //@ts-ignore
    console.log('monoco value: ', convertToJSON(editorRef.current.getValue()));
    // eval(`(${editorRef.current.getValue()})`)
    //@ts-ignore
    generateTest(convertToJSON(editorRef.current.getValue()));
  };

  const handleSave = () => {};

  return (
    <>
      <TestNavBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          marginTop: '8rem',
          /*flexDirection*/
          flexDirection:
            window.innerWidth > 900 || window.innerWidth > 600
              ? 'row'
              : 'column',
          overflow: 'scroll',
        }}
      >
        <div className='editor-container' style={{ width: editorWidth }}>
          <div className='dropdown-menu'>
            <select
              className='left-dropdown'
              value={leftSelectedOption}
              onChange={handleLeftDropDown}
            >
              <option className='dropdown-option' value='schema'>
                Schema
              </option>
              <option className='dropdown-option' value='resolvers'>
                Resolvers
              </option>
            </select>
          </div>
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
        <div className='editor-container' style={{ width: editorWidth }}>
          <div className='dropdown-menu'>
            <select
              className='left-dropdown'
              value={rightSelectedOption}
              onChange={handleRightDropDown}
            >
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
          </div>
          <Editor
            height='500px'
            width='100%'
            flex-basis='100%'
            theme='vs-dark'
            language='javascript'
            value={outputTest}
            options={{
              wordWrap: 'on',
            }}
          />
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mt: '1rem',
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
        <button className='test-button'>Save</button>
      </Box>
    </>
  );
};

export default Test;
