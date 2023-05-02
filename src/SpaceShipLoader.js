import * as THREE from "https://unpkg.com/three@0.136.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";


class SpaceShipLoader
{
  constructor(containerId, modelUrl) 
  {
    this.container = document.getElementById(containerId); //seleziona l'elemento HTML per inserire la scena

    this.scene = new THREE.Scene();//crea una nuova scena Three.js

    this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000); //crea una nuova camera prospettica Three.js con un angolo di visualizzazione di 10 gradi, un rapporto d'aspetto di finestra e una distanza di visualizzazione minima e massima di 0.1 e 1000 rispettivamente.
    this.camera.position.z = 200; //posiziona la camera a una distanza di 200 unità lungo l'asse z dalla scena

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //crea un nuovo renderer WebGL con antialiasing e un canale alfa
    this.renderer.setSize(window.innerWidth, window.innerHeight); //imposta la dimensione del renderer alla dimensione della finestra
    this.renderer.setPixelRatio(window.devicePixelRatio); //imposta il rapporto pixel del renderer in base al rapporto pixel del dispositivo

    this.loader = new GLTFLoader(); //crea un nuovo loader GLTF
    this.loader.load(
      modelUrl,
      (gltf) => {
        this.object = gltf.scene; //salva l'oggetto della scena
        this.scene.add(this.object); //aggiungi l'oggetto alla scena
        this.object.position.set(0, 0, 0); //posiziona l'oggetto a 0, 0, 0
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); //crea una nuova luce ambientale bianca
    this.scene.add(ambientLight); //aggiungi la luce alla scena

    window.addEventListener("resize", () => this.onWindowResize()); //aggiungi un listener per il ridimensionamento della finestra

    this.container.appendChild(this.renderer.domElement); //aggiungi il renderer alla pagina HTML come un elemento figlio del contenitore HTML


    this.animate(); //avvia l'animazione della scena 
    
  }


  onWindowResize() { //funzione per il ridimensionamento della finestra
    this.camera.aspect = containerId.innerWidth / containerId.innerHeight; //imposta il rapporto d'aspetto della camera in base al rapporto d'aspetto della finestra 
    this.camera.updateProjectionMatrix(); //aggiorna la matrice di proiezione della camera
    this.renderer.setSize(containerId.innerWidth, containerId.innerHeight); //imposta la dimensione del renderer alla dimensione della finestra
  }

  animate() { //funzione per l'animazione della scena
    requestAnimationFrame(() => this.animate()); //richiede l'animazione del frame
    if (this.object) { //se l'oggetto è stato caricato
      this.object.rotation.y -= 0.0015; //ruota l'oggetto lungo l'asse y di 0.0015 radianti ad ogni frame
    }
    this.renderer.render(this.scene, this.camera); //renderizza la scena
  }
  
}

const tt = new SpaceShipLoader("spaceShipContainer", "../public/assets/models/spaceship/scene.gltf"); //crea un nuovo oggetto SpaceShipLoader con il contenitore HTML e l'URL del modello come parametri