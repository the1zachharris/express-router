const express = require('express');
const router = express.Router();
const { User } = require('../models/User')

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const myUser = await User.findByPk(id);
    res.json(myUser);
});

router.post('/users', async (req,res) => {
    const restraunt = await User.create(req.body);
    res.json(restraunt);
});

router.put('/users/:id', async (req,res) => {
    const id = req.params.id;
    await User.update(req.body, {where: {id: id}, returning: true, plain: true});
    const myUser = await User.findByPk(id);
    res.json(myUser);
});

router.delete('/users/:id', async (req,res) => {
    const id = req.params.id;
    const deletedUser = await User.destroy({where: {id: id}});
    res.json(deletedUser);
});

module.exports = router