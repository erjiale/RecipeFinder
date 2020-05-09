import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

//actions
import { _loadRecipes } from './actions/recipeactions';
import { _login } from './actions/loginactions';
import { _getFavorites, _destroy, _addFavorite } from './actions/favoriteactions';
import { _getOrders, _destroyOrder } from './actions/orderactions';

//reducers
import recipesReducer from './reducers/recipereducers';
import loginReducer from './reducers/loginreducers';
import favoritesReducer from './reducers/favoritesreducer';
import ordersReducer from './reducers/ordersreducer';

const loadRecipes = (ingredients = 'lobster sauce wine') => {
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

const addFavorite = (recipe, email) => {
    return async dispatch => {
        await axios.post(`/api/user/${email}/favorites`, {favoriteObj: recipe});
        dispatch(_addFavorite(recipe));
    }
};

const getOrders = email => {
    return async dispatch => {
        const food = (await axios.get(`/api/user/${email}/orders`)).data.orders;
        dispatch(_getOrders(food));
    };
};

const destroyOrder = (recipe, email) => {
    return async dispatch => {
        await axios.delete(`/api/user/${email}/orders/${encodeURIComponent(recipe.uri)}`);
        dispatch(_destroyOrder(recipe));
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
                // window.localStorage.removeItem('token');
                dispatch(null);
            }
        }
    }
};

const signout = () => {
    return async dispatch => dispatch(_login({}));
};

const reducer = combineReducers({
    recipes: recipesReducer,
    login: loginReducer,
    favorites: favoritesReducer,
    orders: ordersReducer
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
    addFavorite,
    login,
    signout,
    getOrders,
    destroyOrder
};
