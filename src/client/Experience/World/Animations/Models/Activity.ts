export interface ActivityData {
    id: string
    title: string
    code: string
    start: string
    finish: string
    public_id: string
    schedule_id: string
    wbs_id: string
    is_active: boolean
}

export class Activity {
    id: string
    code: string
    title: string
    schedule_id: string
    public_id: string
    start: string
    finish: string
    wbs_id: string
    is_active: boolean

    constructor(activity: ActivityData) {
        this.id = activity.id
        this.code = activity.code
        this.title = activity.title
        this.schedule_id = activity.schedule_id
        this.public_id = activity.public_id
        this.start = activity.start
        this.finish = activity.finish
        this.wbs_id = activity.wbs_id
        this.is_active = activity.is_active
    }
}
