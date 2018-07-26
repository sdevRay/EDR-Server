var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Stat = sequelize.import('../models/stat');

//  create a users fitness starting point
router.post('/create', (req, res) => {
    var hours = Number(req.body.currentHours)
    var mins = Number(req.body.currentMinutes)
    var secs = Number(req.body.currentSeconds)
    var totalsecs = ((hours*3600)+(mins*60)+(secs))

    Stat.create({
        date: req.body.date,
        discipline:  req.body.discipline,
        measurement: req.body.measurement,
        unit: req.body.unit,
        currentDistance: req.body.currentDistance,
        currentHours: hours,
        currentMinutes: mins,
        currentSeconds: secs,
        totalSeconds: totalsecs,
        owner: req.user.id
    }).then(
        stat => res.json(stat),
        createError = (err) => {
            res.send(500, err.message);
        }
    );
})


//  get all fitness profiles for a user
router.get('/getall', (req, res) =>{
    Stat.findAll({
        where: { owner: req.user.id }
    })
        .then(
        stat => res.json(stat),
             (err) => {
                res.send(500, err.message);
            })
})



//  will take some refactoring depending on front end- maybe
router.put('/update', (req, res) => {
// router.put('/update/:id', (req, res) => {
    // var statId = req.body.id;
    var hours = Number(req.body.currentHours)
    var mins = Number(req.body.currentMinutes)
    var secs = Number(req.body.currentSeconds)
    var totalsecs = ((hours*3600)+(mins*60)+(secs))

    Stat.update({
        date: req.body.date,
        discipline:  req.body.discipline,
        measurement: req.body.measurement,
        unit: req.body.unit,
        currentDistance: req.body.currentDistance,
        currentHours: hours,
        currentMinutes: mins,
        currentSeconds: secs,
        totalSeconds: totalsecs,
        owner: req.user.id
    },
    { where: { id: statId } }
    ).then(
        stat => res.json(stat),
        updateError = (err) => {
            res.send(500, err.message);
        }
    );
})

router.delete('/delete', (req, res) => {
    var statId = req.body.stat.id;

    Stat.destroy({
        where: { id: statId }
    }).then(
        deleteLogSuccess = (data) => {
            res.send("you removed a set of base stats");
        },
        deleteLogError = (err) => {
            res.send(500, err.message);
        }
    );
})




module.exports = router;