import { Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Editor from '@monaco-editor/react';
import generateTestGIF from '../images/generateTest.gif';
import { Link } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';

// const code = 'const a = 0;';

type Props = {};

const Homepage = (props: Props) => {
  const npmPackage = 'npm install @apollo/server graphql';
  const [boilerPlate, setBoilerPlate] =
    useState<string>(`const { ApolloServer } = require("apollo-server");
const { createTestClient } = require("apollo-server-test");
const typeDefs = require(/* path to schema */);
const resolvers = require(/* path to resolvers */);
  
  
const createTestServer = (context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false, // -> since we are passing in a schema and resolvers, we need this to be false
    mocks: true, // -> mocks random data according to type definitions in schema
    context: () => context,
   });
  
  return createTestClient(server);
};

module.exports = createTestServer;`);
  const editorRef = useRef(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);

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
      title: 'copied to clipboard',
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
      <NavBar />
      <div id='landing-one'>
        <div id='landing-text-container'>
          <h1>Test writing made simple.</h1>
          <p>
            Boost development speed and confidence with automated Jest type-test
            generation, schema validation, and smart ressolver mock intergration
            setups.
          </p>
        </div>
        <div>
          <img id='gif' src={generateTestGIF} />
        </div>
      </div>
      <div id='direct-sign'>
        <p>Get Started</p>
        <div className='arrow bounce'>
          <ArrowDownwardIcon sx={{ fontSize: '3rem', mt: '1.5rem' }} />
        </div>
      </div>
      <div id='landing-two'>
        <div id='instruction-display'>
          <button id='npm' onClick={() => handleCopy(npmPackage)}>
            <p>{npmPackage}</p>
            <ContentCopyIcon sx={{ ml: '10px', mt: '1px' }} />
          </button>
          <div className='editor-container' style={{ width: '900px' }}>
            <div className='dropdown-menu'>
              {' '}
              <Typography
                sx={{
                  color: 'white',
                  mb: '10px',
                  ml: '5px',
                  fontSize: 'large',
                }}
              >
                Test Server Boilerplate
              </Typography>
              <button>
                <ContentCopyIcon
                  id='copy-button'
                  sx={{ color: 'white' }}
                  onClick={() => handleCopy(boilerPlate)}
                />
              </button>
            </div>
            <Editor
              height='400px'
              width='880px'
              onMount={handleEditorDidMount}
              language='javascript'
              value={boilerPlate}
              //@ts-ignore
              onChange={() => setBoilerPlate(editorRef.current.getValue())}
              options={{
                wordWrap: 'on',
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>
        </div>
        <div id='instruction-text-container'>
          <h1>Test Server Setup</h1>
          <ul>
            <li>- Install Apollo.</li>
            <li>- Copy server boilerplate.</li>
          </ul>
          <h1>Requirements</h1>
          <ul>
            <li>
              - For type-tests on the basis of schemas, we are expecting a
              ‘typeDefs’ declaration.
            </li>
            <li>
              - For resolvers, we are expecting a ‘resolvers’ declaration.
            </li>
          </ul>
          <Link id='home-to-test' to='/test'>
            Lets generate some tests!
          </Link>
        </div>
      </div>
      <footer>0</footer>
    </>
  );
};

export default Homepage;
