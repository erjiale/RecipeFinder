import React from 'react';
import { Link } from 'react-router-dom';

import RecipeCard from './RecipeCard';

const Recipes = ({ recipes, reset }) => {
    console.log(recipes);
    return (
        <div className='all-recipes'>
            <Link className='search-again' to='/' onClick={ reset }>Search Again</Link>
            {
                recipes.map(recipe => <RecipeCard recipe={ recipe.recipe } /> )
            }
        </div>
    );
}

export default Recipes;