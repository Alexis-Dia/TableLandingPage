import { SET_LANG } from './langActions'
import {
    LANGUAGE_DEFAULT
} from '../../properties/properties'

const initialState = {
    value: LANGUAGE_DEFAULT,
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case SET_LANG:
            return { value: action.data };

        default: return state;
    }
}