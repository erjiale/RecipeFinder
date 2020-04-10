import React, { Component } from 'react';
import axios from 'axios';

import RecipeCard from '../cards/RecipeCard';

class FavoriteRecipes_ extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            favorites: []
        };
    }   

    async componentDidMount() {
        const { email } = this.props;
        const foods = (await axios.get(`/api/user/${email}/favorites`)).data.favorites;
        this.setState({ email: email, favorites: foods });
    }

    render() {
        const { email, favorites } = this.state;
        const { location } = this.props;
        return (
            <main>
                <h1>Your favorite recipes</h1>
                <div>
                    {
                        favorites.length !== 0 ? favorites.map((food, index) => <RecipeCard email={ email } authenticated={ true } key={ index } location={ location.pathname.slice(1) } recipe={ food } /> ) : ''
                    }
                </div>
            </main> 
        );
    }
};

export default FavoriteRecipes_;