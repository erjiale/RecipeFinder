import { DESTROY_FAVORITE, GET_FAVORITES } from '../constants';

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