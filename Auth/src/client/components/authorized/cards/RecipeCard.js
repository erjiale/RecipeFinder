import React from 'react';

const RecipeCard = props => {
    const {name, ingredients, url} = props.food;
    return (
        <div style={{
                backgroundImage: `url(${url})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }} className="favoritefood">
            <h1>{name}</h1>
            <p>Ingredients:</p>
            <ul>
            {
                ingredients.map((ingr, index) => <li key={index}>{ingr}</li>)
            }
            </ul>
        </div>
    );
};

export default RecipeCard;