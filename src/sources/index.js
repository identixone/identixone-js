import {
    post,
    put,
    get,
    deletes,
    headersAddBearerToken,
    CONTENT_TYPE_HEADERS
} from '../request.js';
import Api from '../Api'

const SOURCES = "sources";


export default class Sources extends Api {
    constructor(props) {
        super(props);
    }

    getSources() {
        const headers = headersAddBearerToken(this.token);
        return get(`${this.endpoint}/${SOURCES}/`, null, headers)
            .then(body => {
                return body
            });
    }
    
    addSource(props) {
        const headers = headersAddBearerToken(this.token);
        return post(`${this.endpoint}/${SOURCES}/`, props, headers)
            .then(body => {
                return body
            });
    }
    
    updateSource(source) {
        const headers = headersAddBearerToken(this.token);
        return put(`${this.endpoint}/${SOURCES}/${source.id}/`, source, headers)
            .then(body => {
                return body
            });
    }

    deleteSource(id) {
        const headers = headersAddBearerToken(this.token);
        return deletes(`${this.endpoint}/${SOURCES}/${id}/`, {}, headers)
            .then(body => {
                return body
            });
    }

}
