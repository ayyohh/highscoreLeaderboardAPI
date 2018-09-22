const express = require("express");
const router = express.Router();
const Score = require("../models/score");


// Index Route
router.get("/", async (req, res, next) => {
    console.log("This is get all in scoreController: ", req.session)
    try {
        const allScores = await Score.find();
        res.json({
            status: 200,
            data: allScores
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// New Route
router.post("/", async (req, res) => {
    console.log("This is req.session in the post route of scoreController:", req.session);
    try {
        console.log("This is req.body in scoreController:", req.body);
        const createdScore = await Score.create(req.body);
        res.json({
            status: 200,
            data: createdScore
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Show Route
router.get("/:id", async (req, res, next) => {
    try {
        const foundScore = await Score.findById(req.params.id);
        res.json({
            status: 200,
            data: foundScore
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


module.exports = router;
