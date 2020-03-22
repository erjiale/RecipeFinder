const router = require('express').Router();
const verify = require('./verifyToken');

// add middleware 'verify'
router.get('/', verify, (req, res) => {
    // res.json({
    //     posts: 
    //         {title: 'my first post', 
    //         description: 'random post you should not be able to access w/o logging in'
    //     }
    // });
    res.send(req.user);
})


module.exports = router;