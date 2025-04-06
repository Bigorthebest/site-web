//import * as THREE from "./three";
//import * as THREE from "../node_modules/three/build/three.module.js"
//import { GLTFLoader } from "./gltf";
import * as THREE from "three"; 
import { GLTFLoader } from "gltf";

let cnv = document.querySelector("#myCanvas");
console.log("Etape : Chargement du canvas ");
let model = undefined;
let model2 = undefined;
let loader = new GLTFLoader();
let renderer = new THREE.WebGLRenderer({canvas: cnv, antialiasing: true});




let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000 );
camera.position.z = 2;
console.log("Etape : lumiére ");

let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);
let dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);
let hlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(hlight);

console.log("Etape : Chargement de la 3D ");
let data = await loader.loadAsync("objet/flower.glb");
if(data) {
    model = data.scene;
    model.scale.x = 0.1
    model.scale.y = 0.1
    model.scale.z = 0.1
    scene.add(model);
    };

let data2 = await loader.loadAsync("objet/crabe.glb");
if(data2) {
    model2 = data2.scene;
    model2.scale.x = 0.3
    model2.scale.y = 0.3
    model2.scale.z = 0.3
    model2.position.y = -0.5
    scene.add(model2);
    model2.visible = false ;
    };

let geom = new THREE.SphereGeometry(100.0, 20, 20);
let textureSkydome = new THREE.TextureLoader().load("image/ciel.jpeg");
let mat = new THREE.MeshStandardMaterial({ map: textureSkydome,side: THREE.BackSide });
let shpere = new THREE.Mesh(geom, mat);
scene.add(shpere);


console.log("Etape : Chargement du modèle ");

let lastRot = undefined;
let timer = 1000 ;
function animate(timestamp) {
    if(lastRot == undefined) { lastRot = timestamp; }
    if((timestamp - lastRot) >= 10) {
        if(model){
            model.rotation.y += 0.02;
            model.rotation.x += 0.01;
        } 
        if(model2){
            model2.rotation.y += 0.01;
        }
    lastRot = timestamp;
    }
    if(timer == 0){
        timer = 1000 ;
        if(model.visible){
            model.visible = false
            model2.visible = true 
        }
        else{
            model.visible = true
            model2.visible = false 
        }
    }
    //console.log(timer) ;
    timer -= 1 ;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    }
requestAnimationFrame(animate);

//renderer.render(scene, camera);
console.log("Etape : Rendu ");