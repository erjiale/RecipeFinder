import { GET_ORDERS, DESTROY_ORDER } from '../constants';

export const _getOrders = orders => {
    return {
        type: GET_ORDERS,
        orders: orders || []
    };
};

export const _destroyOrder = recipe => {
    return {
        type: DESTROY_ORDER,
        recipe: recipe
    };
};