import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// components
import Nav from './components/Nav';
import IngredientsForm from './components/IngredientsForm';
import Login from './components/Login';
import Register from './components/Register';
import Recipes from './components/Recipes';

// logged in components 
import User_ from './components/authorized/User_';
import Nav_ from './components/authorized/Nav_';
import FavoriteRecipes_ from './components/authorized/FavoriteRecipes_';

class App extends Component { 
    constructor() {
        super();
        this.state = {
            authenticated: false,
            email: '',
            err: '',
            recipes: []
        };
    }

    render() {
        const { email, authenticated, err, recipes } = this.state;

        const getCredentials = async info => {
            const { email, password } = info;
            const object = (await axios.post('/api/user/login', { email: email, password: password }));
            object.status === 400 ? this.setState({ err: "Wrong email or password" }) : this.setState({ email: email, authenticated: true });
        };

        const registerAccount = async info => {
            const { name, email, password } = info;
            await axios.post('/api/user/register', { name: name, email: email, password: password });
        };

        const logout = () => {
            this.setState({ email: '', authenticated: false, err: 'Successfully logged out' });
        };

        const reset = () => {
            this.setState({ recipes: [] });
        };

        const findRecipes = async (ev, inputs) => {
            ev.preventDefault();
            const API_ID = "41d54d75"
            const API_KEY = "dd6be63ef848ed24366c0340af7d0759"
            const query = inputs.reduce((entirestring, ingredient) => {
                if(entirestring === '') return ingredient;
                else return `${entirestring} and ${ingredient}`;
            }, '');
            const findrecipes = (await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`)).data.hits;
            // const findrecipes1 = (await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}/2`)).data.hits;
            // console.log(findrecipes1);
            this.setState({ recipes: findrecipes });
        };

        return (
            <HashRouter>
                { /* root paths */ }
                <Link to='/' className='homepage' >RECIPE FINDER</Link>
                <Route path='/' render={ props =>  authenticated ? <Nav_ {...props} logout={ logout } /> : <Nav {...props} /> } />
                <Route exact path='/' render={ () => recipes.length === 0 ? <IngredientsForm findRecipes={ findRecipes } /> : <Recipes recipes={ recipes } reset={ reset } /> } /> 

                { /* login/register */ }
                <Route exact path='/login' render={ () =>   <main> 
                                                                <h1 className={`error ${ err ? '' : 'invisibleerror'} `}>{err}</h1>
                                                                <Login login={ getCredentials }/>
                                                            </main> } />
                <Route exact path='/register' render={ () => <Register register={ registerAccount } /> } />

                { /* not authorized */ }
                <Route exact path='/user' render={ () => authenticated ? '' : <h1>Not logged in</h1>} />

                { /* successful authorization */ }
                <Route render={ () => ( authenticated ? (<main>
                                                            <Route exact path='/user' 
                                                             render={ () => <User_ info={ email } /> } />  

                                                            <Route exact path='/favorite'
                                                             render={ () => <FavoriteRecipes_ userid={ /* GET USER ID FROM AUTHENTICATION THING */ email } /> } />
                                                            <Redirect to='/favorite' />
                                                        </main>) 
                                                        : '' )} />  
                                                        
            </HashRouter>
        );
    }
};

ReactDOM.render(<App />, document.querySelector('#root'));