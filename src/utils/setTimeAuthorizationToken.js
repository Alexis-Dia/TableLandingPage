import { connect } from 'react-redux';

import {
    SESSION_TIME_IN_SECONDS,
    SECONDS_IN_MINUTE,
    MILLISECONDS_IN_SECOND
    } from '../properties/properties'

export default function setTimeAuthorizationToken () {
    var now = new Date().getTime();

    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if (now - setupTime > SESSION_TIME_IN_SECONDS * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
            window.location.reload();
        } else {
            localStorage.setItem('setupTime', now)
            setupTime = localStorage.getItem('setupTime');
        }
    }
}
