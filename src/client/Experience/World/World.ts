import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import Experience from '../Experience'
import Lights from './Lights'
import { EventEmitter } from '../Utils/EventEmitter'

import AnimationData from './Animations/Models/AnimationData'

export default class World extends EventEmitter {
    experience: Experience
    scene: THREE.Scene
    lights: Lights
    grids: THREE.GridHelper
    bb: THREE.Box3
    animationData: AnimationData

    constructor(experience: Experience) {
        super()
        this.experience = experience
        this.scene = this.experience.scene
        this.bb = new THREE.Box3()
        this.grids = new THREE.GridHelper(100, 100)
        this.lights = new Lights(this.experience)
        this.animationData = new AnimationData('', '', '', this.experience)
        this.init()
    }

    async init() {
        const g = new THREE.Group()
        g.name = 'world'
        // this.resources = this.experience.resources;
        const geom = new THREE.BoxGeometry(1.0, 1.0, 1.0)
        const mat = new THREE.MeshBasicMaterial()
        const mymesh = new THREE.Mesh(geom, mat)
        const mymesh2 = new THREE.Mesh(geom, mat)
        mymesh.position.set(2, 0, 0)
        mymesh2.position.set(-2, 0, 0)
        await this.loadGLTF('./bridge.glb')

        console.log('World Log')
        g.add(mymesh)
        g.add(mymesh2)
        this.scene.add(g)

        this.scene.add(this.grids)
        this.animationData = new AnimationData(
            'cba163f8-0425-41a1-9a0b-b47961ea1ef0',
            'ca5527d9-209f-4ae0-ae84-57d8419e1db2',
            '66428a2f-bdde-4773-aa64-8545bc86d91a',
            this.experience
        )
    }

    async loadGLTF(fileURL: string) {
        const loader = new GLTFLoader()
        await loader.load(
            fileURL,
            (gltf: any) => {
                this.bb.setFromObject(gltf.scene)
                this.scene.add(gltf.scene)
                // this.experience.raycaster.pickableObjects.push(...gltf.scene.children)
                for (let o in gltf.scene.children) {
                    let obj = gltf.scene.children[o]
                    if (obj instanceof THREE.Mesh) {
                        this.experience.raycaster.pickableObjects.push(obj)
                        this.experience.raycaster.originalMaterials[obj.uuid] = obj.material
                    }
                }
                this.experience.update()
                // console.log('GLTF Loaded', this.experience.raycaster.pickableObjects)
                // this.trigger('modelLoaded', gltf.scene)
                this.positionGrid(this.bb)
            },
            undefined,
            (error: any) => {
                console.error(error)
            }
        )
    }

    positionGrid(bb: THREE.Box3) {
        if (this.grids.position.y > bb.min.y) {
            this.grids.position.y = this.bb.min.y
        }
    }
}
