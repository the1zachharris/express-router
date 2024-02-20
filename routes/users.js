const express = require('express');
const userRouter = express.Router();
const User = require('../models/User')

// userRouter.use(express.json());
// userRouter.use(express.urlencoded({extended: true}));

userRouter.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const myUser = await User.findByPk(id);
    res.json(myUser);
});

userRouter.post('/', async (req,res) => {
    const restraunt = await User.create(req.body);
    res.json(restraunt);
});

userRouter.put('/:id', async (req,res) => {
    const id = req.params.id;
    await User.update(req.body, {where: {id: id}, returning: true, plain: true});
    const myUser = await User.findByPk(id);
    res.json(myUser);
});

userRouter.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const deletedUser = await User.destroy({where: {id: id}});
    res.json(deletedUser);
});

module.exports = userRouter