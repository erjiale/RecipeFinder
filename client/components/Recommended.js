import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './cards/RecipeCard';

//thunks 
import { loadRecipes } from '../store/store';

class Recommended extends Component {
    constructor() {
        super();
    }

    // componentDidMount() {
    //     this.props.load();
    // }

    render() {
        const { recipes, email, foundRecipe, toggleFound, load } = this.props;
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
                    recipes.map(recipe => <RecipeCard key={ recipe.recipe.uri } recipe={ recipe.recipe } email={ email } /> )
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
            dispatch(loadRecipes());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
