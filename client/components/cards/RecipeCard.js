import React from 'react';
import axios from 'axios';

const RecipeCard = props => {
    const { recipe, ingredients, email, authenticated, location } = props;

    //thunks
    const { unfavorite } = props;

    let missingingredients = []

    //finds missing ingredients
    if(ingredients) missingingredients = recipe.ingredients.filter(recipeingr => !ingredients.some(ingr => recipeingr.text.includes(ingr)));
    return (
        <div className='recipe-card'>
            <h1>{ recipe.label }</h1>

            { /* if authenticated, show the button. if not, show nothing */ }
            { authenticated ? 
                <form onSubmit={ async () => {
                    if(location === 'favorite') {
                       unfavorite(recipe, email);

                    } else {
                        //pls dont try to add the same recipe twice. i didnt add that exception yet
                        await axios.post(`/api/user/${email}/favorites`, { favoriteObj: recipe });
                        alert('added');
                    }
                }
            }>
                    {location === 'favorite' ? <button>Delete from favorites</button> : <button>Add as favorite</button> }
                </form>
                : ''
            }


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
                    missingingredients.map(ingr => <li key={ ingr.uri }>{ingr.text}</li>)
                }
                </ul>
            </div>
            : '' }
        </div>
    );
};

export default RecipeCard;