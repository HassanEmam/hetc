import { AppearanceProfileData, AppearanceProfile } from './AppearanceProfile'
import { Activity, ActivityData } from './Activity'
import { ObjectActivity, ObjectActivityData } from './ObjectActivity'
import ApiService from '../../../Utils/api.service'
import { iAnimData, AnimData } from './AnimData'
import Experience from '../../../Experience'
import * as THREE from 'three'

export default class AnimationData {
    activityData: ActivityData[] = []
    objectActivityData: ObjectActivityData[] = []
    activities: Activity[] = []
    objectActivities: ObjectActivity[] = []
    appearanceProfileData: AppearanceProfileData[] = []
    appearanceProfiles: AppearanceProfile[] = []
    apiService: ApiService = new ApiService()
    animDataType: iAnimData[] = []
    animData: AnimData[] = []
    focusTime: Date = new Date()
    startTime: Date = new Date()
    finishTime: Date = new Date()
    experience: Experience
    scene: THREE.Scene

    constructor(project_id: string, model_id: string, schedule_id: string, experience: Experience) {
        console.log(schedule_id, model_id)
        this.getDetailedObjectActivity(model_id)
        this.experience = experience
        this.scene = experience.scene
    }

    async getActivities(schedule_id: string) {
        await this.apiService.getActivities(schedule_id).then((data) => {
            this.activityData = data.data.data
            this.activities = this.activityData.map((activity) => {
                return new Activity(activity)
            })
        })
    }

    async getDetailedObjectActivity(model_id: string) {
        await this.apiService.getDetailedObjectActivities(model_id).then((data) => {
            this.animDataType = data.data
            this.animData = this.animDataType.map((obj) => {
                return new AnimData(obj, this.experience)
            })
        })
        this.animData = this.animData.sort((a, b) => {
            return a.activity.start.getTime() - b.activity.start.getTime()
        })
        // this.startAnimation()
    }

    startAnimation() {
        this.startTime = this.animData[0].activity.start
        const maxDat = this.animData.reduce((a, b) => {
            return new Date(a.activity.finish) > new Date(b.activity.finish) ? a : b
        })
        this.finishTime = maxDat.activity.finish

        this.focusTime = new Date(this.startTime)
        this.animationLoop()
    }

    async animationLoop() {
        let i = 0
        while (this.focusTime < this.finishTime) {
            for (let ad of this.animData) {
                if (ad.activity.start <= this.focusTime && this.focusTime <= ad.activity.finish) {
                    ad.getStatus(this.focusTime)
                } else if (this.focusTime > ad.activity.finish) {
                    ad.getStatus(this.focusTime)

                    // console.log('Finished', this.focusTime, ad.appearanceprofile.during)
                } else if (this.focusTime < ad.activity.start) {
                    ad.getStatus(this.focusTime)

                    // console.log('Not started', this.focusTime, ad.duration, ad.activity)
                }
            }
            this.focusTime.setDate(this.focusTime.getDate() + 1)
            await this.delay(100)
        }
        this.experience.raycaster.isAnim = false
    }

    delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    async getObjectActivities(model_id: string) {
        await this.apiService.getObjectActivities(model_id).then((data) => {
            this.objectActivityData = data.data.data
            this.objectActivities = this.objectActivityData.map((objectActivity) => {
                return new ObjectActivity(objectActivity)
            })
        })
    }

    async getAppearanceProfiles(project_id: string) {
        await this.apiService.getAppearanceProfiles(project_id).then((data) => {
            this.appearanceProfileData = data.data.data
            this.appearanceProfiles = this.appearanceProfileData.map((appearanceProfile) => {
                return new AppearanceProfile(appearanceProfile)
            })
        })
    }

    getActivity(id: string) {
        return this.activities.find((activity) => {
            return activity.public_id === id
        })
    }

    getObjectActivity(id: string) {
        return this.objectActivities.find((objectActivity) => {
            return objectActivity.public_id === id
        })
    }

    getAppearanceProfile(id: string) {
        return this.appearanceProfiles.find((appearanceProfile) => {
            return appearanceProfile.public_id === id
        })
    }
}
