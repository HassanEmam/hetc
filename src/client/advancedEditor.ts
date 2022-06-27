export default class AdvancedEditor {
    seq: number
    rotation: any
    scale: any
    translation: any
    focusTime: number

    constructor() {
        this.seq = 0
        this.focusTime = 0
        this.rotation = {
            x: 0,
            y: 0,
            z: 0,
            w: 0,
        }
        this.scale = { x: 0, y: 0, z: 0 }
        this.translation = { x: 0, y: 0, z: 0 }
    }

    setRotation(x: number, y: number, z: number, w: number) {
        this.rotation.x = x
        this.rotation.y = y
        this.rotation.z = z
        this.rotation.w = w
    }

    setTranslation(x: number, y: number, z: number) {
        this.translation.x = x
        this.translation.y = y
        this.translation.z = z
    }

    setScale(x: number, y: number, z: number) {
        this.scale.x = x
        this.scale.y = y
        this.scale.z = z
    }
}
