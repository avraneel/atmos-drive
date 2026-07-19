import path from "node:path";
import express from "express";
import session from "express-session";

import { router } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
