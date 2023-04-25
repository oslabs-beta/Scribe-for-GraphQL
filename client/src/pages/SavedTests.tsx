import { Editor } from '@monaco-editor/react';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import TestNavBar from '../components/TestNavBar';
import { getTests, reset, Test } from '../features/testSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';

type Props = {};

const SavedTests = (props: Props) => {
  const { tests } = useSelector((state: RootState) => state.tests);
  const dispatch = useDispatch<AppDispatch>();
  const [testType, setTestType] = useState('all-tests');
  const [content, setContent] = useState('');
  const [editorWidth, setEditorWidth] = useState('100%');
  console.log('tests: ', tests);

  const editorRef = useRef(null);

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

  useEffect(() => {
    dispatch(getTests());

    return () => {
      dispatch(reset());
    };
  }, []);

  // useEffect(() => {
  //   let newContent = '';
  //   if (testType === 'all-tests') {
  //     tests.forEach((test: Test) => {
  //       newContent += `${test.generated_test}`;
  //     });
  //   } else {
  //     tests
  //       .filter((test) => test.test_type === testType)
  //       .forEach((test) => {
  //         console.log('FILTERED', test);
  //         newContent += `${test.generated_test}`;
  //       });
  //   }
  //   setContent(newContent);
  // }, [tests, testType]);

  const list = tests.map((test) => (
    <li>
      <button
        className='test-button'
        onClick={() => setContent(test.generated_test)}
      >
        {test.test_type}
      </button>
      <button>X</button>
    </li>
  ));

  const handleCopy = () => {
    navigator.clipboard.writeText(content);

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

  const handleEditorDidMount = (editor: any, monaco: any) => {
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

  return (
    <>
      <TestNavBar />
      <div id='saved-test-container'>
        {/* <div style={{ marginTop: '5rem' }}>
        <select onChange={(e) => setTestType(e.target.value)}>
          <option value='all-tests'>All Tests</option>
          <option value='type-tests'>Type tests</option>
          <option value='unit-tests'>Unit tests</option>
          <option value='integration-tests'>Integration tests</option>
        </select> */}
        <ul id='test-list'>{list}</ul>
        <div className='editor-container' style={{ width: '80%' }}>
          <div className='dropdown-menu'>
            {' '}
            <Typography
              sx={{
                color: 'white',
                mt: '2px',
                mb: '10px',
                ml: '5px',
                fontSize: 'large',
              }}
            >
              Test Display
            </Typography>
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
            language='javascript'
            onMount={handleEditorDidMount}
            //@ts-ignore
            onChange={() => setContent(editorRef.current.getValue())}
            value={content}
            //@ts-ignore
            options={{
              wordWrap: 'on',
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SavedTests;
