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

// logged in components 
import User_ from './authorized/User_';
import Nav_ from './authorized/Nav_';
import FavoriteRecipes_ from './authorized/FavoriteRecipes_';

//thunks 
import { loadRecipes, login, signout } from '../store/store';
import Orders_ from './authorized/Orders_';

class App extends Component { 
    constructor() {
        super();
        this.state = {
            email: '',
            err: '',
            user: {},
            foundRecipe: false,
            hasError: false
        };
    }
    
    componentDidMount() {
        this.props.load(); 
    }

    render() {
        const { email, regSuccess, err, user, foundRecipe, hasError } = this.state;
        const { auth, logoff } = this.props;

        const toggleFound = () => {
            this.setState({ foundRecipe: !foundRecipe });
        };

        const getCredentials = async info => {
            await auth(info);
            const token = window.localStorage.getItem('token');
            //since we're doing redux we should not be doing any setstate... but im lazy to do all that token shit LOL
            const user = (await axios.get(`/api/user/${ info.email }`)).data;
            if(token) {
                this.setState({  email: info.email, user });
            }
            
            // await auth(info)
            // .then(res=>console.log('login success')) // need to carry out the rest of lines of code
            // .catch(error=>this.setState({ err: 'Wrong credentials'}))
        };

        const registerAccount = async info => {
            const { name, email, password } = info;
            await axios.post('/api/user/register', { name: name, email: email, password: password })
            .then(res=>this.setState({regSuccess: 'You registered successfully. Log In'}))
            .catch(err=>this.setState({hasError:true}));
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
                <Route path='/' render={ props => email !== '' ? <Nav_ foundRecipe={ foundRecipe } {...props} logout={ logout } email={ email } user={ user } /> : <Nav foundRecipe={ foundRecipe } {...props} /> } />
                <Route exact path='/' render={ () => <IngredientsForm email={ email } user={ user } toggleFound={ toggleFound } /> } /> 

                { /* doesnt matter if authorized or not */ }
                <Route exact path='/popular' render={ () => <Recommended toggleFound={ toggleFound } foundRecipe={ foundRecipe } email={ email } user={ user }/> } />
                <Route path='/recipe/comments/:uri' render={ props => <Comments user={ user } {...props}/> } /> 

                { /* login/register */ }
                <Route exact path='/login' render={ () =>   <main> 
                                                                <h1 className={`error ${ err ? '' : 'invisibleerror'} `}>{err}</h1>
                                                                <Login login={ getCredentials }/>
                                                            </main> } />
                <Route exact path='/register' render={ () => <main> 
                                                                <h1 className={`error ${ regSuccess ? '' : 'invisibleerror'} `}>{regSuccess}</h1>
                                                                <Register register={ registerAccount } hasError={ hasError }/>
                                                            </main> }/>

                { /* not authorized */ }
                <Route exact path='/user/:email' render={ () => email !== '' ? '' : <h1>Not logged in</h1>} />

                { /* successful authorization*/ } 
                <Route render={ () => ( email !== '' ? (<main>
                                                            <Route exact path={`/user/${email}`} 
                                                            //  render={ () => <User_ user={ user } /> } />  
                                                                render={props => <Orders_ {...props} user={user} email={email} />  }/>
                                                            <Route exact path={'/store'}
                                                                render={props => <Orders_ {...props} user={user} email='admin@gmail.com'/> } />
                                                            <Route exact path='/favorite'
                                                             render={ props => <FavoriteRecipes_ {...props} user={user} email={ email } /> } />
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