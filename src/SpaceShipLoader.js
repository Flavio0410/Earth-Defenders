import * as THREE from "https://unpkg.com/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";


class SpaceShipLoader
{
  constructor(containerId, modelUrl) 
  {
    this.container = document.getElementById(containerId);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 200;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.loader = new GLTFLoader();
    this.loader.load(
      modelUrl,
      (gltf) => {
        this.object = gltf.scene;
        this.scene.add(this.object);
        this.object.position.set(0, 0, 0); // Move object to the center of the scene
        this.object.scale.set(1, 1, 1);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error(error);
      }
    );


    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = Math.PI/2;
    this.controls.maxPolarAngle = Math.PI/2;



    

    const topLight = new THREE.DirectionalLight(0xffffff);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    this.scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    window.addEventListener("resize", () => this.onWindowResize());

    this.container.appendChild(this.renderer.domElement);


    this.animate();
    

  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.object) {
      // Rimuovi la rotazione sull'asse Y e Z
      this.object.rotation.y += 0.0015;
  
    }
    this.renderer.render(this.scene, this.camera);
  }
  




}

const tt = new SpaceShipLoader("spaceShipContainer", "../public/assets/models/spaceship/scene.gltf");