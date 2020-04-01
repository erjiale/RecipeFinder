const router = require('express').Router();
const User = require('../../api/model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

// REGISTER
// async cuz we need time to submit to the database
router.post('/register', async (req, res) => {

    // Validate data before we create a user
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Check if the email already exists in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // HASH the password
    const salt = await bcrypt.genSalt(10); // generate the Salt for the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // only bcrypt can decrypt the salted password

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});   
    }catch(err) {
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    // Validate data before we login a user
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if user is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not registered'); // message anti-hackers lol

    // Check if PASSWORD is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password")

    // Create and Assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET) // pass along some info in that jwt token, and TOKEN_SECRET that only our backend(db) knows about
    res.header('auth-token', token).send(token);

});


module.exports = router;