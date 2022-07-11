import { Activity, ActivityData } from './Activity'
import { ObjectActivity, ObjectActivityData } from './ObjectActivity'
import Axios from 'axios'
import axios from 'axios'
import ApiService from '../../../Utils/api.service'

export default class AnimationData {
    activityData: ActivityData[] = []
    objectActivityData: ObjectActivityData[] = []
    activities: Activity[] = []
    objectActivities: ObjectActivity[] = []
    apiService: ApiService = new ApiService()

    constructor(model_id: string, schedule_id: string) {
        // window.localStorage.set('auth', auth)
        console.log(schedule_id, model_id)
        this.getObjectActivities(model_id)
        this.getActivities(schedule_id)
    }

    async getActivities(schedule_id: string) {
        await this.apiService.getActivities(schedule_id).then((data) => {
            this.activityData = data.data.data
            this.activities = this.activityData.map((activity) => {
                return new Activity(activity)
            })
        })
        const act = this.getActivity('f123f705-6146-44c2-a2ea-5f6c792a07e8')
        console.log('88888888 Activity', act, this.activities)
    }

    async getObjectActivities(model_id: string) {
        this.apiService.getObjectActivities(model_id).then((data) => {
            this.objectActivityData = data.data.data
            this.objectActivities = this.objectActivityData.map((objectActivity) => {
                return new ObjectActivity(objectActivity)
            })
        })
    }

    getActivity(id: string) {
        return this.activities.find((activity) => {
            return activity.public_id === id
        })
    }
}
