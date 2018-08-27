import * as moment from 'moment';
import timezone from 'moment-timezone';
import {UTC_FORMAT} from '../properties/properties'
import { convertToUTCDateTime } from '../utils/commonDateUtils'
import meanBy from 'lodash/meanBy';

const getNextIdx = (idx, length, direction) => {
    switch (direction) {
        case 'next': return (idx + 1) % length;
        case 'prev': return (idx == 0) && length - 1 || idx - 1;
        default:     return idx;
    }
}

const getNewIndexAndRender = (direction, idx) => {
    const length = 3;
    idx = getNextIdx(idx, length, direction);
    switch (idx) {
        case -1: return -1;
        case 0: return 0;
        case 1: return 1;
        default: return -1;
    }
}

export function getOrderingState(direction, idx) {
    return getNewIndexAndRender(direction, idx )
}

export function orderingBuilder(state, flag = '', idx = -1) {
    var orderingArr = []

     if (flag === 'stockStatus') {
        if (idx === 0) {
            orderingArr.push({
                "property": "stockStatus",
                "priority": state.stockStatusPriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "stockStatus",
                "priority": state.stockStatusPriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.stockStatusOrdering === 0) {
            orderingArr.push({
                "property": "stockStatus",
                "priority": state.stockStatusPriority,
                "direction": "ASC"
            })
        }
        if (state.stockStatusOrdering === 1) {
            orderingArr.push({
                "property": "stockStatus",
                "priority": state.stockStatusPriority,
                "direction": "DESC"
            })
        }
    }

    if (flag === 'brand') {
        if (idx === 0) {
            orderingArr.push({
                "property": "brand",
                "priority": state.brandPriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "brand",
                "priority": state.brandPriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.brandOrdering === 0) {
            orderingArr.push({
                "property": "brand",
                "priority": state.brandPriority,
                "direction": "ASC"
            })
        }
        if (state.brandOrdering === 1) {
            orderingArr.push({
                "property": "brand",
                "priority": state.brandPriority,
                "direction": "DESC"
            })
        }
    }

    if (flag === 'model') {
        if (idx === 0) {
            orderingArr.push({
                "property": "model",
                "priority": state.modelPriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "model",
                "priority": state.modelPriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.modelOrdering === 0) {
            orderingArr.push({
                "property": "model",
                "priority": state.modelPriority,
                "direction": "ASC"
            })
        }
        if (state.modelOrdering === 1) {
            orderingArr.push({
                "property": "model",
                "priority": state.modelPriority,
                "direction": "DESC"
            })
        }
    }

    if (flag === 'selectedOptions') {
        if (idx === 0) {
            orderingArr.push({
                "property": "selectedOptions",
                "priority": state.selectedOptionsPriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "selectedOptions",
                "priority": state.selectedOptionsPriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.selectedOptionsOrdering === 0) {
            orderingArr.push({
                "property": "selectedOptions",
                "priority": state.selectedOptionsPriority,
                "direction": "ASC"
            })
        }
        if (state.selectedOptionsOrdering === 1) {
            orderingArr.push({
                "property": "selectedOptions",
                "priority": state.selectedOptionsPriority,
                "direction": "DESC"
            })
        }
    }

    if (flag === 'price') {
        if (idx === 0) {
            orderingArr.push({
                "property": "price",
                "priority": state.pricePriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "price",
                "priority": state.pricePriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.priceOrdering === 0) {
            orderingArr.push({
                "property": "price",
                "priority": state.pricePriority,
                "direction": "ASC"
            })
        }
        if (state.priceOrdering === 1) {
            orderingArr.push({
                "property": "price",
                "priority": state.pricePriority,
                "direction": "DESC"
            })
        }
    }

    if (flag === 'rating') {
        if (idx === 0) {
            orderingArr.push({
                "property": "rating",
                "priority": state.ratingPriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "rating",
                "priority": state.ratingPriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.ratingOrdering === 0) {
            orderingArr.push({
                "property": "rating",
                "priority": state.ratingPriority,
                "direction": "ASC"
            })
        }
        if (state.ratingOrdering === 1) {
            orderingArr.push({
                "property": "rating",
                "priority": state.ratingPriority,
                "direction": "DESC"
            })
        }
    }

    if (flag === 'dateEntree') {
        if (idx === 0) {
            orderingArr.push({
                "property": "dateEntree",
                "priority": state.dateEntreePriority,
                "direction": "ASC"
            })
        } if (idx === 1) {
            orderingArr.push({
                "property": "dateEntree",
                "priority": state.dateEntreePriority,
                "direction": "DESC"
            })
        }
    } else {
        if (state.dateEntreeOrdering === 0) {
            orderingArr.push({
                "property": "dateEntree",
                "priority": state.dateEntreePriority,
                "direction": "ASC"
            })
        }
        if (state.dateEntreeOrdering === 1) {
            orderingArr.push({
                "property": "dateEntree",
                "priority": state.dateEntreePriority,
                "direction": "DESC"
            })
        }
    }

    return orderingArr
}

export function interceptDateTime(obj) {

    if (obj !== undefined) {
        if (typeof obj.alarmDateTo !== 'undefined') {
            if (moment.tz(obj.alarmDateTo, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
                var alarmDateToUTC = convertToUTCDateTime(obj.alarmDateTo, UTC_FORMAT)
                obj.alarmDateTo = alarmDateToUTC
            }
        }

        if (typeof obj.alarmDateFrom !== 'undefined') {
            if (moment.tz(obj.alarmDateFrom, UTC_FORMAT, true, timezone.tz.guess()).isValid()) {
                var alarmDateFromUTC = convertToUTCDateTime(obj.alarmDateFrom, UTC_FORMAT)
                obj.alarmDateFrom = alarmDateFromUTC
                return obj
            }
        }
    }

    return obj
}

export function getAverageLat (markers) {
    return _.meanBy(markers, (p) => p.latitude);
}

export function getAverageLng (markers) {
    return _.meanBy(markers, (p) => p.longitude);
}