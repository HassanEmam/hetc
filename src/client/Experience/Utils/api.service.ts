import axios from 'axios'

export default class ApiService {
    baseUrl = 'https://bim.constology.com/api/'
    auth =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc4Njk2MTIsImlhdCI6MTY1Nzc4MzIwNywic3ViIjoyfQ.mlzldPyi3nQySAJ_PgxEGnFWCAX7Ac3_CL_GVfhYxh0'

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
