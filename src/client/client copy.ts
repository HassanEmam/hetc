import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { ViewCubeObject3D } from 'three-js-view-cube/dist/three-js-view-cube'

import Axios from 'axios'
// const vc = new ViewCubeObject3D()
let model: any = null
const loadingMan = new THREE.LoadingManager()
const loader = new GLTFLoader(loadingMan)
const objLoader = new OBJLoader()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 100
const dirLight = new THREE.DirectionalLight()

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

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
loader.load('bridge.glb', (gltf) => {
    model = gltf
    scene.add(model.scene)
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh
            pickableObjects.push(m)
            originalMaterials[m.name] = (m as THREE.Mesh).material
        }
    })
})

const transformControls = new TransformControls(camera, renderer.domElement)
transformControls.addEventListener('dragging-changed', function (event) {
    orbitControls.enabled = !event.value
})

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

loader.load('forklift.geo.gltf', (obj) => {
    obj.scene.position.y = 1
    const model2 = obj
    scene.add(model2.scene)
    // transformControls.attach(model2.scene)
    // transformControls.setMode('rotate')

    scene.add(transformControls)
    console.log(obj)
    obj.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh
            pickableObjects.push(m)
            originalMaterials[m.name] = (m as THREE.Mesh).material
        }
    })

    render()
})

const mtlLoader = new MTLLoader()
mtlLoader.load('crane.mtl', (mtl) => {
    objLoader.load('crane.obj', (obj) => {
        mtl.preload()
        console.log(mtl)
    })
})

const axh1 = new THREE.AxesHelper(1)
axh1.position.x = 1
scene.add(ambientLight)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
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

scene.add(axh1)
console.log(scene)

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

    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    }
    pickableObjects.forEach((o: THREE.Mesh, i) => {
        if (intersectedObject && intersectedObject.name === o.name) {
            transformControls.attach(intersectedObject.parent as THREE.Mesh)
        } else {
            pickableObjects[i].material = originalMaterials[o.name]
        }
    })
}

function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    orbitControls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}

render()
animate()
