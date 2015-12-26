class User {
    get fullName () {
        return this._name;
    }
    set fullName (value) {
        this._name = value;
    }
}

export default new User();