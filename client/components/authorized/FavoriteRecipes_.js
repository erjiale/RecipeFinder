import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../cards/RecipeCard';

//thunks
import { getFavorites, destroy } from '../../store/store';

class FavoriteRecipes_ extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            favorites: []
        };
    }   

    async componentDidMount() {

        const { email, load } = this.props;
        load(email);
    }

    render() {
        const { favorites, location, unfavorite, email } = this.props;
        return (
            <main>
                <h1>Your favorite recipes</h1>
                <div>
                    {
                        favorites.length !== 0 ? favorites.map((food, index) => <RecipeCard unfavorite={ unfavorite } email={ email } key={ index } location={ location.pathname.slice(1) } recipe={ food } /> ) : 'No saved reciped yet!!'
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
        unfavorite: (recipe, email) => dispatch(destroy(recipe, email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes_);