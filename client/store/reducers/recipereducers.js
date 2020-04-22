import { LOAD_RECIPES } from '../constants';

const recipesReducer = (state = [], action)=> {
    switch(action.type) {
        case LOAD_RECIPES:
            state = action.recipes;
            break;
	}
  	return state;
};

export default recipesReducer;