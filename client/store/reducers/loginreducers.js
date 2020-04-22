import { LOGIN } from '../constants';

const loginReducer = (state = [], action)=> {
    switch(action.type) {
        case LOGIN:
            state = action.token;
            break;
	}
  	return state;
};

export default loginReducer;