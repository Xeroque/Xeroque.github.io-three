//import THREEJS
import * as THREE from '/three/build/three.module.js';
//import OrbitControls
import { OrbitControls } from '/three/examples/jsm/controls/OrbitControls.js';
//importing the GLTF file loader
import {
GLTFLoader
} from '/three/examples/jsm/loaders/GLTFLoader.js';
var mixer;
var clock = new THREE.Clock();
//creating the window in which the render is going to be displayed
var renderer = new THREE.WebGLRenderer();
var container = document.getElementById('canvas');
var w = container.offsetWidth;
var h = container.offsetHeight;
renderer.setSize(window.innerWidth , window.innerHeight);
container.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement)
//creating the scene
var scene = new THREE.Scene();
//creating the camera
let theta = 0;
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 1000;
const radius = 500;
const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
camera.position.z=0;
//creating OrbitControls
var controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
camera.lookAt( scene.position );
controls.update();
//creating a new background
scene.background = new THREE.Color(0x0d090a);;
// creating lights
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var light = new THREE.PointLight(0xFFFFFF, 1);
light.position.set(0, 10, 50);
scene.add(light);
//loading object on scene
const loader = new GLTFLoader();
loader.load('/model/scene.gltf', function( model ) {

    mixer= new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
    
    scene.add(model.scene);

}, undefined, function(error) {

    console.error(error);

});
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    if(instance.renderer3D)
    instance.renderer3D.setSize(instance.dom.clientWidth, instance.dom.clientHeight);
    if(instance.composer)
    instance.composer.setSize(instance.dom.clientWidth, instance.dom.clientHeight);

}
//rendering frames
function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    mixer.update( delta )
    renderer.render(scene, camera);
}
animate();