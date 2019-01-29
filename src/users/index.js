import {
    post,
    put,
    get,
    deletes,
    headersAddBearerToken,
    CONTENT_TYPE_HEADERS
} from '../request.js';
import Api from '../Api'


const USERS_TOKENS = "users/tokens";

export default class Users extends Api {
    constructor(props){
        super(props);
    }

    getTokens(props = {}) {
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return get(`${this.endpoint}/${USERS_TOKENS}/`, props, headers)
            .then(body => {
                return body
            });
    }

    addToken(props) {
        const headers = {
            Authorization: `Token ${this.token}`
        };

        return post(`${this.endpoint}/login/permanent/`, props, headers)
            .then(body => {
                return body
            });
    }

    updateToken(source) {
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return put(`${this.endpoint}/${USERS_TOKENS}/${source.id}/`, source, headers)
            .then(body => {
                return body
            });
    }

    deleteToken(id) {
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return deletes(`${this.endpoint}/${USERS_TOKENS}/${id}/`, {}, headers)
            .then(body => {
                return body
            });
    }

    deleteTokens({permanent}) {
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return deletes(`${this.endpoint}/${USERS_TOKENS}/`, {permanent}, headers)
            .then(body => {
                return body
            });
    }
}

