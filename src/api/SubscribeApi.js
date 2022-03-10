const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class SubscribeApi {
    async addSubscribe(idWebsite, courseName, username, date, startTime, endTime, frequncy) {
        return await ApiCore.fetch('/apps/addSubscribe', HTTPMethod.POST, {
            idWebsite: idWebsite,
            email: username,
            courseName: courseName,
            date: date,
            startTime: startTime,
            endTime: endTime,
            frequncy: frequncy
        })
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