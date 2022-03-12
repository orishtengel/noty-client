const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class AuthApi {
    login(username, password) {
        console.log(username)
        return ApiCore.fetch('/auth/signin', HTTPMethod.POST, {
            email: username,
            password: password
        })
    }
    
    verifyToken(idToken, email) {
        return ApiCore.fetch('/auth/verify', HTTPMethod.POST, {
            idToken: idToken,
            email: email
        })
    }

    signup(username, password, name, phone) {
        return ApiCore.fetch('/auth/signup', HTTPMethod.POST, {
            email: username,
            password: password,
            name: name,
            phone: phone
        })
    }
    createUser(username, name, phone) {
        return ApiCore.fetch('/auth/createUser', HTTPMethod.POST, {
            email: username,
            name: name,
            phone: phone
        })
    }

    getUser() {
        return ApiCore.fetch('/users/getUser', HTTPMethod.GET)
    }

    getUserByEmail(email) {
        return ApiCore.fetch('/users/getUserByEmail', HTTPMethod.POST, {
            email: email
        })
    }
}

export default new AuthApi()