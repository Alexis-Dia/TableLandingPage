import { FETCH_ALARM_DATA, SUCCESS, FAILURE } from './alarmActions';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case FETCH_ALARM_DATA + SUCCESS:
            return { ...action.response.result, httpStatus: action.response.httpStatus }

        case FETCH_ALARM_DATA + FAILURE:
            return { content: [], httpStatus: 500 }

        default: return state;
    }
}