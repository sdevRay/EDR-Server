var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Stat = sequelize.import('../models/stat');

//  create a users fitness starting point
router.post('/create', (req, res) => {

    Stat.create({
        date: req.body.date,
        discipline:  req.body.discipline,
        unit: req.body.unit,
        currentDistance: req.body.currentDistance,
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

// returns one stat card
router.get("/getone/:id", (req, res) => {
    var statId = req.params.id;
    Stat.findOne({
        where: { id: statId }
    }).then(
        stat => res.json(stat),
        err => res.status(500).send(err)
    )
})

//  will take some refactoring depending on front end- maybe
router.put('/update/:id', (req, res) => {
    var statId = req.params.id;

    Stat.update({
        date: req.body.date,
        discipline:  req.body.discipline,
        unit: req.body.unit,
        currentDistance: req.body.currentDistance,
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

router.delete('/delete/:id', (req, res) => {
    var statId = req.params.id;
    Stat.destroy({
        where: { id: statId }
    })
    .then(stat => res.json(stat))
    .catch(err => res.status(500).send(err))
})

module.exports = router;