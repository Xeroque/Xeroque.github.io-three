//import THREEJS
import * as THREE from '/three/build/three.module.js';
//import OrbitControls
import { OrbitControls } from '/three/examples/jsm/controls/OrbitControls.js';
//importing the GLTF file loader
import {
GLTFLoader
} from '/three/examples/jsm/loaders/GLTFLoader.js';
//creating the window in which the render is going to be displayed
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
//creating the scene
var scene = new THREE.Scene();
//creating the camera
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z=30;
//creating OrbitControls
var controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 2, 1 );
controls.update();
//creating a new background
scene.background = new THREE.Color(0xF1F2EE);;
// creating lights
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(0, 1, 0);
scene.add(light);
//loading object on scene
var loader = new GLTFLoader();
loader.load('/model/scene.gltf', function(gltf) {

    scene.add(gltf.scene);

}, undefined, function(error) {

    console.error(error);

});
//rendering frames
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();