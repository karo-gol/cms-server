import "@babel/polyfill";
import "dotenv/config"
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import accessEnv from "#root/helpers/accessEnv";
import sequelize from "./db/connection";

const PORT = accessEnv("PORT", 4000);

const app = express();

app.use(bodyParser.json());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

app.get("/", (req, res) => res.send("it works!"));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}.`);
});