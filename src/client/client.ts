import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { ViewCubeObject3D } from 'three-js-view-cube'

import Axios from 'axios'
import { CubeTextureLoader, Vector3 } from 'three'
// const vc = new ViewCubeObject3D()
// const viewCube3D = new ViewCubeObject3D()
let model: any = null
const loadingMan = new THREE.LoadingManager()
const loader = new GLTFLoader(loadingMan)
const objLoader = new OBJLoader()
const scene = new THREE.Scene()
let canvas = document.getElementById('container') as HTMLCanvasElement

const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
const geom1 = new THREE.BoxGeometry()
const mat1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })

const cube1 = new THREE.Mesh(geom1, mat1)
cube1.position.set(0, 0, 0)
let group = new THREE.Group()
group.attach(cube1)
let box = new THREE.Box3(new THREE.Vector3(1, 1, 1))
box.setFromObject(cube1)
// scene.add(viewCube3D)
let min = box.min.y
let max = box.max.y
let tempAnimData = { min: min, max: max }

console.log(tempAnimData)

scene.add(group)
camera.position.z = 2
camera.position.x = 2
camera.position.y = 2
const dirLight = new THREE.DirectionalLight()

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true

renderer.setSize(canvas.clientWidth, canvas.clientHeight)
canvas?.appendChild(renderer.domElement)
render()
const orbitControls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', render)
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
dirLight.position.z = 50
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(dirLight)

const transformControls = new TransformControls(camera, renderer.domElement)
// transformControls.addEventListener('dragging-changed', function (event) {
//     orbitControls.enabled = !event.value
// })

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'g':
            transformControls.setMode('translate')
            break
        case 'r':
            transformControls.setMode('rotate')
            break
        case 's':
            transformControls.setMode('scale')
            break
    }
})

// const axh1 = new THREE.AxesHelper(1)
// axh1.position.x = 1
scene.add(ambientLight)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const pickableObjects: THREE.Mesh[] = []
let intersectedObject: THREE.Object3D | null
const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } = {}
const highlightedMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})

const raycaster = new THREE.Raycaster()
let intersects: THREE.Intersection[]

document.addEventListener('mousemove', onDocumentMouseMove, false)
function onDocumentMouseMove(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
        },
        camera
    )
    intersects = raycaster.intersectObjects(pickableObjects, false)

    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    }
    pickableObjects.forEach((o: THREE.Mesh, i) => {
        if (intersectedObject && intersectedObject.name === o.name) {
            pickableObjects[i].material = highlightedMaterial
        } else {
            pickableObjects[i].material = originalMaterials[o.name]
        }
    })
}

// scene.add(axh1)
console.log(scene)
scene.traverse(function (child) {
    if ((child as THREE.Mesh).isMesh) {
        console.log(child)

        const m = child as THREE.Mesh
        pickableObjects.push(m)
        originalMaterials[m.name] = (m as THREE.Mesh).material
    }
})
type changedObjes = { [key: string]: any }
const changedObjs: changedObjes = {}
transformControls.addEventListener('dragging-changed', function (event) {
    orbitControls.enabled = !event.value
})
transformControls.addEventListener('change', (e) => {
    let name = transformControls.object?.uuid
    changedObjs[name as string] = transformControls.object
    console.log('Change Event', changedObjs)
})
document.addEventListener('click', onDocumentMouseClick, false)
function onDocumentMouseClick(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
        },
        camera
    )
    intersects = raycaster.intersectObjects(pickableObjects, false)
    // console.log(intersects[0].object)

    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
        transformControls.detach()
    }
    pickableObjects.forEach((o: THREE.Mesh, i) => {
        if (intersectedObject && intersectedObject.name === o.name) {
            // console.log(intersectedObject.parent)
            transformControls.attach(intersectedObject.parent as THREE.Mesh)
            // console.log(transformControls)
            scene.add(transformControls)
            render()
        } else {
            pickableObjects[i].material = originalMaterials[o.name]
        }
    })
}
let localPlane = new THREE.Plane(new Vector3(0, -1, 0), Math.round(box.min.y * 100) / 100)
console.log(localPlane.constant)
let origColor = cube1.material.clone()

function animate() {
    requestAnimationFrame(animate)
    if (localPlane.constant < box.max.y) {
        console.log(localPlane.constant)
        localPlane.constant += 0.01
        mat1.clippingPlanes = [localPlane]
        cube1.material.color.set(0x008e00)
        // cube1.material.wireframe = true
        cube1.material = mat1
    } else {
        const boxL = new THREE.Box3().setFromObject(cube1)
        localPlane.constant = boxL.max.y
    }
    // cube1.rotation.x += 0.01
    // cube1.rotation.y += 0.01
    orbitControls.update()

    render()
}

let s1 = document.getElementById('keyframe')
s1?.addEventListener('click', (e) => {
    console.log('s1 clicked', e)
})

renderer.localClippingEnabled = true

function render() {
    renderer.render(scene, camera)
}

render()
animate()
