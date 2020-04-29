const router = require('express').Router();
const axios = require('axios');

const API_ID = "41d54d75"
const API_KEY = "dd6be63ef848ed24366c0340af7d0759"

//root route is /api/recipes
router.get('/:ingredients', async(req, res, next) => {
    const { ingredients } = req.params;
    try {
        const recipes = (await axios.get(`https://api.edamam.com/search?q=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}`)).data.hits;
        res.status(201).json(recipes);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;