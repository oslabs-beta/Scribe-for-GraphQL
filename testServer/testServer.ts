
import express from 'express'
import { createSchema, createYoga } from 'graphql-yoga'
const schema = require('./schema')

const app = express();

const yoga = createYoga({
    schema,
})
//@ts-ignore
app.use('/graphql', yoga)
//@ts-ignore
app.listen(4000, () => {
    console.log('testServer running on port 4000')
})