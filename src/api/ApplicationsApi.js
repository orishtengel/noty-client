const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class ApplicationsApi {
    async getApplications () {
        return await ApiCore.fetch('/apps/getApplications',HTTPMethod.GET)
    }
    
    async updateUserPushNotificationToken(token) {
        return await ApiCore.fetch('/users/updatePushNotificationToken', HTTPMethod.POST, {
            pushToken: token
        })
    }
}

export default new ApplicationsApi()