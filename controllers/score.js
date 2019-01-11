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



//============= leaderboard calls =====================================
router.get("/api/leaderboard", (req, res) => {
  Score.find({}, (err, foundScores) => {
    if(err){
      console.log('error in find');
      console.log(err);
    } else {
      let sortedArr = []

      for (let i = 0; i < foundScores.length; i++) {
        sortedArr[i] = foundScores[i]

      }
      var flag = true;
      let temp;
      while(flag) {
        flag = false;
        for (let i = 0; i < sortedArr.length - 1; i++) {
          if(sortedArr[i].score > sortedArr[i + 1].score) {
            temp = sortedArr[i];
            sortedArr[i] = sortedArr[i + 1];
            sortedArr[i + 1] = temp;
            flag = true;
          }
        }
      }

      console.log(sortedArr, 'this is sortedArr');


      res.render('../views/EscapeFromViews/leaderboard.ejs', {

        scores: sortedArr,
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



module.exports = router;
