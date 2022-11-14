const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = require('express').Router();

//Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error);
    }
})

//Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json('Wrong credentials!');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(401).json('Wrong credentials!');

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET , { expiresIn: '3d' });

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;