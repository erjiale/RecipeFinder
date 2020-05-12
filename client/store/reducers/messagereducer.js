import { GET_MESSAGE, SEND_MESSAGE } from '../constants';

const messageReducer = (state = [], action)=> {
    switch(action.type) {
        case GET_MESSAGE: 
            state = action.message;
            break;
        case SEND_MESSAGE:
            state = [...state, action.message];
            break;
    }
    return state;
};

export default messageReducer;