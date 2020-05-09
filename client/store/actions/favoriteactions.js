import { DESTROY_FAVORITE, GET_FAVORITES, ADD_FAVORITE } from '../constants';

export const _getFavorites = favorites => {
    return {
        type: GET_FAVORITES,
        favorites: favorites || []
    };
};

export const _destroy = recipe => {
    return {
        type: DESTROY_FAVORITE,
        recipe: recipe
    };
};

export const _addFavorite = recipe => {
    return {
        type: ADD_FAVORITE,
        recipe
    };
};