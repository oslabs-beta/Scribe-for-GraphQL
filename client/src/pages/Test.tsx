import React, {useState} from 'react';
import TestHeader from '../components/TestHeader';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

type Props = {};

const Test = (props: Props) => {
  const [code, setCode] = useState('');

  function handleCodeChange(editor: any) {
    setCode(editor.getValue());
  }

  function handleEditorDidMount(editor: any) {
    editor.setSize('100%', '100%');
    editor.on('change', handleCodeChange);
  }

  return (
    <>
      <TestHeader />
    <CodeMirror
    value={code}
    options={{
      mode:'javascript',
      lineNumbers: true,
      theme: 'monokai'
    }}
    editorDidMount={handleEditorDidMount}
    />
    </>
  );
};

export default Test;
