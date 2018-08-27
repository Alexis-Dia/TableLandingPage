import { SET_CURRENT_USER_FROM_TOKEN } from '../../src/api/login/loginActions';

export default function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER_FROM_TOKEN,
        user
    };
}