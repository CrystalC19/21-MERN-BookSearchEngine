const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
const  { ApolloServer } = require ("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require ('./utils/auth');

const app = express();
const server = new ApolloServer ({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get ('/',(req,res) =>{
  res.sendFile(path.join(__dirname, '../client'))
})

// Create a new instance of an Apollo Server with GraphQL
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
}

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => 
    console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log (`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});


// calling the async function to start the server

startApolloServer();