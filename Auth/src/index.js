import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

// components
import Nav from './components/Nav';
import IngredientsForm from './components/IngredientsForm';

class App extends Component { 
    constructor() {
        super();
        this.state = {

        };
    }
    render() {

        const findRecipes = ingredients => {
            ingredients.forEach((ingr, index) => console.log(`ingr ${index + 1}: ${ingr}`));
        };

        return (
            <HashRouter>
                <a className='homepage' href='/'>RECIPE FINDER</a>
                <Nav />

                <Route path='/' render={ () => <IngredientsForm findRecipes={ findRecipes } /> } />

            </HashRouter>
        );
    }
};

ReactDOM.render(<App />, document.querySelector('#root'));