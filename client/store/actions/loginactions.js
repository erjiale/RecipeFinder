import { LOGIN } from '../constants';

export const _login = info => {
    return {
        type: LOGIN,
        token: info
    };
}; 