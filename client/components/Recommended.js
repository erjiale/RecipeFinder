import React, { Component } from 'react';
import axios from 'axios';
import RecipeCard from './cards/RecipeCard';

class Recommended extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };
    }

    async componentDidMount() {
        const API_ID = "41d54d75"
        const API_KEY = "dd6be63ef848ed24366c0340af7d0759"
        const search = 'chicken and beef and shrimp';
        const findrecipes = (await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`)).data.hits;
        this.setState({ recipes: findrecipes });
    }

    render() {
        const { recipes } = this.state;
        const { email } = this.props;
        return (
            <div className='all-recipes'>
            {
                recipes.map(recipe => <RecipeCard key={ recipe.recipe.uri } recipe={ recipe.recipe } email={ email } /> )
            }
        </div>
        ); 
    }
};

export default Recommended;
