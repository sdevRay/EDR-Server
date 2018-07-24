var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// FOR TESTING
router.post("/test", (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    }) 
    .then(user => res.json(user))
    .catch(err => res.send(500, err.message))
})

router.post('/create', (req, res) => {
    var pass = req.body.password;

    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(pass, 10)
    }).then(
        createSuccess = (user) => {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 })
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = (err) => {
            res.send(500, err.message);
        }
    );
})

router.post('/signin', function (req, res) {
    User.findOne({ where: { email: req.body.email } })
        .then(
            (user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (err, matches) => {
                        if (matches) {
                            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 })
                            res.json({
                                user: user,
                                message: "welcome back!",
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({ error: "Password does not match" })
                        }
                    })
                } else {
                    res.status(500).send({ error: "User not found" })
                }


            },
            (err) => {
                res.status(501).send({ error: "didn't work" });
            })
})


module.exports = router;