import '@babel/polyfill';
import 'dotenv/config'
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';

import accessEnv from './helpers/accessEnv';
import setupRoutes from './routes/routes';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import formatGraphqlErrors from './helpers/formatGraphqlErrors';

const PORT = accessEnv('PORT', 4000);

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

setupRoutes(app);

app.get('/', (req, res) => res.send('hello from NODE server!'));

const apolloServer = new ApolloServer({
    context: a => a, 
    formatError:  formatGraphqlErrors,      
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware( { app, cors: false, path: '/graphql' } ); 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}.`);
});