require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const mongoose = require('mongoose')
const routes = require('./routes')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { createServer } = require("http")

const app = express()

const httpServer = createServer(app);

const PORT = 8000 || process.env.PORT

app.use(cors())
app.use(compression())
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 24 * 60 * 60 * 1000 },
  store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017', collectionName: 'session'})
}))

app.use(passport.initialize());
app.use(passport.session());

require('./passport')

mongoose.connect('mongodb://127.0.0.1:27017', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, 
  (err)=> {
    if (err) throw err
      console.log('DB Connnected')
  }
)

  app.use(routes)


const startAppoloServer = async (typeDefs, resolvers) =>{

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  
  const server = new ApolloServer({ 
    schema, 
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),
      {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }
    ],
    context: ({req})=> {
      const user = req.user
      const isAuthenticated = req.isAuthenticated()
      if(!user) throw new Error('No user')

      return {user, isAuthenticated}
    }
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );
  await server.start();
  server.applyMiddleware({app})

  
  httpServer.listen(PORT, ()=> console.log('Server Running'))
}

startAppoloServer(typeDefs,resolvers)