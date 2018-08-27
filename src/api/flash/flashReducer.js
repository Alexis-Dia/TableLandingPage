import {
    ADD_FLASH_MESSAGE,
    DELETE_FLASH_MESSAGE,
    DELETE_ALL_FLASH_MESSAGES,
    DELETE_BY_VALUE_FLASH_MESSAGES,
    MESSAGE_LOG_IN_SUCCESSFULY,
    MESSAGE_GOT_NEW_ALARM
} from './flashActions';

import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
    switch(action.type) {
        case ADD_FLASH_MESSAGE:
            //var index = state.findIndex(flashMessage => flashMessage.text == MESSAGE_LOG_IN_SUCCESSFULY);
            // if (index  >= 0) {
            //     return [
            //         ...state.slice(0, index),
            //         ...state.slice(index + 1)
            //     ];
            // }

/*            if (state.length  !== 0) {
                console.log('ADD_FLASH_MESSAGE 4      ', state.length)
                console.log('ADD_FLASH_MESSAGE 4.1   ', state)
                if (state.data.text === 'You logged in successfuly. Welcome!') {
                    console.log('ADD_FLASH_MESSAGE5      ')
                }
            }*/
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.data.type,
                    text: action.data.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state, { id: action.data });
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return state;

        case DELETE_BY_VALUE_FLASH_MESSAGES:
            const i = findIndex(state, { text: action.data });
            if (i >= 0) {
                return [
                    ...state.slice(0, i),
                    ...state.slice(i + 1)
                ];
            }
            return state;

        case DELETE_ALL_FLASH_MESSAGES:
            state = [];
            return state;

        default: return state;
    }
}