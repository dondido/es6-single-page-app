export default class User {
    static get account() {
        return this._account;
    }
    static set account(value) {
        this._account = value;
    }
}