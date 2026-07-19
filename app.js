import path from "node:path";
import "dotenv/config";
import express from "express";
import session from "express-session";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { router } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const client = new PrismaClient({ adapter });

app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    saveUninitialized: true,
    store: new PrismaSessionStore(client, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
