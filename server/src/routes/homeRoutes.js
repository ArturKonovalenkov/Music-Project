const express = require("express");
const router = express.Router();
const { Music } = require("../../db/models");

router.get("/main", async (req, res) => {
  try {
    const musics = await Music.findAll({ raw: true });
    res.json(musics);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
