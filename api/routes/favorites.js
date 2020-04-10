const router = require('express').Router();
const User = require('../model/User');


//root route is /api/user

router.get('/:email/favorites', async (req, res, next) => {
    const { email } = req.params;
    const user = await User.findOne(
        { email: email },
        { favorites: [] }
    );
    res.status(201).json(user);
});

router.post('/:email/favorites', async (req, res, next) => {
    const { email } = req.params;
    const { favoriteObj } = req.body;
    try {
        const user = await User.findOne(
            { email: email },
            { favorites: [] } 
        );
        const favorites = (Object.entries(user)[3])[1].favorites;
        await User.updateOne(
            { email: email },
            [
                {
                    $set: {
                        favorites: [...favorites, favoriteObj]
                    }
                }
            ]
        );
        res.status(201).json(user);
    } catch(err) {
        console.log(err);
    }
});

router.delete('/:email/favorites/:uri', async (req, res, next) => {
    const uri = decodeURIComponent(req.params.uri);
    const { email } = req.params;
    try {
        const user = await User.findOne(
            { email: email },
            { favorites: [] }
        );
        const favorites = (Object.entries(user)[3])[1].favorites;
        await User.updateOne(
            { email: email },
            [
                {
                    $set: {
                        favorites: favorites.filter(fav => fav.uri !== uri)
                    }
                }
            ]
        );
        res.status(204).json(user);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;