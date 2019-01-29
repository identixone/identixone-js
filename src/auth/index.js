import {
    post,
    deletes,
    headersAddBearerToken
} from '../request.js';

import Api from '../Api'

/**
 * Authorization Identix api.
 */
export default class Auth extends Api {
    constructor(props){
        super(props);
    }

    /**
     * @param {string} username - user name.
     * @param {string} password - user password.
     * @return {Promise} Promise object represents the response object
     */
    login(username, password) {
        return post(`${this.endpoint}/login/`, {username, password})
            .then(body => {
                return {
                    token: body.token,
                    user: body.user
                };
            });
    }

    /**
     * @return {Promise} Promise object represents the response object
     */
    generateToken() {
        const headers = headersAddBearerToken(this.token);
        return post(`${this.endpoint}/login/`, null, headers)
            .then(body => {
                return {
                    token: body.token,
                    user: body.user
                };
            });
    }

    /**
     * @param {string} username - user name.
     * @param {string} password - user password.
     * @return {Promise} Promise object represents the response object
     */
    generatePermanentToken(username, password) {
        const headers = headersAddBearerToken(this.token);
        return post(`${this.endpoint}/login/permanent/`,  {username, password}, headers)
            .then(body => {
                return {
                    token: body.token,
                    user: body.user
                };
            });
    }

    //TODO: save auth tokenId and add by default into this logout
    /**
     * @param {string} tokenId - token id (got it with login response).
     * @return {Promise} Promise object represents the response object
     */
    logout(tokenId) {
        const headers = headersAddBearerToken(this.token);
        return deletes(
            `${this.endpoint}/users/tokens/${tokenId}/`,
            JSON.stringify(''),
            headers
        );
    }
}