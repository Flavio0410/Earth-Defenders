import * as THREE from "https://unpkg.com/three@0.151.3/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class EarthLoader
{
  constructor(containerId, modelUrl) 
  {
    this.container = document.getElementById(containerId); //seleziona l'elemento HTML per inserire la scena
    
    this.scene = new THREE.Scene(); //crea una nuova scena Three.js
    
    this.camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000); //crea una nuova camera prospettica Three.js con un angolo di visualizzazione di 15 gradi, un rapporto d'aspetto di finestra e una distanza di visualizzazione minima e massima di 0.1 e 1000 rispettivamente.
    this.camera.position.z = 550; //posiziona la camera a una distanza di 520 unità lungo l'asse z dalla scena

    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //crea un nuovo renderer Three.js basato sulla tecnologia WebGL, abilita l'antialiasing e l'alpha per la trasparenza
    this.renderer.setSize(window.innerWidth, window.innerHeight); //imposta le dimensioni del renderer per adattarsi alle dimensioni della finestra corrente
    this.renderer.setPixelRatio(window.devicePixelRatio); //imposta il rapporto tra i pixel del renderer e i pixel del dispositivo per garantire la massima definizione visiva su tutti i dispositivi
    

    this.loader = new GLTFLoader(); //crea un nuovo oggetto loader per caricare modelli 3D in formato glTF
    this.loader.load(
      modelUrl, //l'url del modello da caricare
      (gltf) => { //callback che viene eseguito quando il modello viene caricato con successo
        this.object = gltf.scene; //memorizza l'oggetto radice del modello
        this.scene.add(this.object); //aggiunge l'oggetto radice alla scena Three.js
        this.object.position.set(0, 0, 0); //posiziona l'oggetto radice al centro della scena
        this.object.scale.set(1, 1, 1); //scala l'oggetto radice per renderlo più grande
      },
    );
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement); //crea un nuovo oggetto OrbitControls per controllare la camera della scena con il mouse
    this.controls.enableZoom = false; //disabilita lo zoom con la rotellina del mouse
    this.controls.minPolarAngle = Math.PI/2; //imposta l'angolo minimo di rotazione verticale della camera a 90 gradi (la camera guarderà sempre verso il basso)
    this.controls.maxPolarAngle = Math.PI/2; //imposta l'angolo massimo di rotazione verticale della camera a 90 gradi (la camera guarderà sempre verso il basso)
    
    const topLight = new THREE.DirectionalLight(0xffffff); //crea una nuova luce direzionale con colore bianco
    topLight.position.set(500, 500, 500); //imposta la posizione della luce
    topLight.castShadow = true; //abilita la generazione di ombre
    this.scene.add(topLight); //aggiunge la luce alla scena Three.js
    

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); //crea una nuova luce ambientale bianca con una intensità del 70%
    this.scene.add(ambientLight); //aggiunge la luce alla scena Three.js
    
    window.addEventListener("resize", () => this.onWindowResize()); //aggiunge un listener per l'evento "resize" della finestra del browser che richiama la funzione onWindowResize()
    
    this.container.appendChild(this.renderer.domElement); //aggiunge il canvas della scena Three.js al container HTML della pagina web
    
    this.animate(); //avvia la funzione di animazione della scena Three.js


    
  }



  onWindowResize() { //definisce una funzione onWindowResize()
    this.camera.aspect = window.innerWidth / window.innerHeight; //aggiorna il rapporto di aspetto della telecamera in base alla larghezza e all'altezza della finestra del browser
    this.camera.updateProjectionMatrix(); //aggiorna la matrice di proiezione della telecamera
    this.renderer.setSize(window.innerWidth, window.innerHeight); //imposta la nuova dimensione del canvas del renderer in base alla larghezza e all'altezza della finestra del browser
}


animate() { //definisce una funzione animate()
    requestAnimationFrame(() => this.animate()); //richiede l'animazione della funzione animate() usando requestAnimationFrame(), che viene richiamata ad ogni frame di animazione
    if (this.object) { //verifica se l'oggetto 3D è stato caricato
      // Rimuovi la rotazione sull'asse Y e Z
      this.object.rotation.y += 0.0015; //aggiorna la rotazione dell'oggetto 3D lungo l'asse Y
      //this.object.rotation.z += 0.0010; //aggiorna la rotazione dell'oggetto 3D lungo l'asse Z
  
    }
    this.renderer.render(this.scene, this.camera); //renderizza la scena Three.js utilizzando il renderer
  }


}

const tt = new EarthLoader("container3D", "../public/assets/models/earth/scene.gltf");
