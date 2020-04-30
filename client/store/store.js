import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

//actions
import { _loadRecipes } from './actions/recipeactions';
import { _login } from './actions/loginactions';
import { _getFavorites, _destroy } from './actions/favoriteactions';
import { _sendMessage } from './actions/messageactions';

//reducers
import recipesReducer from './reducers/recipereducers';
import loginReducer from './reducers/loginreducers';
import favoritesReducer from './reducers/favoritesreducer';
import messageReducer from './reducers/messagereducer';

const loadRecipes = (ingredients = 'chicken and beef and shrimp') => {
    return async dispatch => {
        const recipes = (await axios.get(`/api/recipes/${ingredients}`)).data;
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
        try {
            const token = (await axios.post('/api/user/login', { email, password })).data;
            dispatch(_login(token));
            window.localStorage.setItem('token', token);
        } catch(err) {
            if(err.response && err.response.status === 400) {
                dispatch(null);
            }
        }
    }
};

const signout = () => {
    return async dispatch => dispatch(_login({}));
};

const sendMessage = ({ senderId, receiverId, text }) => {
    return async dispatch => {
        const message = (await axios.post(`/api/messages/${receiverId}`, { senderId, text })).data
        dispatch(_sendMessage(message));
    };
};

const reducer = combineReducers({
    recipes: recipesReducer,
    login: loginReducer,
    favorites: favoritesReducer,
    message: messageReducer
});

const store = createStore(reducer, applyMiddleware(
	thunks,
	createLogger({collapsed: true}),
));


export default store;

export {
    loadRecipes,
    getFavorites,
    sendMessage,
    destroy,
    login,
    signout
};
