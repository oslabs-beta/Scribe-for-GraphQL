import { Editor } from '@monaco-editor/react';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import TestNavBar from '../components/TestNavBar';
import { getTests, reset, Test } from '../features/testSlice';

type Props = {};

const SavedTests = (props: Props) => {
  const { tests } = useSelector((state: RootState) => state.tests);
  const dispatch = useDispatch<AppDispatch>();
  const [testType, setTestType] = useState('all-tests');
  const [content, setContent] = useState('');
  console.log('tests: ', tests);

  useEffect(() => {
    dispatch(getTests());

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    let newContent = '';
    if (testType === 'all-tests') {
      tests.forEach((test: Test) => {
        newContent += `${test.generated_test}`;
      });
    } else {
      tests
        .filter((test) => test.test_type === testType)
        .forEach((test) => {
          console.log('FILTERED', test);
          newContent += `${test.generated_test}`;
        });
    }
    setContent(newContent);
  }, [tests, testType]);

  return (
    <>
      <TestNavBar />
      <div style={{ marginTop: '5rem' }}>
        <select onChange={(e) => setTestType(e.target.value)}>
          <option value='all-tests'>All Tests</option>
          <option value='type-tests'>Type tests</option>
          <option value='unit-tests'>Unit tests</option>
          <option value='integration-tests'>Integration tests</option>
        </select>
        <Editor
          height='500px'
          width='50%'
          language='javascript'
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
    </>
  );
};

export default SavedTests;
