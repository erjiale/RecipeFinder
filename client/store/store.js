import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

//actions
import { _loadRecipes } from './actions/recipeactions';
import { _login } from './actions/loginactions';
import { _getFavorites, _destroy } from './actions/favoriteactions';

//reducers
import recipesReducer from './reducers/recipereducers';
import loginReducer from './reducers/loginreducers';
import favoritesReducer from './reducers/favoritesreducer';


const API_ID = "41d54d75"
const API_KEY = "dd6be63ef848ed24366c0340af7d0759"

const loadRecipes = ingredients => {
    return async dispatch => {
        const recipes = (await axios.get(`https://api.edamam.com/search?q=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}`)).data.hits
        dispatch(_loadRecipes(recipes));
	};
};

const getFavorites = email => {
    return async dispatch => {
        const foods = (await axios.get(`/api/user/${email}/favorites`)).data.favorites;
        dispatch(_getFavorites(foods));
    };
};

const destroy = (recipe, email) => {
    return async dispatch => {
        await axios.delete(`/api/user/${email}/favorites/${encodeURIComponent(recipe.uri)}`);
        dispatch(_destroy(recipe));
    }
};

const login = info => {
    return async dispatch => {
        const { email, password } = info;
        const token = (await axios.post('/api/user/login', { email, password })).data;
        window.localStorage.setItem('token', token);
        dispatch(_login(token));
    }
};

const signout = () => {
    return async dispatch => dispatch(_login({}));
};

const reducer = combineReducers({
    recipes: recipesReducer,
    login: loginReducer,
    favorites: favoritesReducer
});

const store = createStore(reducer, applyMiddleware(
	thunks,
	createLogger({collapsed: true}),
));


export default store;

export {
    loadRecipes,
    getFavorites,
    destroy,
    login,
    signout
};
