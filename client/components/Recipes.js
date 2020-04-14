import React from 'react';
import RecipeCard from './cards/RecipeCard';

const Recipes = ({ recipes, email, missingingredients }) => {
    return (
        <div className='all-recipes'>
            {/* <Link className='search-again' to='/' onClick={ reset }>Search Again</Link> */}
            {
                recipes.map(recipe => <RecipeCard key={ recipe.recipe.uri } email={ email } recipe={ recipe.recipe } /> )
            }
        </div>
    );
}

export default Recipes;