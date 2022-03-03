const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class SubscribeApi {
    async addSubscribe(keyWebsite,username,date, startTime, endTime, frequncy) {
        return await ApiCore.fetch('/apps/addSubscribe', HTTPMethod.POST, {
            keyWebsite: keyWebsite,
            email: username,
            date: date,
            startTime: startTime,
            endTime: endTime,
            frequncy: frequncy
        })
    }
}

export default new SubscribeApi()