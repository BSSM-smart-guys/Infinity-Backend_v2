const express = require("express");
const router = express.Router();
const {execute} = require("../service/GenerateService");

router.post("/", async (req, res) => {
    const { genre, keywords, character, event, background } = req.body;
    const result = await execute(genre, keywords, character, event, background);
    res.status(200).json({result: result});
});

module.exports = router;