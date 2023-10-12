const express = require("express");
const router = express.Router();
const { callLaas } = require("../service/laas");
const { generateImage } = require("../service/karlo");

router.post("/novel", async (req, res) => {
    const { genre, keywords, character, event, background } = req.body;
    const result = await callLaas(genre, keywords, character, event, background);
    res.status(200).json({result: result});
});

router.post("/image", async (req, res) => {
    const { genre, keywords, character, event, background } = req.body;
    const result = await generateImage({genre, keywords, character, event, background});
    res.status(200).json({result: result});
});

module.exports = router;