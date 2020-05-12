import { GET_FAVORITES, DESTROY_FAVORITE, ADD_FAVORITE } from '../constants';

const favoritesReducer = (state = [], action)=> {
    switch(action.type) {
        case GET_FAVORITES: 
            state = action.favorites;
            break;
        case DESTROY_FAVORITE:
            state = state.filter(recipe => recipe.uri !== action.recipe.uri);
            break;
        case ADD_FAVORITE:
            // state = [...state].push([action.recipe]);
            state = [...state, action.recipe];
            break;
	}
  	return state;
};

export default favoritesReducer;