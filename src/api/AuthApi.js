const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class AuthApi {
    login(username, password) {
        return ApiCore.fetch('/login', HTTPMethod.POST, {
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

    signup(username, password) {
        return ApiCore.fetch('/signup', HTTPMethod.POST, {
            email: username,
            password: password
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
        return ApiCore.fetch('/getUser', HTTPMethod.GET)
    }

    getUsers() {
        return ApiCore.fetch('/getUsers', HTTPMethod.GET)
    }
}

export default new AuthApi()