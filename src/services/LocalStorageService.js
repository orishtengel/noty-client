

class LocalStorageService {

    storage = {}

    getValue(key, defaultValue = null) {
        // let value = localStorage.getItem(key)
        // if(value)
        //     return JSON.parse(value)
        // else
        //     return defaultValue
        if(key in this.storage)
            return this.storage[key]
        else 
            return defaultValue
    }

    setValue(key, value) {
        // localStorage.setItem(key, JSON.stringify(value))
        this.storage[key] = value
    }
}

export default new LocalStorageService()