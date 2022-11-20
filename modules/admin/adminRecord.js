const bcrypt = require('bcryptjs');

module.exports = class adminRecord{
    constructor(obj) {
        this.email = obj.login;
        this.password = obj.password;
        this.role = obj.role;
        this.date = obj.date;
    };

    register() {


    }
    login(){

    };
}