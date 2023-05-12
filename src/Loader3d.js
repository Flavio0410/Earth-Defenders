import * as THREE from "https://unpkg.com/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class Loader3d
{
    constructor(containerId, modelUrl, angleview, cameraposition_z, x_axis_object, y_axis_object, z_axis_object) 
    {
    this.container = document.getElementById(containerId); //seleziona l'elemento HTML per inserire la scena

    this.scene = new THREE.Scene(); //crea una nuova scena Three.js
    
    this.camera = new THREE.PerspectiveCamera(angleview, this.container.clientWidth / this.container.clientHeight, 0.1, 1000); //crea una nuova camera prospettica Three.js con un angolo di visualizzazione di 10 gradi, un rapporto d'aspetto di finestra e una distanza di visualizzazione minima e massima di 0.1 e 1000 rispettivamente.
    this.camera.position.z = cameraposition_z; //posiziona la camera a una distanza di 200 unità lungo l'asse z dalla scena

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //crea un nuovo renderer WebGL con antialiasing e un canale alfa
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight); //imposta la dimensione del renderer alla dimensione della finestra
    this.renderer.setPixelRatio(window.devicePixelRatio); //imposta il rapporto pixel del renderer in base al rapporto pixel del dispositivo


    this.loader = new GLTFLoader(); //crea un nuovo loader GLTF
    this.loader.load(modelUrl,
        (gltf) => {
            this.object = gltf.scene; //salva l'oggetto della scena
            this.scene.add(this.object); //aggiungi l'oggetto alla scena
            this.object.position.set(y_axis_object, x_axis_object, z_axis_object); //posizione l'oggetto sulla scena in base ai parametri passati
            this.object.scale.set(1, 1, 1); //scala l'oggetto a 1, 1, 1
        }
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); //crea un nuovo controllo orbitale Three.js
    this.controls.enableZoom = false; //disabilita lo zoom
    this.controls.minPolarAngle = Math.PI/2; //imposta l'angolo polare minimo a 90 gradi
    this.controls.maxPolarAngle = Math.PI/2; //imposta l'angolo polare massimo a 90 gradi

    const topLight = new THREE.DirectionalLight(0xffffff); //crea una nuova luce direzionale bianca
    topLight.position.set(500, 500, 500); //posiziona la luce a 500, 500, 500
    topLight.castShadow = true; //abilita l'ombra
    this.scene.add(topLight); //aggiungi la luce alla scena

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); //crea una nuova luce ambientale bianca con una intensità del 70%
    this.scene.add(ambientLight); //aggiunge la luce alla scena Three.js
    
    this.container.appendChild(this.renderer.domElement); //aggiunge il canvas della scena Three.js al container HTML della pagina web

    this.rotate(); //avvia la funzione di animazione della scena Three.js

    document.getElementsByClassName("playbutton")[0].addEventListener("mouseover", () => this.rotatefast()); //aggiunge un listener per l'evento "click" del bottone play che richiama la funzione play()

    document.getElementsByClassName("playbutton")[0].addEventListener("mouseout", () => this.rotatenormal()); //aggiunge un listener per l'evento "click" del bottone play che richiama la funzione play()

    //add on containerresize
    window.addEventListener("resize", () => this.onWindowResize()); //aggiunge un listener per l'evento "resize" della finestra che richiama la funzione resize()

    }

  rotate() { //definisce una funzione rotate che avvia l'animazione della terra attorno al proprio asse
      requestAnimationFrame(() => this.rotate()); //richiede l'animazione della funzione animate() usando requestAnimationFrame(), che viene richiamata ad ogni frame di animazione
      if (this.object) { //verifica se l'oggetto 3D è stato caricato
          this.object.rotation.y += 0.0015; //aggiorna la rotazione dell'oggetto 3D lungo l'asse Y
      }
      this.renderer.render(this.scene, this.camera); //renderizza la scena Three.js utilizzando il renderer
  }

rotatefast(){
  requestAnimationFrame(() => this.rotatefast()); //richiede l'animazione della funzione animate() usando requestAnimationFrame(), che viene richiamata ad ogni frame di animazione
  if (this.object) { //verifica se l'oggetto 3D è stato caricato
    this.object.rotation.y += 0.1; //aggiorna la rotazione dell'oggetto 3D lungo l'asse Y
  }
  this.renderer.render(this.scene, this.camera); //renderizza la scena Three.js utilizzando il renderer
}

rotatenormal(){
  requestAnimationFrame(() => this.rotatenormal()); //richiede l'animazione della funzione animate() usando requestAnimationFrame(), che viene richiamata ad ogni frame di animazione
  if (this.object) { //verifica se l'oggetto 3D è stato caricato
    this.object.rotation.y-=0.1; //aggiorna la rotazione dell'oggetto 3D lungo l'asse Y
  }
  this.renderer.render(this.scene, this.camera); //renderizza la scena Three.js utilizzando il renderer
}

onWindowResize() {
    // Aggiorna le dimensioni del renderer e della camera

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }


}

const earth3d = new Loader3d("earthContainerID", "../public/assets/models/earth/scene.gltf", 4, 550, -50, 0, 0);
const spaceship3d = new Loader3d("spaceshipContainerID", "../public/assets/models/spaceship/scene.gltf", 10, 100, 0, 0, 0);