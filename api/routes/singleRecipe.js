const router = require('express').Router();
const axios = require('axios');

//root route is /api/comments
const API_ID = "41d54d75"
const API_KEY = "dd6be63ef848ed24366c0340af7d0759"

router.get('/:uri', async (req, res, next) => {
    const uri = encodeURIComponent(req.params.uri);
    try {
        const recipe = (await axios.get(`https://api.edamam.com/search?r=${uri}&app_id=${API_ID}&app_key=${API_KEY}`)).data;
        res.status(201).json(recipe);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;