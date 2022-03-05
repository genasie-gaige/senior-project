const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const URL = 'mongodb+srv://shelfUser1:shelfUser1Password@cluster0.wxj97.mongodb.net/meds?retryWrites=true&w=majority'
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose.connect(
    URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    () => console.log("DB CONNECTED")
);

const startServer = async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app });
    app.listen(4000, () => console.log("Server UP & RUnning *4000"));
};
startServer();
