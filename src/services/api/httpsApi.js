import https from 'https'
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { PAGE_STATUS_200, PAGE_STATUS_500, APPLICATION_JSON, BEARER, ENCODING_UTF8 } from '../../properties/properties'
const project = require('../../../project.config')

export function apiCall (hostname, port, pathMethod, method, body) {

    console.log('body = ', body)

    if (project.env !== 'development') {
        hostname = window.location.hostname
    }

    var postData = JSON.stringify({
        'username' : body.username,
        'password': body.password
    });

    var options = {
        hostname: hostname,
        port: port,
        path: pathMethod,
        method: method,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,DELETE,PUT,HEAD',
            'Access-Control-Max-Age': '3600'
            //'Content-Length': Buffer.byteLength(postData)
        },
        rejectUnauthorized: false,
        agent: false,
        requestCert: false

    };

    return new Promise(function(resolve, reject) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var req = https.request(options, function(res) {
            res.setEncoding(ENCODING_UTF8);

            res.on('data', function(result) {

                try {
                    const obj = JSON.parse(result);
                    resolve({
                        'httpStatus': PAGE_STATUS_200,
                        'token': obj.token,
                        'access': obj.access,
                        'userName': obj.userName,
                        'language': obj.language.toUpperCase(),
                    });
                }
                catch(error) {
                    console.error(error);
                    resolve(resolve({ 'httpStatus': PAGE_STATUS_500 }));
                }

            });

            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', function(err) {
            console.log(`problem with request: ${err.message}`);
            reject(err);
        });

        if (postData) {
            req.write(postData);
        }

        req.end();
    });
}

export function apiCallForLoggedUser (hostname, port, pathMethod, method, body = {data: {}}) {

    console.log('body = ', body)

    if (project.env !== 'development') {
        hostname = window.location.hostname
    }

    var postData = JSON.stringify(
        body.data
    );

    var options = {
        hostname: hostname,
        port: port,
        path: pathMethod,
        method: method,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER + localStorage.jwtToken,
            'dataType': 'jsonp',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,DELETE,PUT,HEAD',
            'Access-Control-Max-Age': '3600'
        },
        rejectUnauthorized: false,
        agent: false,
        requestCert: false

    };

    console.log('options: ', options)

    return new Promise(function(resolve, reject) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var req = https.request(options, function(res) {
            res.setEncoding(ENCODING_UTF8);

            res.on('data', function(result) {

                let token = res.headers["access-token"]
                console.log('httpsApi token = ', token)
                if (token === undefined) {
                    //localStorage.clear()
                    //window.location.reload()
                } else {
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationToken(token);
                }

                try {
                    const obj = JSON.parse(result);
                    console.log('nextprops = ', obj)
                    resolve({ 'httpStatus': PAGE_STATUS_200, 'result': obj });
                }
                catch(error) {
                    console.error('httpsApi error = ', error);
                    resolve(resolve({ 'httpStatus': PAGE_STATUS_500 }));
                }

            });

            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', function(err) {
            console.log(`problem with request: ${err.message}`);
            reject(err);
        });

        if (postData) {
            req.write(postData);
        }

        req.end();
    });
}

//https://github.com/infinitered/apisauce/issues/110
//https://stackoverflow.com/questions/42169906/nodejs-make-https-request-sending-json-data