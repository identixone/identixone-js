import {
    post,
    put,
    get,
    deletes,
    headersAddBearerToken,
    CONTENT_TYPE_HEADERS
} from '../request.js';
import Api from '../Api'

const SETTINGS_NOTIFICATIONS = "settings/notifications"

export default class Notifications extends Api {
    constructor(props){
        super(props);
    }

    getNotifications() {
        //const deviceInfo = getBrowserFingerprint();
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return get(`${this.endpoint}/${SETTINGS_NOTIFICATIONS}/`, null, headers)
            .then(body => {
                return body
            });
    }
    addNotification(props) {

        const headers = {
            Authorization: `Token ${this.token}`
        };

        return post(`${this.endpoint}/${SETTINGS_NOTIFICATIONS}/`, props, headers)
            .then(body => {
                return body
            });
    }

    updateNotification(source) {
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return put(`${this.endpoint}/${SETTINGS_NOTIFICATIONS}/${source.id}/`, source, headers)
            .then(body => {
                return body
            });
    }

    deleteNotification(id) {
        const headers = {
            Authorization: `Token ${this.token}`
        };
        return deletes(`${this.endpoint}/${SETTINGS_NOTIFICATIONS}/${id}/`, {}, headers)
            .then(body => {
                return body
            });
    }

}