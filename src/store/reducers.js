import {combineReducers} from 'redux'
import locationReducer from './location'

import alarmReducer from '../api/alarm/alarmReducer'
import alarmsFilteringAndOrderingReducer from '../api/alarm/alarmsFilteringAndOrderingReducer'
import alarmLoadResolvedReducer from '../api/alarm/alarmLoadResolvedReducer'
import allAlarmsTypesLoadingReducer from '../api/alarm/alarmsAllTypesLoadingReducer'
import resolveAlarmsReducer from '../api/alarm/alarmResolveReducer'

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        alarms: alarmReducer,
        alarmsFilteringAndOrdering: alarmsFilteringAndOrderingReducer,
        allLoadedAlarmTypes: allAlarmsTypesLoadingReducer,
        resolved: resolveAlarmsReducer,
        loadedAlarm: alarmLoadResolvedReducer,
        ...asyncReducers
    })
}

export const injectReducer = (store, {key, reducer}) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
