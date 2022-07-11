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
        const g = new THREE.Group()
        g.name = 'world'
        this.scene = this.experience.scene
        // this.resources = this.experience.resources;
        const geom = new THREE.BoxGeometry(1.0, 1.0, 1.0)
        const mat = new THREE.MeshBasicMaterial()
        const mymesh = new THREE.Mesh(geom, mat)
        const mymesh2 = new THREE.Mesh(geom, mat)
        mymesh.position.set(2, 0, 0)
        mymesh2.position.set(-2, 0, 0)
        this.lights = new Lights(this.experience)
        this.bb = new THREE.Box3()
        this.loadGLTF('./bridge.glb')
        this.animationData = new AnimationData(
            'ca5527d9-209f-4ae0-ae84-57d8419e1db2',
            '66428a2f-bdde-4773-aa64-8545bc86d91a'
        )

        console.log(mymesh)

        g.add(mymesh)
        g.add(mymesh2)
        this.scene.add(g)
        this.grids = new THREE.GridHelper(100, 100)

        this.scene.add(this.grids)
    }

    loadGLTF(fileURL: string) {
        const loader = new GLTFLoader()
        loader.load(
            fileURL,
            (gltf: any) => {
                this.bb.setFromObject(gltf.scene)
                this.scene.add(gltf.scene)
                console.log('GLTF Loaded', gltf.scene)
                this.trigger('modelLoaded', gltf.scene)
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
