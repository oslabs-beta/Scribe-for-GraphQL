import { Editor } from '@monaco-editor/react';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import TestNavBar from '../components/TestNavBar';
import { deleteTest, getTests, reset, Test } from '../features/testSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';

type Props = {};

const SavedTests = (props: Props) => {
  const { tests } = useSelector((state: RootState) => state.tests);
  const dispatch = useDispatch<AppDispatch>();
  const [testType, setTestType] = useState('all-tests');
  const [content, setContent] = useState('');
  const [editorWidth, setEditorWidth] = useState('100%');
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('tests: ', tests);

  const handleDelete = (id: any) => {
    dispatch(deleteTest(id));
  };

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

  const list =
    testType === 'all-tests'
      ? tests.map((test, idx) => (
          <li>
            <button
              className='saved-test-list'
              onClick={() => setContent(test.generated_test)}
            >
              {test.test_type} {idx + 1}
            </button>
            <button id='delete-btn' onClick={() => handleDelete(test.id)}>
              -
            </button>
          </li>
        ))
      : tests
          .filter((test) => test.test_type === testType)
          .map((test, idx) => (
            <li>
              <button
                className='saved-test-list'
                onClick={() => setContent(test.generated_test)}
              >
                {test.test_type} {idx + 1}
              </button>
              <button id='delete-btn' onClick={() => handleDelete(test.id)}>
                -
              </button>
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
        <div id='test-list'>
          <div className='left-dropdown' style={{ marginTop: '2rem' }}>
            <select onChange={(e) => setTestType(e.target.value)}>
              <option value='all-tests'>All Tests</option>
              <option value='type-tests'>Type tests</option>
              <option value='unit-tests'>Unit tests</option>
              <option value='integration-tests'>Integration tests</option>
            </select>
          </div>
          <ul>{list}</ul>
        </div>

        <div className='editor-container' style={{ width: '75%' }}>
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
