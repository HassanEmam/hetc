import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import * as THREE from 'three'
import Experience from './Experience'
import Camera from './Camera'
import Renderer from './Renderer'

export default class Controls {
    experience: Experience
    camera: Camera
    renderer: Renderer
    scene: THREE.Scene
    canvas: HTMLCanvasElement
    controls: any
    transformControls: any
    lp: THREE.Plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

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
                    break
                case 'w':
                    this.transformControls.setSpace('world')

                    break
                case 'l':
                    this.transformControls.setSpace('local')
                    break
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
        if (object instanceof THREE.Mesh && object !== null && object !== undefined) {
            // for (let ob of this.scene.children) {
            //     if (ob instanceof TransformControls) {
            //         this.scene.remove(ob)
            //     }
            // }
            this.transformControls.detach()
            object.updateMatrixWorld()
            object.geometry.computeBoundingBox()

            // object.geometry.center()
            // this.transformControls.position.set(centroid)
            this.transformControls.attach(object)

            this.transformControls.setSpace('local')
        }
        this.transformControls.addEventListener('dragging-changed', (event: any) => {
            this.controls.enabled = !event.value
            this.transformControls.object.geometry.computeBoundingBox()
            const d = this.experience.world.animationData.animData.filter((animData: any) => {
                return animData.element === this.transformControls.object.name
            })
            console.log('D****************', d[0])
            if (event.value) {
                this.lp = this.transformControls.object.material.clippingPlanes[0]
                console.log('lp', this.lp, this.transformControls.object.material.clippingPlanes)
            } else {
                console.log(this.lp)
            }
            const bb = this.transformControls.object.geometry.boundingBox
            console.log('dragging-changed', bb, event.value)
            // this.experience.renderer.update()
        })
        this.transformControls.addEventListener('change', () => {
            this.experience.update()
            // this.transformControls.object.material.clippingPlanes = []
            // console.log(this.transformControls)
        })
    }

    getCenterPoint(mesh: THREE.Mesh) {
        var middle = new THREE.Vector3()
        var geometry = mesh.geometry

        geometry.computeBoundingBox()

        const bb = geometry?.boundingBox

        middle.x = ((bb as THREE.Box3).max.x + (bb as THREE.Box3).min.x) / 2
        middle.y = ((bb as THREE.Box3).max.y + (bb as THREE.Box3).min.y) / 2
        middle.z = ((bb as THREE.Box3).max.z + (bb as THREE.Box3).min.z) / 2

        return middle
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
