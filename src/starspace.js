// Importa la libreria THREE.js
import * as THREE from "https://cdn.skypack.dev/three@0.117.0/build/three.module.js";
// Per consentire alla telecamera di muoversi intorno alla scena
import { OrbitControls } from "https://cdn.skypack.dev/three@0.117.0/examples/jsm/controls/OrbitControls.js";
// Per consentire l'importazione del file .gltf
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.117.0/examples/jsm/loaders/GLTFLoader.js";

class starspace {
  constructor() {
    // Inizializza la scena, la telecamera e il renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = Math.PI/2;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Crea una geometria per le stelle
    this.starGeo = new THREE.Geometry();
    for(let i=0; i<6000; i++) {
      let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.02;
      this.starGeo.vertices.push(star);
    }

    // Crea un materiale per le stelle
    let sprite = new THREE.TextureLoader().load('../public/assets/star.png');
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite
    });

    // Crea un oggetto Points per le stelle e lo aggiunge alla scena
    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);

    // Aggiunge un listener per la ridimensione della finestra
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    // Avvia l'animazione
    this.animate();
  }

  // Funzione chiamata quando la finestra viene ridimensionata
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Funzione per l'animazione delle stelle
  animate() {
    this.starGeo.vertices.forEach(p => {
      p.velocity += p.acceleration;
      p.y -= p.velocity;
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    this.starGeo.verticesNeedUpdate = true;
    this.stars.rotation.y += 0.002;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Crea un'istanza della classe StarField e inizia l'animazione delle stelle
let start = new starspace();