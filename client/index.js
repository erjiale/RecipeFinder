import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// components
import Nav from './components/Nav';
import IngredientsForm from './components/IngredientsForm';
import Login from './components/Login';
import Register from './components/Register';
import Recommended from './components/Recommended';

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
            err: ''
        };
    }

    render() {
        const { email, authenticated, err } = this.state;

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

        
        return (
            <HashRouter>
                { /* root paths */ }
                <Link to='/' className='homepage' >RECIPE FINDER</Link>
                <Route path='/' render={ props =>  authenticated ? <Nav_ {...props} logout={ logout } /> : <Nav {...props} /> } />
                <Route exact path='/' render={ () => <IngredientsForm email={ email } authenticated={ authenticated }/> } /> 

                { /* doesnt matter if authorized or not */ }
                <Route exact path='/popular' render={ () => <Recommended authenticated={ authenticated } email={ email }/> } />

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
                                                             render={ props => <FavoriteRecipes_ {...props} email={ email } /> } />
                                                            <Redirect to='/favorite' />
                                                        </main>) 
                                                        : '' )} />  
                                                        
            </HashRouter>
        );
    }
};

ReactDOM.render(<App />, document.querySelector('#root'));