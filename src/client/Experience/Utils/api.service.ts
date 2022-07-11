import axios from 'axios'

export default class ApiService {
    baseUrl = 'https://bim.constology.com/api/'
    auth =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc2NDQ4NDksImlhdCI6MTY1NzU1ODQ0NCwic3ViIjoyfQ.UuPT_QhD2g5eBHvWe0MR4sQ7nenCZV8k-u9FzZdOW80'

    getAuthHeader() {
        return {
            accept: 'application/json',
            Authorization: this.auth,
        }
    }

    getActivities(schedule_id: string) {
        return axios.get(this.baseUrl + 'activity/sch/' + schedule_id, {
            headers: this.getAuthHeader(),
        })
    }

    getObjectActivities(model_id: string) {
        return axios.get(this.baseUrl + 'objectactivity/model/' + model_id, {
            headers: this.getAuthHeader(),
        })
    }
}
