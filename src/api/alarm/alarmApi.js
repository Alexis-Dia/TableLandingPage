import {apiCallForLoggedUser} from '../../services/api/httpsApi'
import {
    HOSTNAME,
    PATH_METHOD_ALARM_LOAD,
    PATH_METHOD_ALARM_RESOLVE,
    PATH_METHOD_ALARM_TYPE_LOAD_ALL,
    PATH_METHOD_LOAD_RESOLVED_ALARM,
    PORT,
    POST
} from '../../properties/properties'

export function fetchAlarm (ob) {
    const result =  apiCallForLoggedUser(HOSTNAME, PORT, '/product/load', POST, ob)
    return result
}

export function alarmTypeLoadAll (ob) {
    const result =  apiCallForLoggedUser(HOSTNAME, PORT, PATH_METHOD_ALARM_TYPE_LOAD_ALL, POST, ob)
    return result
}

export function alarmResolve(ob) {
    const result =  apiCallForLoggedUser(HOSTNAME, PORT, PATH_METHOD_ALARM_RESOLVE, POST, ob)
    return result
}

export function loadResolvedAlarm(ob) {
    const result =  apiCallForLoggedUser(HOSTNAME, PORT, PATH_METHOD_LOAD_RESOLVED_ALARM + ob.data, POST)
    return result
}
