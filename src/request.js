import superagent from 'superagent';
//import storage from '../../utils/storage.js';


const EMPTY_OBJ = {};


export const CONTENT_TYPE_HEADERS = {'Content-Type': 'application/json'};


export function post(url, params, headers = EMPTY_OBJ) {
    return new Promise((resolve, reject) => {
        let req = superagent.post(url).send(params);
        if (headers) {
            req = req.set(headers);
        }
        //requestAddDeviceId(req);
        return req.end((err, res) => {
            if (err || !res.ok) {
                reject(err || res);
            } else {
                resolve(res.body || res.text);
            }
        });
    });
}

export function put(url, params, headers = EMPTY_OBJ) {
    return new Promise((resolve, reject) => {
        let req = superagent.put(url).send(params);
        if (headers) {
            req = req.set(headers);
        }
        //requestAddDeviceId(req);
        return req.end((err, res) => {
            if (err || !res.ok) {
                reject(err || res);
            } else {
                resolve(res.body || res.text);
            }
        });
    });
}

export function deletes(url, params, headers = EMPTY_OBJ) {
    return new Promise((resolve, reject) => {
        let req = superagent.delete(url).send(params);
        if (headers) {
            req = req.set(headers);
        }
        //requestAddDeviceId(req);
        return req.end((err, res) => {
            if (err || !res.ok) {
                reject(err || res);
            } else {
                resolve(res.body || res.text);
            }
        });
    });
}

export function get(url, query, headers = EMPTY_OBJ) {
    return new Promise((resolve, reject) => {
        let req = superagent.get(url).query(query);
        if (headers) {
            req = req.set(headers);
        }
        //requestAddDeviceId(req);
        return req.end((err, res) => {
            if (err || !res.ok) {
                reject(err || res);
            } else {
                resolve(res.body || res.text);
            }
        });
    });
}