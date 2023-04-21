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
  console.log('tests: ', tests);

  useEffect(() => {
    dispatch(getTests());

    return () => {
      dispatch(reset());
    };
  }, []);

  //type-tests
  let content;

  let testing;

  if (testType === 'all-tests')
    content = (
      <div>
        {tests.map((test: Test) => (
          <div key={test.id}>{test.generated_test}</div>
        ))}
      </div>
    );
  else
    content = (
      <div>
        {tests
          .filter((test: Test) => test.test_type === testType)
          .map((test: Test) => (
            <div key={test.id}>{test.generated_test}</div>
          ))}
      </div>
    );

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
          // value={tests[0].generated_test}
          //@ts-ignore
          options={{
            wordWrap: 'on',
            minimap: {
              enabled: false,
            },
          }}
        />
        {/* {content} */}
      </div>
    </>
  );
};

export default SavedTests;
