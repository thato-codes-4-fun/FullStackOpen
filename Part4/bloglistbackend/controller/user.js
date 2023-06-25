const userRouter = require('express').Router()
const UserModel = require('../models/user')
const log = require('../utils/logger')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res)=> {
    log.info('creating user...')
    const { name, username, password} = req.body
    if (!password || password.length < 3 ){
        return res.status(400).json({error: 'password validation failed: password: password should be 3 chars long'})
    }

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password, saltRounds)
    const user = new UserModel({
        name,
        username,
        passwordhash,
    })
    const savedUser = await user.save()
    res.status(200).json(savedUser)
})

userRouter.get('/', async(req, res)=> {
    let users = await UserModel.find({}).populate('blogs', {url: 1, title: 1, author: 1, id:1})
    log.info('getting all users')
    res.status(200).json(users)
})




module.exports = userRouter