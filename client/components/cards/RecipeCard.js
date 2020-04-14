import React from 'react';
import axios from 'axios';

const RecipeCard = ({ recipe, ingredients, email, authenticated, location }) => {
    let missingingredients = []

    //finds missing ingredients
    if(ingredients) missingingredients = recipe.ingredients.filter(recipeingr => !ingredients.some(ingr => recipeingr.text.includes(ingr)));
    return (
        <div className='recipe-card'>
            <h1>{ recipe.label }</h1>

            { /* if authenticated, show the button. if not, show nothing */ }
            { authenticated ? 
                <form onSubmit={ async () => {
                    // const API_ID = "41d54d75"
                    // const API_KEY = "dd6be63ef848ed24366c0340af7d0759"
                    // const findrecipe = (await axios.get(`https://api.edamam.com/search?r=${encodeURIComponent(recipe.uri)}&app_id=${API_ID}&app_key=${API_KEY}`)).data;
                    // console.log(findrecipe);
                    //this works but i realized it would be very slow. if a user had like 50 favorites, we'd need to make 51 axios calls (1 to find all of user's favorites, loop through all the favorites and make axios calls to find them in edamam. instead of doing this, id rather  just save the entire recipe object in array in our mongo database

                    //this is saving the entire object in database 
                    if(location === 'favorite') {
                        await axios.delete(`/api/user/${email}/favorites/${encodeURIComponent(recipe.uri)}`);
                        alert('pls go into another route then come back to this one so it updates. its hard to set state while im in different component');

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