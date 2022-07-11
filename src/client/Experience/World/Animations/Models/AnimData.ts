import Experience from '../../../Experience'
import * as THREE from 'three'
export interface iAnimData {
    activity: {
        start: Date
        finish: Date
        name: string
        code: string
        id: string
    }
    element: string
    appearanceprofile: {
        id: string
        name: string
        x: number
        y: number
        z: number
        before: boolean
        after: boolean
        during: boolean
    }
}

export class AnimData {
    activity: {
        start: Date
        finish: Date
        name: string
        code: string
        id: string
    }
    element: string
    appearanceprofile: {
        id: string
        name: string
        x: number
        y: number
        z: number
        before: boolean
        after: boolean
        during: boolean
    }
    duration: number
    msInDay: number
    experience: Experience
    scene: THREE.Scene
    object: THREE.Mesh
    lpConst: number = 0
    minLp: number = 0
    maxLp: number = 0
    clippingPlane: THREE.Plane

    constructor(data: iAnimData, experience: Experience) {
        this.msInDay = 24 * 60 * 60 * 1000
        this.experience = experience
        this.scene = experience.scene
        this.activity = data.activity
        console.log(data.activity.start)
        this.activity.start = new Date(data.activity.start)
        this.activity.finish = new Date(data.activity.finish)
        this.appearanceprofile = data.appearanceprofile
        this.element = data.element
        this.object = this.scene.getObjectByName(data.element) as THREE.Mesh
        const bb = this.object.geometry.boundingBox as THREE.Box3
        if (this.appearanceprofile.x === 1) {
            this.minLp = bb.min.x - 0.01
        } else if (this.appearanceprofile.y === 1) {
            this.minLp = bb.min.y - 0.01
        } else if (this.appearanceprofile.z === 1) {
            this.minLp = bb.min.z - 0.01
        }
        this.clippingPlane = new THREE.Plane(
            new THREE.Vector3(
                this.appearanceprofile.x,
                this.appearanceprofile.y,
                this.appearanceprofile.y
            ),
            this.minLp
        )
        ;(this.object.material as THREE.MeshStandardMaterial).clippingPlanes = [this.clippingPlane]

        this.duration =
            (data.activity.finish.getTime() - data.activity.start.getTime()) / this.msInDay
    }

    getStatus(focusTime: Date) {
        const bb = this.object.geometry.boundingBox as THREE.Box3
        if (this.appearanceprofile.x === 1 || this.appearanceprofile.x === -1) {
            this.minLp = bb.min.x - 0.01
            this.maxLp = bb.max.x + 0.01
        } else if (this.appearanceprofile.y === 1 || this.appearanceprofile.y === -1) {
            this.minLp = bb.min.y - 0.01
            this.maxLp = bb.max.y + 0.01
        } else if (this.appearanceprofile.z === 1 || this.appearanceprofile.z === -1) {
            this.minLp = bb.min.z - 0.01
            this.maxLp = bb.max.z + 0.01
        }
        this.lpConst = this.maxLp - this.minLp
        if (this.activity.start <= focusTime && focusTime <= this.activity.finish) {
            const elapsed = (focusTime.getTime() - this.activity.start.getTime()) / this.msInDay
            let progress = elapsed / this.duration
            let lp = this.minLp + progress * this.lpConst
            console.log(progress, lp, this.minLp, this.maxLp, this.lpConst, bb)
            this.clippingPlane.constant = lp
            ;(this.object.material as THREE.MeshBasicMaterial).clippingPlanes = [this.clippingPlane]
            return lp
        }
        if (focusTime < this.activity.start) {
            return 0
        }
        if (focusTime > this.activity.finish) {
            return 1
        }
    }
}
