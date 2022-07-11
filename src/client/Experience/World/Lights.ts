import Experience from '../Experience'
import * as THREE from 'three'

export default class Lights {
    dirLight: THREE.DirectionalLight
    experience: Experience
    scene: THREE.Scene

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = experience.scene

        this.dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
        this.dirLight.position.set(0, 10, 10)
        this.dirLight.castShadow = true
        this.scene.add(this.dirLight)
    }
}
