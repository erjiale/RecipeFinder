import React from 'react';
import RecipeCard from './RecipeCard';

const Recipes = ({ recipes, ingredients }) => {
    return (
        <div className='all-recipes'>
            {/* <Link className='search-again' to='/' onClick={ reset }>Search Again</Link> */}
            {
                recipes.map(recipe => <RecipeCard key={ recipe.recipe.uri } ingredients={ ingredients } recipe={ recipe.recipe } /> )
            }
        </div>
    );
}

export default Recipes;