import { GET_ORDERS, DESTROY_ORDER } from '../constants';

const ordersReducer = (state = [], action)=> {
    switch(action.type) {
        case GET_ORDERS: 
            state = action.orders;
            break;
        case DESTROY_ORDER:
            state = state.filter(recipe => recipe.uri !== action.recipe.uri);
            break;
	}
  	return state;
};

export default ordersReducer;