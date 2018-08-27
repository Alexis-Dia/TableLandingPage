import {apiCallForLoggedUser} from '../../services/api/httpsApi'
import { HOSTNAME, PORT, PATH_METHOD_EVENT_LOAD_ALARM, POST } from '../../properties/properties'

export function eventLoadAlarm (ob) {
    const result =  apiCallForLoggedUser(HOSTNAME, PORT, PATH_METHOD_EVENT_LOAD_ALARM + ob.data, POST)
    return result
}
