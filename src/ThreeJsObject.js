import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class ThreeJSObject {
  constructor(containerId, modelUrl) {
    this.container = document.getElementById(containerId);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 500;

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
        this.object.scale.set(0.8, 0.8, 0.8);

      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error(error);
      }
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    const topLight = new THREE.DirectionalLight(0xffffff);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    this.scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);

    document.addEventListener("mousemove", (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

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
      this.object.rotation.y = -3 + (this.mouseX / window.innerWidth) * 3;
      this.object.rotation.x = -1.2 + (this.mouseY * 2.5) / window.innerHeight;
    }
    this.renderer.render(this.scene, this.camera);
  }
}

const tt = new ThreeJSObject("container3D", "../public/assets/models/earth/scene.gltf");
