import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './cards/RecipeCard';

//thunks 
import { loadRecipes } from '../store/store';

class Recommended extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.load();
    }

    componentWillUnmount() {
        //clears the recipes list
        this.props.clear();
    }

    render() {
        const { recipes, email } = this.props;
        return (
            <div className='all-recipes'>
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
            dispatch(loadRecipes('chicken and beef and shrimp'));
        },
        clear: () => {
            dispatch(loadRecipes(''));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
