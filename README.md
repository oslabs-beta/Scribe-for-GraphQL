![scribe](https://github.com/oslabs-beta/Scribe-for-GraphQL/assets/94427592/15a9da40-0b33-4bf9-af10-0cff83401f8b)

### **[Scribe for Graph QL](scribegraphql.com)** ### 

**Boost test-driven development speed and confidence with automated Jest type-test generation, schema validation, and smart resolver mock integration setups.**

### **Table of Contents**

[Description](https://github.com/oslabs-beta/Scribe-for-GraphQL#Description)

[Built With](https://github.com/oslabs-beta/Scribe-for-GraphQL#Built-With)

[Getting Started](https://github.com/oslabs-beta/Scribe-for-GraphQL#Getting-Started)

[Requirements](https://github.com/oslabs-beta/Scribe-for-GraphQL#Requirements)

[How to Contribute](https://github.com/oslabs-beta/Scribe-for-GraphQL#How-to-Contribute)

[License](https://github.com/oslabs-beta/Scribe-for-GraphQL#License)

[Contributors](https://github.com/oslabs-beta/Scribe-for-GraphQL#Contributors)

### **Description**:

Scribe was developed with the understanding that creating Jest tests can be a tedious, time-consuming process, which may deter developers. Creating Jest-tests for GraphQL schemas and resolvers can involve significant duplication and repetition in code, especially as code-bases grow in size. Scribe thus offers general purpose, standardized Jest tests and Jest test setups for GraphQL to give developers ease of mind.

Scribe’s web application offers complete type-check tests for user-inputted schemas to prevent unwanted, unnecessary changes during the development process—think of these tests as guardrails while you develop the rest of your GraphQL functionality—alongside schema parsing and validation to catch invalid types or type connections. Simply put, Scribe won’t accept invalid schemas and will let you know if that’s what you have!

Scribe’s web application also generates complete test setup for mock integration tests for queries and mutations as well as resolver unit tests. When it comes to mock integration tests, we use Apollo GraphQL’s test server with built-in mocking functionality, which will mock random data according to type definitions in your schema. We give you everything you need to start your test-driven development once you’ve gotten through the preliminary creation of your schema and resolvers.

### **Built With:**

TypeScript

React

Express

Jest

Apollo GraphQL

Redis

Vite

Prisma

### **Getting Started:**

To begin with, you’ll need to install a few npm packages (or from another package manager):

**Apollo Packages:**

    npm install --save-dev @apollo/server apollo-server-testing

**Choose from relevant Jest Packages**:

JS Jest Packages:

    npm install --save-dev jest @jest/globals

TS Jest Packages via Babel:

    npm install --save-dev jest @jest/globals @babel/preset-typescript

TS Jest Packages via TS-Jest:

    npm install --save-dev jest @jest/globals ts-jest \

Afterwards, add a test script to your ‘package.json’ file:

    E.g. “test”: “jest --watchAll”

### **Requirements:**

You’ll need this Apollo testServer file for query and mutation mock integration tests, which will mock random data for your tests according to type definitions in your schema:

```
import { ApolloServer } from "apollo-server"
import { createTestClient } from 'apollo-server-testing'
import { typeDefs } from '/* path to schema */'
import { resolvers } from '/* path to resolvers */'

export const createTestServer = (cntext) => {
 const server = new ApolloServer({
   typeDefs,
   resolvers,
   mockEntireSchema: false, // -> since we are passing in a schema and resolvers, we need this to be false
   mocks: true, // -> mocks random data according to type definitions in schema
   context: () => cntext,
 });

 return createTestClient(server);
};
```

A few additional requirements for Scribe, per Apollo GraphQL standards:

1. For type-tests on the basis of schemas, we are expecting a ‘typeDefs’ declaration, which consists in a valid Schema Definition Language (SDL) string.

   An example would be:

```
const typeDefs = `
 type Book {
   title: String
   author: String
 }
  type Query {
   books: [Book]
 }
`;
```

2. For resolvers, we are expecting a ‘resolvers’ declaration, which consists in a map of functions that populate data for individual schema fields.

   An example would be:

```
const resolvers = {
 Query: {
   books: () => books,
 },
};
```

Further documentation for schema declarations as typeDefs can be found [here](https://www.apollographql.com/docs/apollo-server/getting-started/#step-3-define-your-graphql-schema) and further documentation on resolver declarations can be found [here](https://www.apollographql.com/docs/apollo-server/data/resolvers).

### **How to Contribute:**

The broader open source community relies on continuous contributions to empower people to learn from and create with one another. Any further contributions to this project would be greatly appreciated. Here’s how:

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Added an AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### **License:**

Distributed under the MIT License. See LICENSE for more information.

### **Contributors:**

  Jake Gray: [GitHub](https://github.com/soxg), [LinkedIn](https://www.linkedin.com/in/jake-d-gray/)

  Jason Johnson: [GitHub](https://github.com/jaysenjonsin), [LinkedIn](https://www.linkedin.com/in/jasoncjohnson5/)

  Mason Shelton: [GitHub](https://github.com/MasonS1012), [LinkedIn](https://www.linkedin.com/in/mason-shelton-9ab25521a/)

  Pierce Yu: [GitHub](https://github.com/PierceYu), [LinkedIn](https://www.linkedin.com/in/pierce-yu/)
