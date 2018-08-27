import { LOAD_RESOLVED_ALARM, SUCCESS } from './alarmActions';

const initialState = {
    resolved: null
};

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case LOAD_RESOLVED_ALARM + SUCCESS:
            return {
                ...state,
                resolved: action.response.result
            };

        default:
            return state;
    }
}