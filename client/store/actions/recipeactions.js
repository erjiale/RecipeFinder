import { LOAD_RECIPES } from '../constants';

export const _loadRecipes = recipes => {
	return {
        type: LOAD_RECIPES,
        recipes: recipes
	}
};
