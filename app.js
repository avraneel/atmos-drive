import path from "node:path";
import "dotenv/config";
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import session from "express-session";

import { router } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
