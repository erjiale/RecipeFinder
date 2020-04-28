import React from 'react';
import RecipeCard from './cards/RecipeCard';

const Recipes = ({ recipes, ingredients, email }) => {
    return (
        <div className='all-recipes'>
            {/* <Link className='search-again' to='/' onClick={ reset }>Search Again</Link> */}
            {
                recipes && recipes.map(recipe => <RecipeCard key={ recipe.recipe.uri } email={ email } ingredients={ ingredients } recipe={ recipe.recipe } /> )
            }
        </div>
    );
}

export default Recipes;