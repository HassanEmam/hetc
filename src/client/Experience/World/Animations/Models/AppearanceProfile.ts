export interface AppearanceProfileData {
    id: string
    name: string
    x: 0
    y: 0
    z: 0
    before: boolean
    during: boolean
    after: boolean
    public_id: string
    project_id: string
    is_active: true
}

export class AppearanceProfile {
    id: string
    name: string
    x: number
    y: number
    z: number
    before: boolean
    during: boolean
    after: boolean
    public_id: string
    project_id: string
    is_active: boolean

    constructor(data: AppearanceProfileData) {
        this.id = data.id
        this.name = data.name
        this.x = data.x
        this.y = data.y
        this.z = data.z
        this.before = data.before
        this.during = data.during
        this.after = data.after
        this.public_id = data.public_id
        this.project_id = data.project_id
        this.is_active = data.is_active
    }
}
