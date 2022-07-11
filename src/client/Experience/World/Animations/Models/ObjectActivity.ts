export interface ObjectActivityData {
    activity_id: string
    ifcelement_id: string
    public_id: string
    appearanceprofile_id: string
    is_active: true
}

export class ObjectActivity {
    activity_id: string
    ifcelement_id: string
    public_id: string
    appearanceprofile_id: string
    is_active: boolean

    constructor(activity: ObjectActivityData) {
        this.activity_id = activity.activity_id
        this.ifcelement_id = activity.ifcelement_id
        this.public_id = activity.public_id
        this.appearanceprofile_id = activity.appearanceprofile_id
        this.is_active = activity.is_active
    }
}
