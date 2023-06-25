const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res)=>{
    const { username, password} = req.body
    const user = await User.findOne({username})
    const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordhash)

    if (!(user && passwordCorrect)){
        return res.status(401)
        .json({
            error: 'invalid username or password'
        })
    }

    const tokenForUser = {
        username: user.name,
        id: user.id
    }

    const token = jwt.sign(tokenForUser, process.env.SECRET)

    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    })



})

module.exports = loginRouter


