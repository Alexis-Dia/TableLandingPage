import {call, put, takeEvery} from 'redux-saga/effects'

import { eventLoadAlarm } from './eventApi'
import {PAGE_STATUS_200} from '../../properties/properties'
import { EVENT_LOAD_ALARM, SUCCESS, FAILURE } from './eventActions';

export function eventLoadAlarmApi (data) {
    return eventLoadAlarm(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryEventLoadAlarm (data) {
    const { response, error } = yield call(eventLoadAlarmApi, data)
    if (response.httpStatus === PAGE_STATUS_200) {
        yield put({type: EVENT_LOAD_ALARM + SUCCESS, response})
    } else
        yield put({type: EVENT_LOAD_ALARM + FAILURE, response})
}

export function * eventLoadAlarmFetch () {
    yield takeEvery(EVENT_LOAD_ALARM, tryEventLoadAlarm)
}