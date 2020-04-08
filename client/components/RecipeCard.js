import React from 'react';

const RecipeCard = ({ recipe, ingredients }) => {
    let missingingredients = []
    if(ingredients) missingingredients = recipe.ingredients.filter(recipeingr => !ingredients.some(ingr => recipeingr.text.includes(ingr)));
    return (
        <div className='recipe-card'>
            <h1>{ recipe.label }</h1>
            <a href={ recipe.url } target="_blank" >{ recipe.url }</a>
            <ul>
                <p>Ingredients</p>
                {
                    recipe.ingredients.map((ingr, index) => <li key={ index }>{ingr.text}</li>)
                }
            </ul>
            <img src={ recipe.image }/>
            { missingingredients.length !== 0 ?
            <div>
                <h1>Missing ingredients</h1>
                <ul>
                {
                    missingingredients.map(ingr => <li>{ingr.text}</li>)
                }
                </ul>
            </div>
            : '' }
        </div>
    );
};

export default RecipeCard;