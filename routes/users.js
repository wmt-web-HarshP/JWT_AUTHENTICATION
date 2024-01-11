const express = require('express');
const router = express.Router();
const USER = require('../models/user')
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const userlist = await USER.find();
    if (!userlist) { res.json({ success: false, msg: "NO USER available!!" }) }
    else { return res.send(userlist) }
});

router.post('/register', async (req, res) => {
    let newUser = await USER.insertMany({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    if (!newUser) { console.log('new user is not created!!') }
    else { return res.json(newUser) }
}) 
 
router.post('/login', async (req, res) => {
    let user = await USER.findOne({ email: req.body.email })
    const secret = process.env.SECRET;
    if (!user) {
        return res.status(400).send('The user not found');
    }
    if (user && (req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
        )
        res.status(200).send({ user: user.email, token: token })
    }else {
        res.status(400).send('password is wrong!');
    }
    
})

module.exports = router;