const express = require("express");
const router = express.Router();
const Score = require("../models/score");



//load splash screen
router.get('/', (req, res) => {
  res.render('../views/EscapeFromViews/splash.ejs');
});

//load Game
router.get('/game', (req, res) => {
  res.redirect('http://ayyohh.net/escapefromunionstation/');
});



//Index route
router.get("/api/leaderboard", (req, res) => {
  Score.find({}, (err, foundScores) => {
    if(err){
      console.log('error in find');
      console.log(err);
    } else {
      res.render('../views/EscapeFromViews/leaderboard.ejs', {
        scores: foundScores,
      });
    }
  });
});


//Create route
router.post('/api/leaderboard', (req, res) => {
  Score.create(req.body, (err, newScore) => {
    if(err){
      console.log(err, 'error in create');
      res.render('../views/EscapeFromViews/splash.ejs');
    } else {
        res.redirect('/api/leaderboard');
      }
    });
  });


//==================== api call for me ========================
// Index Route
router.get("/api/v1/leaderboard", async (req, res, next) => {
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


//
// // New Route
// router.post("/api/leaderboard", async (req, res) => {
//     console.log("This is req.session in the post route of scoreController:", req.session);
//     try {
//         console.log("This is req.body in scoreController:", req.body);
//         const createdScore = await Score.create(req.body);
//         res.json({
//             status: 200,
//             data: createdScore
//         });
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });
//
//
// // Show Route
// router.get("/:id", async (req, res, next) => {
//     try {
//         const foundScore = await Score.findById(req.params.id);
//         res.json({
//             status: 200,
//             data: foundScore
//         });
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });


module.exports = router;
