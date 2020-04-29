const router = require('express').Router();
const User = require('../model/User');

//route is /api/user
router.get('/:email', async(req, res, next) => {
    try {
        const { email } = req.params;
        const user = await User.findOne(
            { email: email }
        );
        res.status(201).send(user);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;