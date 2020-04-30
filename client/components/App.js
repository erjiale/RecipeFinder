import React, { Component } from 'react';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

// components
import Nav from './Nav';
import IngredientsForm from './IngredientsForm';
import Login from './Login';
import Register from './Register';
import Recommended from './Recommended';
import Comments from './Comments';

// logged in components 
import User_ from './authorized/User_';
import Nav_ from './authorized/Nav_';
import FavoriteRecipes_ from './authorized/FavoriteRecipes_';

//thunks 
import { loadRecipes, login, signout } from '../store/store';

class App extends Component { 
    constructor() {
        super();
        this.state = {
            email: '',
            err: '',
            user: {},
            foundRecipe: false
        };
    }

    componentDidMount() {
        this.props.load();
        const socket = io();
        socket.on('chat', msg => {
            console.log(msg.message);
        }); 
    }

    render() {
        const { email, err, user, foundRecipe } = this.state;
        const { auth, logoff } = this.props;

        const toggleFound = () => {
            this.setState({ foundRecipe: !foundRecipe });
        };

        const getCredentials = async info => {
            await auth(info);
            const token = window.localStorage.getItem('token');
            //since we're doing redux we should not be doing any setstate... but im lazy to do all that token shit LOL
            const user = (await axios.get(`/api/user/${ info.email }`)).data;
            if(token) this.setState({  email: info.email, user });
        };

        const registerAccount = async info => {
            const { name, email, password } = info;
            await axios.post('/api/user/register', { name: name, email: email, password: password });
        };

        const logout = () => {
            logoff();
            //since we're doing redux we should not be doing any setstate... but im lazy to do all that token shit LOL
            this.setState({ email: '' });
        };

        return (
            <HashRouter>
                { /* root paths */ }
                <Link to='/' className='homepage' >RECIPE FINDER</Link>
                <Route path='/' render={ props => email !== '' ? <Nav_ foundRecipe={ foundRecipe } {...props} logout={ logout } email={ email } /> : <Nav foundRecipe={ foundRecipe } {...props} /> } />
                <Route exact path='/' render={ () => <IngredientsForm email={ email } toggleFound={ toggleFound } /> } /> 

                { /* doesnt matter if authorized or not */ }
                <Route exact path='/popular' render={ () => <Recommended toggleFound={ toggleFound } foundRecipe={ foundRecipe } email={ email }/> } />
                <Route path='/recipe/comments/:uri' render={ props => <Comments user={ user } {...props}/> } /> 

                { /* login/register */ }
                <Route exact path='/login' render={ () =>   <main> 
                                                                <h1 className={`error ${ err ? '' : 'invisibleerror'} `}>{err}</h1>
                                                                <Login login={ getCredentials }/>
                                                            </main> } />
                <Route exact path='/register' render={ () => <Register register={ registerAccount } /> } />

                { /* not authorized */ }
                <Route exact path='/user/:email' render={ () => email !== '' ? '' : <h1>Not logged in</h1>} />

                { /* successful authorization */ }
                <Route render={ () => ( email !== '' ? (<main>
                                                            <Route exact path={`/user/${email}`} 
                                                             render={ () => <User_ user={ user } /> } />  

                                                            <Route exact path='/favorite'
                                                             render={ props => <FavoriteRecipes_ {...props} email={ email } /> } />
                                                            <Redirect to='/favorite' />
                                                        </main>) 
                                                        : '' )} />
                                                        
            </HashRouter>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(loadRecipes()),
        auth: info => dispatch(login(info)),
        logoff: () => dispatch(signout())
    };
};

export default connect(null, mapDispatchToProps)(App);