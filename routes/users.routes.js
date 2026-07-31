import { Router } from "express";
import prisma from "../db/client.js";

const router = Router();

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  res.redirect("/");
});
