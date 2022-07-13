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
    clippingPlane = new THREE.Plane()
    clonedMateral: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

    constructor(data: iAnimData, experience: Experience) {
        this.msInDay = 24 * 60 * 60 * 1000
        this.experience = experience
        this.scene = experience.scene
        this.activity = data.activity
        this.activity.start = new Date(data.activity.start)
        this.activity.finish = new Date(data.activity.finish)
        this.appearanceprofile = data.appearanceprofile
        this.element = data.element
        this.object = this.scene.getObjectByName(data.element) as THREE.Mesh
        const bb: any = new THREE.Box3().setFromObject(this.object)
        if (this.object === undefined) {
            // console.log('Object not found')
        } else {
            this.object.geometry.computeBoundingBox()

            this.clippingPlane = new THREE.Plane(
                new THREE.Vector3(
                    this.appearanceprofile.x,
                    this.appearanceprofile.y,
                    this.appearanceprofile.y
                ),
                this.minLp
            )
            const cplanes = []
            this.object.geometry.computeBoundingBox()
            if (this.appearanceprofile.x === 1 || this.appearanceprofile.x === -1) {
                let minLp = bb.min.x - 0.1
                let maxLp = bb.max.x + 0.1
                this.minLp = minLp
                this.maxLp = maxLp
                cplanes.push({
                    normal: new THREE.Vector3(this.appearanceprofile.x, 0, 0),
                    minLP: minLp,
                    maxLp: maxLp,
                    lpConst: maxLp - minLp,
                })
            }
            if (this.appearanceprofile.y === 1 || this.appearanceprofile.y === -1) {
                let minLp = bb.min.y - 0.1
                let maxLp = bb.max.y + 0.1
                this.minLp = minLp
                this.maxLp = maxLp
                cplanes.push({
                    normal: new THREE.Vector3(0, this.appearanceprofile.y, 0),
                    minLp: minLp,
                    maxLp: maxLp,
                    lpConst: maxLp - minLp,
                })
            }
            if (this.appearanceprofile.z === 1 || this.appearanceprofile.z === -1) {
                let minLp = bb.min.z - 0.1
                let maxLp = bb.max.z + 0.1
                this.minLp = minLp
                this.maxLp = maxLp
                cplanes.push({
                    normal: new THREE.Vector3(0, 0, this.appearanceprofile.z),
                    minLp: minLp,
                    maxLp: maxLp,
                    lpConst: maxLp - minLp,
                })
            }
            this.clonedMateral = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            this.clonedMateral.clippingPlanes = []
            let planes = []
            for (let o of cplanes) {
                let plane = new THREE.Plane(o.normal, o.minLp)
                planes.push(plane)
            }
            this.clonedMateral.clippingPlanes = planes
            this.object.material = this.clonedMateral
        }

        this.duration =
            -1 + (data.activity.finish.getTime() - data.activity.start.getTime()) / this.msInDay
    }

    getStatus(focusTime: Date) {
        this.experience.raycaster.isAnim = true

        if (this.object !== undefined) {
            const cplanes = []
            this.object.geometry.computeBoundingBox()
            const bb = this.object.geometry.boundingBox as THREE.Box3

            this.lpConst = this.maxLp - this.minLp
            if (this.activity.start < focusTime && focusTime < this.activity.finish) {
                // this.clonedMateral = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
                const elapsed = (focusTime.getTime() - this.activity.start.getTime()) / this.msInDay
                let progress = elapsed / this.duration

                this.lpConst = this.maxLp - this.minLp
                const lp = progress * this.lpConst + this.minLp

                this.clonedMateral.clippingPlanes[0].constant = lp + 0.2
                this.object.material = this.clonedMateral
            } else if (focusTime < this.activity.start) {
                this.clonedMateral.clippingPlanes[0].constant = this.minLp
                this.object.material = this.clonedMateral
                return 0
            } else if (focusTime > this.activity.finish) {
                return 1
            }
            this.experience.update()
        }
    }
}
