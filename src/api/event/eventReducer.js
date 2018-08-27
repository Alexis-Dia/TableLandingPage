import { EVENT_LOAD_ALARM, EVENT_LOAD_ALARM_DEFAULT, SUCCESS } from './eventActions'

const initialState = {
    eventLoadedAlarm: null,
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case EVENT_LOAD_ALARM + SUCCESS:
            return { eventLoadedAlarm: action.response.result, httpStatus: action.response.httpStatus };

        case EVENT_LOAD_ALARM_DEFAULT:
            return { eventLoadedAlarm: null };

        default: return state;
    }
}