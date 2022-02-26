const { default: ApiCore, HTTPMethod } = require("./ApiCore");

class CoursesApi {
    async getCourses () {
        return await ApiCore.fetch('/getCourses',HTTPMethod.GET)
    }
}

export default new CoursesApi()