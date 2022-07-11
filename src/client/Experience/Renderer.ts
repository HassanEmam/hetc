import * as THREE from 'three'
import Experience from './Experience'
import Camera from './Camera'
import Sizes from './Utils/Sizes'

export default class Renderer {
    experience: Experience
    sizes: Sizes
    scene: THREE.Scene
    camera: Camera
    container: HTMLElement
    instance: THREE.WebGLRenderer = new THREE.WebGLRenderer()

    constructor(experience: Experience) {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.container = experience.container

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer()

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('lightgrey', 1)
        this.instance.setSize(window.innerWidth, window.innerHeight)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.container.appendChild(this.instance.domElement)
        console.log(this.instance, this.instance.clearColor())
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
    }
}
