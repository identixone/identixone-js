export default class Api {
    constructor({token, endpoint}){
        this.token = token;
        this.endpoint = endpoint
    }

    setToken(token) {
        this.token = token
    }
}