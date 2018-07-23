var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Events = sequelize.import('../models/event');


// create an event for the currently logged in user.  The event will be put in the general data base for everyone to see, but the distance and goal time will only be retrievable by that specific user.
router.post('/create', (req, res) => {
    var hours = Number(req.body.event.goalHours)
    var mins = Number(req.body.event.goalMinutes)
    var secs = Number(req.body.event.goalSeconds)
    var totalsecs = ((hours*3600)+(mins*60)+(secs))

    Events.create({
        eventName: req.body.event.eventName,
        eventCity: req.body.event.eventCity,
        eventState: req.body.event.eventState,
        eventDate: req.body.event.eventDate,
        eventType:  req.body.event.eventType,
        unit: req.body.event.unit,
        eventDistance: req.body.event.eventDistance,
        goalHours: hours,
        goalMinutes: mins,
        goalSeconds: secs,
        goalTotalSeconds: totalsecs,
        owner: req.user.id
    }).then(
        createSuccess = (event) => {
            res.json({
                event: event,
                message: 'event has been added to the database'
            });
        },
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
            res.json({
                event: event
            })
        },
        (err) => {
            res.send(500, err.message);
        })
})

//get all events in database - ultimately we went it to display just the event name, event location and event date.  all the goal information attached to the user will not be available to other users.

router.get('/allevents', (req, res) => {
    Events.findAll()
    .then(
        (event) => {
            res.json({
                
                event: event
            })
        }
    )
})





module.exports = router;