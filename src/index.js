import "@babel/polyfill";
import "dotenv/config"
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { ApolloServer } from "apollo-server-express";

import accessEnv from "./helpers/accessEnv";
import setupRoutes from "./routes/routes";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const PORT = accessEnv("PORT", 4000);

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

app.get("/", (req, res) => res.send("jwt configured!"));

const apolloServer = new ApolloServer({
    context: a => a,        
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware( { app, cors: false } ); 

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}.`);
});