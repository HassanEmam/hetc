import * as THREE from 'three'

// import Debug from "./Utils/Debug.js";
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Mouse from './Utils/Mouse'
import Raycaster from './Raycaster'
import Controls from './Controls'
// import sources from "./sources.js";

let instance = null

export default class Experience {
    renderer: Renderer
    scene: THREE.Scene
    camera: Camera
    world: World
    mouse: Mouse
    raycaster: Raycaster
    controls: Controls
    sizes: Sizes
    time: Time
    container: HTMLElement

    constructor(_container: HTMLElement) {
        // Singleton

        // Global access
        ;(<any>window).experience = this
        ;(<any>window).THREE = THREE
        // Options
        this.container = _container

        // Setup
        // this.debug = new Debug();
        this.sizes = new Sizes(this.container)
        this.renderer = new Renderer(this)
        this.time = new Time()
        this.scene = new THREE.Scene()

        this.camera = new Camera(this)
        // this.resources = new Resources()
        this.world = new World(this)
        this.mouse = new Mouse(this)
        this.raycaster = new Raycaster(this)
        this.controls = new Controls(this)
        this.renderer.instance.render(this.scene, this.camera.instance)

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        this.mouse.on('clicked', (event: any) => {
            this.clickEvent()
        })

        this.mouse.on('move', (event: any) => {
            this.mouseMove(event)
        })

        this.raycaster.on('objectSelected', (object: any) => {
            console.log('objectSelected', object)
            this.controls.objectSelected(object)
        })
        this.raycaster.on('objectDeselected', () => {
            console.log('objectDeselected')
            this.controls.objectDeSelected()
        })
    }

    resize() {
        this.renderer.instance.render(this.scene, this.camera.instance)

        this.camera.resize()
        this.renderer.resize()
        // this.mouse.update();
    }

    update() {
        this.renderer.instance.render(this.scene, this.camera.instance)

        this.camera.update()
        // this.world.update();
        this.raycaster.refresh()
        // this.raycaster.move()
        // this.renderer.update()
        this.controls.update()
    }

    clickEvent() {
        this.renderer.update()
        this.raycaster.clicked()
    }

    mouseMove(event: any) {
        this.camera.update()
        this.controls.update()
        this.renderer.update()
        this.raycaster.move()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.controls.controls.dispose()
        this.controls.transformControls.dispose()
        this.renderer.instance.dispose()
    }
}
