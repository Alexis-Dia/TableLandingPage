import { apiCall } from '../../services/api/httpsApi'
import { HOSTNAME, PORT, PATH_METHOD_AUTHENTICATE, POST } from '../../properties/properties'

export function fetchAuth (ob) {
    const user = ob.data.user;
    return  apiCall(HOSTNAME, PORT, PATH_METHOD_AUTHENTICATE, POST, user)
}
