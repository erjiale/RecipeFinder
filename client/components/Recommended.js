import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './cards/RecipeCard';

//thunks 
import { loadRecipes, addFavorite } from '../store/store';

class Recommended extends Component {
    constructor() {
        super();
    }

    // componentDidMount() {
    //     this.props.load();
    // }

    render() {
        const { recipes, email, foundRecipe, toggleFound, load, user, addfavorite } = this.props;
        return (
            <div className='all-recipes'>
                {
                    foundRecipe ? <button onClick={ () => {
                        toggleFound();
                        load();
                    }}>Get Recommended</button> 
                    : ''
                }
                {
                    recipes.map(recipe => <RecipeCard key={ recipe.recipe.uri } addfavorite={ addfavorite } user={ user } recipe={ recipe.recipe } email={ email } /> )
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        recipes: state.recipes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        load: () => {
            dispatch(loadRecipes())
        },
        addfavorite: (recipe, email) => {  
            dispatch(addFavorite(recipe,email))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
