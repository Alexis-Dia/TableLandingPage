import {RESOLVE_ALARM, SUCCESS, FAILURE} from './alarmActions';

const initialState = {
    alarm: ''
};

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case RESOLVE_ALARM + SUCCESS:
            return {
                ...state,
                alarm: action.response.result.alarmDate +
                ', ' + action.response.result.alarmType +
                ', ' + action.response.result.batteryVoltage
            };

        default:
            return state;
    }
}