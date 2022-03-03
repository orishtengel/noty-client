import ls from 'local-storage'
import { SERVER_URL } from '../Configuration'
import EventBus from '../eventbus/EventBus'


export class HTTPMethod {
    static GET = 'GET'
    static POST = 'POST'
    static DELETE = 'DELETE'
}

export default class ApiCore {

    static async fetch(url, method, body) {
        try {
            EventBus.publish('SHOW_LOADING')

            let fullUrl = SERVER_URL + url

            if(!method) method = HTTPMethod.GET
    
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
    
            if(ls.get('token')) {
                headers.token = ls.get('token')
            }
    
            let requestParams = {
                method: method,
                body: JSON.stringify(body),
                mode: 'cors',
                headers: headers,
            }
    
            let data = {}
            try {
                let response = await fetch(fullUrl, requestParams)
                data.ok = response.ok
                try {
                    data.data = await response.json()
                }
                catch(e) {
                    data.ok = false
                    return data
                }
            }
            catch(e) {
                data.ok = false
            }
            return data

        }
        finally {
            EventBus.publish('HIDE_LOADING')
        }
    }

}

