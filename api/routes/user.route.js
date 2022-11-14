const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../config/verifyToken');
const User = require('../models/User.model');
const router = require('express').Router();
const bcrypt = require('bcryptjs');


//Updating a user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete a user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get a user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get all users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find({isAdmin:false}).sort({_id: -1}).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get user stats
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    try {
       const date = new Date();
       const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
         const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            }
         ])
            res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;