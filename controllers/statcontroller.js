var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Stat = sequelize.import('../models/stat');

//  create a users fitness starting point
router.post('/create', (req, res) => {
    var hours = Number(req.body.stat.currentHours)
    var mins = Number(req.body.stat.currentMinutes)
    var secs = Number(req.body.stat.currentSeconds)
    var totalsecs = ((hours*3600)+(mins*60)+(secs))

    Stat.create({
        date: req.body.stat.date,
        discipline:  req.body.stat.discipline,
        measurement: req.body.stat.measurement,
        unit: req.body.stat.unit,
        currentDistance: req.body.stat.currentDistance,
        currentHours: hours,
        currentMinutes: mins,
        currentSeconds: secs,
        totalSeconds: totalsecs,
        owner: req.user.id
    }).then(
        createSuccess = (stat) => {
            res.json({
                stat: stat,
                message: 'user base stats have been added to database'
            });
        },
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
        (stat) => {
                res.json({
                    stat: stat
                })
            },
             (err) => {
                res.send(500, err.message);
            })
})



//  will take some refactoring depending on front end- maybe
router.put('/update', (req, res) => {
    var hours = Number(req.body.stat.currentHours)
    var mins = Number(req.body.stat.currentMinutes)
    var secs = Number(req.body.stat.currentSeconds)
    var totalsecs = ((hours*3600)+(mins*60)+(secs))

    Stat.update({
        date: req.body.stat.date,
        discipline:  req.body.stat.discipline,
        measurement: req.body.stat.measurement,
        unit: req.body.stat.unit,
        currentDistance: req.body.stat.currentDistance,
        currentHours: hours,
        currentMinutes: mins,
        currentSeconds: secs,
        totalSeconds: totalsecs,
        owner: req.user.id
    },
    { where: { id: data } }
    ).then(
        updateSuccess = (stat) => {
            res.json({
                stat: stat,
                message: 'user base stats have been updated'
            });
        },
        updateError = (err) => {
            res.send(500, err.message);
        }
    );
})

router.delete('/delete', (req, res) => {
    var userid = req.body.stat.id;

    Stat.destroy({
        where: { id: userid }
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