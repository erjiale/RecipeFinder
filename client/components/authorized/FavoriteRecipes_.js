import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../cards/RecipeCard';

//thunks
import { getFavorites, destroy, addFavorite } from '../../store/store';

class FavoriteRecipes_ extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            favorites: [],
            user: ''
        };
    }   

    async componentDidMount() {
        const { email, load, user } = this.props;
        load(email);
    }

    render() {
        const { favorites, location, unfavorite, addfavorite, email, user } = this.props;
        return (
            <main>
                <h1>Your favorite recipes</h1>
                <div>
                    {
                        favorites.length !== 0 ? favorites.map((food, index) => <RecipeCard user={user} unfavorite={ unfavorite } addfavorite={addfavorite} email={ email } key={ index } location={ location.pathname.slice(1) } recipe={ food } /> ) : 'No saved recipes yet!!'
                    }
                </div>
            </main> 
        );
    }
};

const mapStateToProps = state => {
    return {
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => {
    return {
        load: email => dispatch(getFavorites(email)),
        unfavorite: (recipe, email) => dispatch(destroy(recipe, email)),
        addfavorite: (recipe, email) => dispatch(addFavorite(recipe,email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes_);