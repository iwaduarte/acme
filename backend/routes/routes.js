import express from "express";
import SequelizeObject from "../database/connect.js";

const { models } = SequelizeObject;
const { SearchHistory } = models;

console.log(models);

const router = express.Router();

router.get("/", (req, res) => res.json({ title: `[Sire] Hello` }));
router.post("/search-history", async (req, res) => {
  const { search, userId } = req.body;

  return SearchHistory.create({ searchTerm: search })
    .then(() => res.json({ sucess: "\\o/" }))
    .catch(() => res.json({ ops: "error" }));
});

router.get("/search-history", async (req, res) => {
  return res.json(await SearchHistory.findAll());
});
export default router;
