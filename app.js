import path from "node:path";
import passport from "passport";
import "dotenv/config";
import "./config/passport.js";
import express from "express";
import session from "express-session";
import { prisma } from "./db/client.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { router } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      maxAge: 2 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  console.log(res.locals.currentUser);
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
