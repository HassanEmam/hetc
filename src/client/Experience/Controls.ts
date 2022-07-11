import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import * as THREE from 'three'
import Experience from './Experience'
import Camera from './Camera'
import Renderer from './Renderer'
import { toASCII } from 'punycode'

export default class Controls {
    experience: Experience
    camera: Camera
    renderer: Renderer
    scene: THREE.Scene
    canvas: HTMLCanvasElement
    controls: any
    transformControls: any

    constructor(experience: Experience) {
        this.experience = experience
        this.camera = experience.camera
        this.renderer = experience.renderer
        this.scene = experience.scene
        this.canvas = this.renderer.instance.domElement
        this.setControls()
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'g':
                    this.transformControls.setMode('translate')
                    break
                case 'r':
                    this.transformControls.setMode('rotate')
                    break
                case 's':
                    this.transformControls.setMode('scale')
                    break
                case 'Escape':
                    this.transformControls.detach()
            }
        })
    }

    setControls() {
        this.controls = new OrbitControls(this.camera.instance, this.renderer.instance.domElement)
        this.transformControls = new TransformControls(
            this.camera.instance,
            this.renderer.instance.domElement
        )
        this.transformControls.setMode('translate')
        this.experience.scene.add(this.transformControls)

        this.controls.enableDamping = true
    }

    objectSelected(object: THREE.Mesh) {
        console.log('Controls.ObjectSelected', object)
        console.log(this.experience.scene)
        if (object instanceof THREE.Mesh) {
            // for (let ob of this.scene.children) {
            //     if (ob instanceof TransformControls) {
            //         this.scene.remove(ob)
            //     }
            // }
            this.transformControls.detach()
            this.transformControls.attach(object)
        }
        this.transformControls.addEventListener('dragging-changed', (event: any) => {
            this.controls.enabled = !event.value
            // this.experience.renderer.update()
        })
        this.transformControls.addEventListener('change', () => {
            this.experience.update()
        })
    }

    objectDeSelected() {
        console.log('Detaching')
        // this.transformControls.detach()
        this.controls.enabled = true
    }

    update() {
        this.controls.update()
    }
}
