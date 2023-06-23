const userRouter = require('express').Router()
const UserModel = require('../models/user')
const log = require('../utils/logger')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res)=> {
    log.info('creating user...')
    const { name, username, password} = req.body
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
    let users = await UserModel.find({})
    log.info('getting all users')
    res.status(200).json(users)
})




module.exports = userRouter