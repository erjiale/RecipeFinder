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
        <div className="cards">
        <div className='recipe-card'>
            {/* gunit */}
            <h2><Link className='commentslink' to={`/recipe/comments/${ encodeURIComponent(recipe.uri) }`}>{ recipe.label }</Link></h2>

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

            {/*  */}
            <a href={ recipe.url } target="_blank" >Link to recipe</a>
            <br />
            <ul>
                <h4>These are the Ingredients</h4>
                {
                    recipe.ingredients && recipe.ingredients.map((ingr, index) => <div key={ index }>{ingr.text}</div>)
                }
            </ul>
            <img src={ recipe.image }/>
            { missingingredients.length !== 0 ?
            <div>
                <h4>Missing ingredients</h4>
                <ul>
                {
                    missingingredients.map((ingr, index) => <div  key={ index }>{ingr.text}</div>)
                }
                </ul>
            </div>
            : '' }
        </div>
        </div>
    );
};

export default RecipeCard;