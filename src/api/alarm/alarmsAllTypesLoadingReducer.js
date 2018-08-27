import { ALARM_TYPE_LOAD_ALL, SUCCESS, FAILURE } from './alarmActions';

const initialState = {  };

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case ALARM_TYPE_LOAD_ALL + SUCCESS:
            return { ...action.response, httpStatus: action.response.httpStatus }

        case ALARM_TYPE_LOAD_ALL + FAILURE:
            return { content: [], httpStatus: 500 }

        default: return state;
    }
}