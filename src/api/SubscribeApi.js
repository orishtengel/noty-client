const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class SubscribeApi {
    async addSubscribe(data) {
        return await ApiCore.fetch('/apps/addSubscribe', HTTPMethod.POST, data)
    }
    async getSubscribeById(id) {
        return await ApiCore.fetch('/apps/getSubscribeById', HTTPMethod.POST, {
            id: id
        })
    }
   
    async deleteSubscribe(idWebsite, idSubscribe) {
        return await ApiCore.fetch('/apps/deleteSubscribe', HTTPMethod.POST, {
            idWebsite: idWebsite,
            idSubscribe: idSubscribe
        })
    }
}

export default new SubscribeApi()