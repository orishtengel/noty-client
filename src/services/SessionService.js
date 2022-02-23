import ls from 'local-storage'
import jwt_decode from "jwt-decode";


class SessionService {

    isLoggedIn() {
        return !!ls.get('token')
    }

    isAdmin() {
        if(this.isLoggedIn()) {
            let token = ls.get('token')
            return jwt_decode(token).admin
        }
        else
            return false 
    }
}

export default new SessionService()