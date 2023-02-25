
import express from 'express'
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const server = new ApolloServer({ typeDefs });
//@ts-ignore
app.use('/graphql', server)
//@ts-ignore
app.listen(4000, () => {
    console.log('testServer running on port 4000')
})