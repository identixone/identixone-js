import {
    post,
    headersAddBearerToken,
    CONTENT_TYPE_HEADERS,
    deletes
} from '../request.js';

import Api from '../Api'

export default class Auth extends Api {
    constructor(props){
        super(props);
    }

    login(username, password) {
        return post(`${this.endpoint}/login/`, {username, password})
            .then(body => {
                return {
                    token: body.token,
                    user: body.user
                };
            });
    }

    generateToken() {
        const headers = {
            Authorization: `Token ${this.token}`
        };

        return post(`${this.endpoint}/login/`, null, headers)
            .then(body => {
                return {
                    token: body.token,
                    user: body.user
                };
            });
    }

    logout(tokenId) {
        const headers = {
            Authorization: `Token ${this.token}`
        };

        return deletes(
            `${this.endpoint}/users/tokens/${tokenId}/`,
            JSON.stringify(''),
            headers
        );
    }
}