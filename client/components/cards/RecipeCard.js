import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeCard = props => {
    const { recipe, ingredients, email, location } = props;

    //thunks
    const { unfavorite } = props;

    let missingingredients = []

    //finds missing ingredients
    if(ingredients) missingingredients = recipe.ingredients.filter(recipeingr => !ingredients.some(ingr => recipeingr.text.includes(ingr)));
    return (
        <div className='recipe-card'>
            <h3><Link className='commentslink' to={`/recipe/comments/${ encodeURIComponent(recipe.uri) }`}>{ recipe.label }</Link></h3>
            <br />
            { /* if authenticated, show the button. if not, show nothing */ }
            { email !== '' ? 
                <form onSubmit={ async () => {
                    if(location === 'favorite') {
                       unfavorite(recipe, email);

                    } else {
                        // adds to favorite array in db only if it is NOT a duplicate
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
                    recipe.ingredients && recipe.ingredients.map((ingr, index) => <li key={ index }>{ingr.text}</li>)
                }
            </ul>
            <img src={ recipe.image }/>
            { missingingredients.length !== 0 ?
            <div>
                <h1>Missing ingredients</h1>
                <ul>
                {
                    missingingredients.map((ingr, index) => <li key={ index }>{ingr.text}</li>)
                }
                </ul>
            </div>
            : '' }
        </div>
    );
};

export default RecipeCard;