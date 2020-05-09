import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { render } from 'react-dom';
import { loadRecipes } from '../../store/store';
// import { connect } from 'react-redux';


const RecipeCard = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         favorites: []
    //     }
    // }

    // componentDidMount() {
    //     (props).favorites;
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps);
    //     console.log((props));
    //     if(prevProps.user.favorites !== (props).user.favorites) {
    //         this.setState(); 
    //     }
    // }

    
    const { recipe, ingredients, email, location, user } = props;

    //thunks
    const { unfavorite, addfavorite, removeOrder } = props;
    // const { addfavorite } = (props);

    let missingingredients = []

    //finds missing ingredients
    if(ingredients) missingingredients = recipe.ingredients.filter(recipeingr => !ingredients.some(ingr => recipeingr.text.includes(ingr)));
    return (
        <div className='recipe-card'>
            <h3>{ recipe.label }</h3>
            <br />
            { email !== ''? 
                <form onSubmit={ async() => {
                    if (location === 'favorite') {
                        unfavorite(recipe, email);
                    }
                    else {
                        // await axios.post(`/api/user/${email}/favorite`, { favoriteObj: recipe });
                        addfavorite(recipe, user.email);
                        alert('Recipe added to Favorites');
                    }
                }}>
                    {location != 'favorite' ? <button>Add to Favorites</button> : <button>Delete from Favorites</button>}
                </form>
                : ''
            }
            {/* -------Authenticated------------------------------------
            { email !== '' && location === 'favorite' ?
                <form onSubmit={ async () => {

                    unfavorite(recipe, email);
                }}>
                    <button>Delete from favorites</button>
                </form>
                : ''
            }
            { email !== '' && location !== 'favorite' ?
                <form onSubmit={ async () => {
                    // await axios.post(`/api/user/${user.email}/favorites`, { favoriteObj: recipe });
                    addfavorite(recipe, email);
                    alert('Added to favorites');
                }}>
                    {(user.favorites.filter(favorite=>favorite.uri === recipe.uri).length === 0) ?
                        <button>Add to Favorites</button>
                        : 'Recipe already saved'}
                </form>
                : ''
            } */}
            
            {/* -------ADMIN && Authenticated------------------------------------*/}
            { email !== '' && user.admin ? 
                <form onSubmit={ async() => {
                    if (location === 'store') {
                        removeOrder(recipe,email);
                    }
                    else {
                        // adds to Admin's order array (store items) in db only if it is NOT a duplicate
                        await axios.post(`/api/user/${email}/orders`, { orderObj: recipe });
                        alert('This recipe is now for sale');
                    }
                }}>
                    {location != 'store' ? <button>Add to Store</button> : <button>Remove from Store</button>}
                </form>
                : ''
            }

            {/* -------CUSTOMER && Authenticated------------------------------------*/}
            { email !== '' && !user.admin ?
                <form onSubmit={ async() => {
                    await axios.post(`/api/user/${user.email}/orders`, { orderObj: recipe });
                    alert('Your order is on the way');
                }}>
                    {location == 'store' ? <button>Order Recipe</button> : ''}
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

// const mapStateToProps = state => {
//     return {
//         favorites: state.favorites
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         loadrec: email => dispatch(loadRecipes())
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
export default RecipeCard;