import { fork } from 'redux-saga/effects'
import {
    alarmFetch,
    alarmTypeLoadAllFetch,
    alarmResolveFetch,
    resolvedAlarmFetch
} from '../api/alarm/alarmSagas'

export default function* rootSaga() {
    yield [
        fork(alarmFetch),
        fork(alarmTypeLoadAllFetch),
        fork(alarmResolveFetch),
        fork(resolvedAlarmFetch),
    ]
}
