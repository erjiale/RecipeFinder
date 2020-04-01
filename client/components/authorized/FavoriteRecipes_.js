import React, { Component } from 'react';
import RecipeCard from './cards/RecipeCard';

class FavoriteRecipes_ extends Component {
    constructor() {
        super();
        this.state = {
            userid: '',
            favorites: []
        };
    }   

    async componentDidMount() {
        const { userid } = this.props; //RIGHT NOW IT IS THE EMAIL. I DONT HAVE A WAY OF GETTING THE USERID FROM DATABASE YET
        //await get favorites from database
        //i got userid here because you need it to search for the guy's favorite foods from database
        //this.setState({ userid: userid, favorites: favoritesfromdatabase });
        const foods = [
            { name: 'fish', ingredients: ['item1', 'item2'], url: 'https://honestandtasty.com/wp-content/uploads/2015/01/Butter-Cooked-Fish-5.jpg' },
            { name: 'chicken', ingredients: ['item3', 'item4'], url: 'https://www.cookingclassy.com/wp-content/uploads/2018/08/slow-cooker-chicken-16.jpg' },
        ];
        this.setState({ userid: userid, favorites: foods });
    }

    render() {
        const { favorites } = this.state;
        return (
            <main>
                <h1>Your favorite recipes</h1>
                <div className="allfavorites">
                    {
                        favorites ? favorites.map((food, index) => <RecipeCard key={ index } food={ food }/> ) : ''
                    }
                </div>
            </main> 
        );
    }
};

export default FavoriteRecipes_;