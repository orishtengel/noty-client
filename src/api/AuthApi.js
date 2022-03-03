const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class AuthApi {
    login(username, password) {
        return ApiCore.fetch('/signin', HTTPMethod.POST, {
            email: username,
            password: password
        })
    }
    
    verifyToken(idToken, email) {
        return ApiCore.fetch('/verify', HTTPMethod.POST, {
            idToken: idToken,
            email: email
        })
    }

    signup(username, password, name, phone) {
        return ApiCore.fetch('/signup', HTTPMethod.POST, {
            email: username,
            password: password,
            name: name,
            phone: phone
        })
    }
    createUser(username, name, phone) {
        return ApiCore.fetch('/createUser', HTTPMethod.POST, {
            email: username,
            name: name,
            phone: phone
        })
    }

    // facebookLogin(email, name, picture) {
    //     return ApiCore.fetch('/facebookLogin', HTTPMethod.POST, {
    //         email: email,
    //         name: name,
    //         picture: picture
    //     })
    // }

    getUser() {
        return ApiCore.fetch('/users/getUser', HTTPMethod.GET)
    }
}

export default new AuthApi()