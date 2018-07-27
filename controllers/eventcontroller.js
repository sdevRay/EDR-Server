var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Events = sequelize.import('../models/event');


// create an event for the currently logged in user.  The event will be put in the general data base for everyone to see, but the distance and goal time will only be retrievable by that specific user.
router.post('/create', (req, res) => {
    
    Events.create({
        eventName: req.body.eventName,
        eventCity: req.body.eventCity,
        eventState: req.body.eventState,
        eventDate: req.body.eventDate,
        eventType:  req.body.eventType,
        unit: req.body.unit,
        eventDistance: req.body.eventDistance,
        owner: req.user.id
    }).then(
        event => res.json(event),
        createError = (err) => {
            res.send(500, err.message);
        }
    );
})

// get only events of current logged in user - gets all info including user event goals.
router.get('/myevents', (req, res) => {
    Events.findAll({
        where: { owner: req.user.id }
    })
    .then(
        (event) => {
            res.json(event)
        },
        (err) => {
            res.send(500, err.message);
        })
})

// returns one event card
router.get("/getone/:id", (req, res) => {
    var eventId = req.params.id;
    Events.findOne({
        where: { id: eventId }
    }).then(
        event => res.json(event),
        err => res.status(500).send(err)
    )
})

//get all events in database - ultimately we went it to display just the event name, event location and event date.  all the goal information attached to the user will not be available to other users.

router.get('/allevents', (req, res) => {
    Events.findAll()
    .then(
        (events) => {
            res.json(events)
            },
            (err) => {
                res.send(500, err.message)       
            })
})

router.put('/update/:id', (req, res) => {
var eventId = req.params.id;

    Events.update({
        eventName: req.body.eventName,
        eventCity: req.body.eventCity,
        eventState: req.body.eventState,
        eventDate: req.body.eventDate,
        eventType:  req.body.eventType,
        unit: req.body.unit,
        eventDistance: req.body.eventDistance,
        owner: req.user.id
    },
    { where: { id: eventId } }
    ).then(
        event => res.json(event),
        createError = (err) => {
            res.send(500, err.message);
        }
    );
})

router.delete('/delete/:id', (req, res) => {
    var eventId = req.params.id;
    Events.destroy({
        where: { id: eventId }
    })
    .then(event => res.json(event))
    .catch(err => res.status(500).send(err))
})

module.exports = router;