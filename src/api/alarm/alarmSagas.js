import {call, put, takeEvery} from 'redux-saga/effects'

import {alarmResolve, alarmTypeLoadAll, fetchAlarm, loadResolvedAlarm} from './alarmApi'
import {PAGE_STATUS_200} from '../../properties/properties'
import {
    ALARM_TYPE_LOAD_ALL,
    FAILURE,
    FETCH_ALARM_DATA,
    LOAD_RESOLVED_ALARM,
    RESOLVE_ALARM,
    SUCCESS
} from './alarmActions';

export function fetchAlarmApi (data) {
    return fetchAlarm(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryAlarmFetch (data) {
        const { response, error } = yield call(fetchAlarmApi, data)
        if (response.httpStatus === PAGE_STATUS_200) {
            yield put({type: FETCH_ALARM_DATA + SUCCESS, response})
        } else
            yield put({type: FETCH_ALARM_DATA + FAILURE, response})
}

export function * alarmFetch () {
    yield takeEvery(FETCH_ALARM_DATA, tryAlarmFetch)
}




export function alarmTypeLoadAllApi (data) {
    return alarmTypeLoadAll(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryAlarmTypeLoadAll (data) {
    const { response, error } = yield call(alarmTypeLoadAllApi, data)
    if (response.httpStatus === PAGE_STATUS_200) {
        yield put({type: ALARM_TYPE_LOAD_ALL + SUCCESS, response})
    } else
        yield put({type: ALARM_TYPE_LOAD_ALL + FAILURE, response})
}

export function * alarmTypeLoadAllFetch () {
    yield takeEvery(ALARM_TYPE_LOAD_ALL, tryAlarmTypeLoadAll)
}




export function alarmResolveApi (data) {
    return alarmResolve(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryAlarmResolve (data) {
    const { response, error } = yield call(alarmResolveApi, data)
    if (response.httpStatus === PAGE_STATUS_200) {
        yield put({type: RESOLVE_ALARM + SUCCESS, response})
    } else
        yield put({type: RESOLVE_ALARM + FAILURE, response})
}

export function * alarmResolveFetch () {
    yield takeEvery(RESOLVE_ALARM, tryAlarmResolve)
}




export function loadResolvedAlarmApi (data) {
    return loadResolvedAlarm(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryLoadResolvedAlarm (data) {
    const { response, error } = yield call(loadResolvedAlarmApi, data)
    if (response.httpStatus === PAGE_STATUS_200) {
        yield put({type: LOAD_RESOLVED_ALARM + SUCCESS, response})
    } else
        yield put({type: LOAD_RESOLVED_ALARM + FAILURE, response})
}

export function * resolvedAlarmFetch () {
    yield takeEvery(LOAD_RESOLVED_ALARM, tryLoadResolvedAlarm)
}