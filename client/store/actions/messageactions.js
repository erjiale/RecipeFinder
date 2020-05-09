import { SEND_MESSAGE } from '../constants';

export const _sendMessage = (message)=> {
    return {
      type: SEND_MESSAGE,
      message
    };
};