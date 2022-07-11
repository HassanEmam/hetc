import * as THREE from 'three'
import { PerspectiveCamera } from 'three'
import Experience from './Experience'
import Renderer from './Renderer'
import Sizes from './Utils/Sizes'

export default class Camera {
    experience: Experience
    sizes: Sizes
    scene: THREE.Scene
    renderer: Renderer
    instance: PerspectiveCamera

    constructor(experience: Experience) {
        this.experience = experience
        this.sizes = experience.sizes
        this.scene = experience.scene
        this.renderer = experience.renderer
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            500
        )
        this.setInstance()
    }

    setInstance() {
        this.instance.position.set(3, 4, 10)
        this.scene.add(this.instance)
    }

    resize() {
        this.instance.aspect =
            this.renderer.instance.domElement.width / this.renderer.instance.domElement.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.instance.aspect =
            this.renderer.instance.domElement.width / this.renderer.instance.domElement.height
        this.instance.updateProjectionMatrix()
    }
}
