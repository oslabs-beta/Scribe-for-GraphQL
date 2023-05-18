import { Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Editor from '@monaco-editor/react';
import generateTestGIF from '../images/generateTest.gif';
import { Link } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

// const code = 'const a = 0;';

type Props = {};

const Homepage = (props: Props) => {
  const apollo = 'npm install --save-dev @apollo/server apollo-server-testing';
  const jestPackage = 'npm install --save-dev jest @jest/globals';
  const jestViaBabel =
    'npm install --save-dev jest @jest/globals @babel/preset-typescript';
  const jestViaTS = 'npm install --save-dev jest @jest/globals ts-jest';

  const [boilerPlate, setBoilerPlate] =
    useState<string>(`import { ApolloServer } from "apollo-server"
import { createTestClient } from 'apollo-server-testing'
import { typeDefs } from '/* path to schema */'
import { resolvers } from '/* path to resolvers */'
    
    
export const createTestServer = (context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false, // -> since we are passing in a schema and resolvers, we need this to be false
    mocks: true, // -> mocks random data according to type definitions in schema
    context: () => context,
  });
    
    
  return createTestClient(server);
};`);
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='landing-one'>
          <div id='landing-text-container'>
            <h1>Test writing made simple.</h1>
            <p>
              Boost development speed and confidence with automated Jest
              type-test generation, schema validation, and smart resolver mock
              intergration setups.
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
        <div className='landing-two'>
          <div className='packages'>
            <h2>Apollo Packages:</h2>
            <button className='npm' onClick={() => handleCopy(apollo)}>
              <p>{apollo}</p>
              <ContentCopyIcon
                sx={{ fontSize: 'larger', ml: '10px', mt: '3px' }}
              />
            </button>
            <h2 style={{ color: '#b696ad', marginTop: '1rem' }}>
              *Choose from relevant Jest Packages
            </h2>
            <h2>JS Jest Packages:</h2>
            <button className='npm' onClick={() => handleCopy(jestPackage)}>
              <p>{jestPackage}</p>
              <ContentCopyIcon
                sx={{ fontSize: 'larger', ml: '10px', mt: '3px' }}
              />
            </button>
            <h2>TS Jest Packages via Babel:</h2>
            <button className='npm' onClick={() => handleCopy(jestViaBabel)}>
              <p>{jestViaBabel}</p>
              <ContentCopyIcon
                sx={{ fontSize: 'larger', ml: '10px', mt: '3px' }}
              />
            </button>
            <h2>TS Jest Packages via TS-Jest:</h2>
            <button className='npm' onClick={() => handleCopy(jestViaTS)}>
              <p>{jestViaTS}</p>
              <ContentCopyIcon
                sx={{ fontSize: 'larger', ml: '10px', mt: '3px' }}
              />
            </button>
          </div>
          <div id='package-text-container'>
            <h1>Install</h1>
            <h1>Required</h1>
            <h1>Packages</h1>
          </div>
        </div>
        <div className='landing-one'>
          <div id='instruction-text-container'>
            <h1>Test Server Setup</h1>
            <h2>
              1. Add a test script to your ‘package.json’ file: E.g. “test”:
              “jest --watchAll”
            </h2>
            <h2>2. Copy test server boilerplate</h2>

            <h1>Requirements</h1>
            <ul>
              <li>
                * For type-tests on the basis of schemas, we are expecting a
                ‘typeDefs’ declaration, which consists in a valid Schema
                Definition Language (SDL) string.
              </li>
              <li>
                * For resolvers, we are expecting a ‘resolvers’ declaration,
                which consists in a map of functions that populate data for
                individual schema fields.
              </li>
            </ul>
            <Link
              onClick={() => window.scrollTo({ top: 0 })}
              id='home-to-test'
              to='/test'
            >
              Now we're ready to generate some tests!
            </Link>
          </div>
          <div id='instruction-display'>
            <div className='editor-container' style={{ width: '750px' }}>
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
                height='440px'
                width='720px'
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
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
