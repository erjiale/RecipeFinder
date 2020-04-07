import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className='recipe-card'>
            <h1>{ recipe.label }</h1>
            <a href={ recipe.url } target="_blank" >{ recipe.url }</a>
            <ul>
                <p>Ingredients</p>
                {
                    recipe.ingredients.map(ingr => <li>{ingr.text}</li>)
                }
            </ul>
            <img src={ recipe.image }/>
        </div>
    );
};

export default RecipeCard;