import Experience from '../../Experience'

export default class GrowthAnimation {
    experience: Experience
    scene: THREE.Scene

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = experience.scene
        this.start()
    }

    start() {
        console.log('GrowthAnimation.start()')
    }
}
