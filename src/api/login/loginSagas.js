import { takeEvery, call, put } from 'redux-saga/effects'

import { fetchAuth } from './loginApi'
import { SET_CURRENT_USER, UNAUTHORIZED, UNDEFINED, SUCCESS } from './loginActions'
import { PAGE_STATUS_500, PAGE_STATUS_UNDEFINED, FR, I18 } from '../../properties/properties'

export function fetchAuthApi (data) {
    return fetchAuth(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function* tryFetchAuth(data) {
    const {response, error} = yield call(fetchAuthApi, data)
    if (typeof response === PAGE_STATUS_UNDEFINED) {
    }
    if (typeof response === PAGE_STATUS_UNDEFINED) {
        yield put({type: SET_CURRENT_USER + UNDEFINED, response})
    } else if (response.httpStatus === PAGE_STATUS_500) {
        yield put({type: SET_CURRENT_USER + UNAUTHORIZED, response})
    }
    else
        localStorage.setItem(I18, FR);
        yield put({type: SET_CURRENT_USER + SUCCESS, response})
}

export function * loginAuthFetch () {
    yield takeEvery(SET_CURRENT_USER, tryFetchAuth)
}
