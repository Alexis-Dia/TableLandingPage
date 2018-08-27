import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty';

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER, DELETE_CURRENT_USER, SET_CURRENT_USER_FROM_TOKEN } from './loginActions';
import { UNAUTHORIZED, UNDEFINED, SUCCESS } from './loginActions'
import { INVALID_CREDENTIALS, SERVER_IS_UNREACHABLE} from '../../properties/errors'
import { I18, JWT_TOKEN, ACCESS, USER_NAME, LANGUAGE } from '../../properties/properties'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case SET_CURRENT_USER + SUCCESS:

            const token = action.response.token;
            const access = action.response.access;
            const userName = action.response.userName;
            const language = action.response.language;

            if (token) {
                localStorage.setItem(JWT_TOKEN, token);
                localStorage.setItem(I18, language);
                localStorage.setItem(ACCESS, access);
                localStorage.setItem(USER_NAME, userName);
                localStorage.setItem(LANGUAGE, language);
                setAuthorizationToken(token);
                const user = jwt.decode(token);

                return {
                    isAuthenticated: isEmpty(user.errors),
                    user: user
                }
            }
            return state;

        case SET_CURRENT_USER + UNAUTHORIZED:
            return {
                isAuthenticated: false,
                user: { "errors": INVALID_CREDENTIALS }
            };

        case SET_CURRENT_USER + UNDEFINED:
            return {
                isAuthenticated: false,
                user: { "errors": SERVER_IS_UNREACHABLE }
            };

        case SET_CURRENT_USER_FROM_TOKEN:
            const user = jwt.decode(localStorage.jwtToken);
            return {
                isAuthenticated: isEmpty(user.errors),
                user: user
            }
            return state;

        case DELETE_CURRENT_USER:
            localStorage.removeItem(JWT_TOKEN);
            localStorage.removeItem(I18);
            localStorage.removeItem(ACCESS);
            localStorage.removeItem(USER_NAME);
            localStorage.removeItem(LANGUAGE);
            setAuthorizationToken(false);
            return {
                isAuthenticated: false,
                user: {  }
            };

        default: return state;
    }
}