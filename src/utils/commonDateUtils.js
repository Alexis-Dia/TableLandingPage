import * as moment from 'moment';
import timezone from 'moment-timezone';
import {
    UTC_FORMAT,
    UTC_MIN_TIME_DATA,
    MINUTES,
    TWO_HOURS_OFFSET_IN_MINUTES,
    SIX_HOURS_OFFSET_IN_MINUTES,
    TWENY_FOUR_HOURS_OFFSET_IN_MINUTES,
    WEEK_OFFSET_IN_MINUTES,
} from '../properties/properties'

export function substringToPattern(iso8601) {
    if (iso8601.length > 19) {
        return iso8601.substring(0, 19)
    }
    return ''
}

export function dateIsValid(iso8601) {
    var userDate = ''
    try {
        userDate = new Date(iso8601)
        console.log('iso8601 ', iso8601)
        if (iso8601.length === 19) {
            if (moment.tz(iso8601, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
                console.log('iso8601 = ok ', userDate)
                return true
            }
            return false
        }
        return false
    }
    catch (error) {
        console.log('iso8601 = err ', userDate)
        return false
    }
}

export function convertToLocalDateTime(dateAndTime, pattern) {
    var localTime = moment.utc(dateAndTime).tz(timezone.tz.guess()).format(pattern)
    return localTime
}

export function convertToUTCDateTime(dateAndTime, pattern) {
    console.log('initial time = ', dateAndTime)
    var date = new Date(dateAndTime);
    var offset = date.getTimezoneOffset()
    var utcTime = moment(date).add(offset, MINUTES).format(pattern)
    if (moment.tz(utcTime, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
        console.log('utc time = ', utcTime)
        return utcTime
    }
    return UTC_MIN_TIME_DATA

}

export function getUTCDateTimeWith2hOffset(pattern) {
    var currentDate = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ')
    console.log('initial time = ', currentDate)
    var date = new Date(currentDate);
    var offset = date.getTimezoneOffset() + TWO_HOURS_OFFSET_IN_MINUTES
    console.log('initial offset = ', offset)
    var utcTime = moment(date).add(offset, MINUTES).format(pattern)
    if (moment.tz(utcTime, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
        console.log('initial utc time = ', utcTime)
        return utcTime
    }
    return UTC_MIN_TIME_DATA
}

export function getUTCDateTimeWith6hOffset(pattern) {
    var currentDate = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ')
    console.log('initial time = ', currentDate)
    var date = new Date(currentDate);
    var offset = date.getTimezoneOffset() + SIX_HOURS_OFFSET_IN_MINUTES
    console.log('initial offset = ', offset)
    var utcTime = moment(date).add(offset, MINUTES).format(pattern)
    if (moment.tz(utcTime, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
        console.log('initial utc time = ', utcTime)
        return utcTime
    }
    return UTC_MIN_TIME_DATA
}

export function getUTCDateTimeWith24hOffset(pattern) {
    var currentDate = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ')
    console.log('initial time = ', currentDate)
    var date = new Date(currentDate);
    var offset = date.getTimezoneOffset() + TWENY_FOUR_HOURS_OFFSET_IN_MINUTES
    console.log('initial offset = ', offset)
    var utcTime = moment(date).add(offset, MINUTES).format(pattern)
    if (moment.tz(utcTime, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
        console.log('initial utc time = ', utcTime)
        return utcTime
    }
    return UTC_MIN_TIME_DATA
}

export function getUTCDateTimeWithWeekOffset(pattern) {
    var currentDate = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ')
    console.log('initial time = ', currentDate)
    var date = new Date(currentDate);
    var offset = date.getTimezoneOffset() + WEEK_OFFSET_IN_MINUTES
    console.log('initial offset = ', offset)
    var utcTime = moment(date).add(offset, MINUTES).format(pattern)
    if (moment.tz(utcTime, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
        console.log('initial utc time = ', utcTime)
        return utcTime
    }
    return UTC_MIN_TIME_DATA
}

export function convertDateFromMaterialWidget(dateFromFilter) {
    let date = dateFromFilter.getFullYear() + '-' +
        (('0' + (dateFromFilter.getMonth() + 1)).slice(-2)) + '-' +
        ('0' + dateFromFilter.getDate()).slice(-2)
    return date
}

export function convertTimeFromMaterialWidget(timeFromFilter) {
    let time = ('0' + timeFromFilter.getHours()).slice(-2) + ':' +
        ('0' + timeFromFilter.getMinutes()).slice(-2) + ':00'
    return time
}

export function convertDateTimeFromMaterialWidget(dateTimeFromFilter) {
    let time = dateTimeFromFilter.getFullYear() + '-' +
        (('0' + (dateTimeFromFilter.getMonth() + 1)).slice(-2)) + '-' +
        ('0' + dateTimeFromFilter.getDate()).slice(-2) + ' ' +
        ('0' + dateTimeFromFilter.getHours()).slice(-2) + ':' +
        ('0' + dateTimeFromFilter.getMinutes()).slice(-2) + ':00'
    return time
}
