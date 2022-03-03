const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class ApplicationsApi {
    async getApplications () {
        return await ApiCore.fetch('/apps/getApplications',HTTPMethod.GET)
    }
}

export default new ApplicationsApi()