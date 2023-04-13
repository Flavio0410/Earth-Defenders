import * as THREE from "https://unpkg.com/three@0.151.3/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class Starspace {
  constructor() {
    // Inizializza la scena, la telecamera e il renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = Math.PI / 2;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Crea una geometria per le stelle
    this.starGeo = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const accelerations = [];
    for (let i = 0; i < 6000; i++) {
      positions.push(Math.random() * 600 - 300);
      positions.push(Math.random() * 600 - 300);
      positions.push(Math.random() * 600 - 300);

      velocities.push(0);

      accelerations.push(0.02);
    }
    this.starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.starGeo.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 1));
    this.starGeo.setAttribute('acceleration', new THREE.Float32BufferAttribute(accelerations, 1));

    // Crea un materiale per le stelle
    const sprite = new THREE.TextureLoader().load('../public/assets/images/star.png');
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    // Crea un oggetto Points per le stelle e lo aggiunge alla scena
    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);

    // Aggiunge un listener per la ridimensione della finestra
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

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
    const positions = this.starGeo.getAttribute('position');
    const velocities = this.starGeo.getAttribute('velocity');
    const accelerations = this.starGeo.getAttribute('acceleration');
    for (let i = 0; i < positions.count; i++) {
      velocities.setX(i, velocities.getX(i) + accelerations.getX(i));
      positions.setY(i, positions.getY(i) - velocities.getX(i));
      if (positions.getY(i) < -200) {
        positions.setY(i, 200);
        velocities.setX(i, 0);
      }
    }
    positions.needsUpdate = true;

    this.stars.rotation.y += 0.002;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}

// // Crea un'isstanza della classe StarField e inizia l'animazione delle stelle
let start = new Starspace();