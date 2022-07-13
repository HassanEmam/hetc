import axios from 'axios'

export default class ApiService {
    baseUrl = 'https://bim.constology.com/api/'
    auth =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc4MTgzNzEsImlhdCI6MTY1NzczMTk2Niwic3ViIjoyfQ.jDKz3yTuuLj8ZiShOlz-sGOFpESxrXscqKDYTqKL9mE'

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

    getDetailedObjectActivities(model_id: string) {
        return axios.get(this.baseUrl + 'objectactivity/modeld/' + model_id, {
            headers: this.getAuthHeader(),
        })
    }

    getAppearanceProfiles(project_id: string) {
        return axios.get(this.baseUrl + 'appearanceprofile/p/' + project_id, {
            headers: this.getAuthHeader(),
        })
    }
}
