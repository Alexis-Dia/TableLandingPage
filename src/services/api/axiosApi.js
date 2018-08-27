import axios from 'axios'
const project = require('../../../project.config')

import {APPLICATION_JSON, BEARER, JSON, PAGE_STATUS_200, PAGE_STATUS_500, DELIMITER, HTTPS} from '../../properties/properties'

export function apiCall (url, method, body, callback) {
    const options = {
        method: method,
        url: url,
        headers: {
            'Content-Type': APPLICATION_JSON,
        },
        responseType: JSON
    }
    if (body) {
        options.data = JSON.stringify(body)
    }
    return axios(options)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error
        })
}

export function apiCallForLoggedUserLoadImages (hostname, port, pathMethod, method) {

    if (project.env !== 'development') {
        hostname = window.location.hostname
    }

    var url = HTTPS + hostname + DELIMITER + port + pathMethod

    const options = {
        method: method,
        url: url,
        headers: {
            'Authorization': BEARER + localStorage.jwtToken,
        },
        responseType: JSON
    };

    return axios(options)
        .then(response => {
            return { 'httpStatus': PAGE_STATUS_200, 'result': response.data }
        })
        .catch(error => {
            console.error('axiosApi error = ', error);
            return  { 'httpStatus': PAGE_STATUS_500}
        })
}
export function apiCallForLoggedUserUploadImage (hostname, port, pathMethod, method, body = {data: {}}) {

    if (project.env !== 'development') {
        hostname = window.location.hostname
    }

    var url = HTTPS + hostname + DELIMITER + port + pathMethod

    const options = {
        method: method,
        url: url,
        headers: {
            'Authorization': BEARER + localStorage.jwtToken,
        },
        responseType: JSON
    };

    if (body) {
        options.data = body.data
    }
    return axios(options)
        .then(response => {
            return { 'httpStatus': PAGE_STATUS_200, 'result': response.data }
        })
        .catch(error => {
            console.error('axiosApi error = ', error);
            return  { 'httpStatus': PAGE_STATUS_500}
        })
}

export function apiCallForLoggedUserRemoveImage (hostname, port, pathMethod, method) {

    if (project.env !== 'development') {
        hostname = window.location.hostname
    }

    var url = HTTPS + hostname + DELIMITER + port + pathMethod

    const options = {
        method: method,
        url: url,
        headers: {
            'Authorization': BEARER + localStorage.jwtToken,
        },
        responseType: JSON
    };

    return axios(options)
        .then(response => {
            return { 'httpStatus': PAGE_STATUS_200, 'result': response.data }
        })
        .catch(error => {
            console.error('axiosApi error = ', error);
            return  { 'httpStatus': PAGE_STATUS_500}
        })
}

