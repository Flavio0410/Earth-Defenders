import * as THREE from "https://unpkg.com/three@0.151.3/build/three.module.js";


class Starspace {
  constructor() 
  {
    this.scene = new THREE.Scene(); // Crea una nuova scena Three.js
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000); // Crea una nuova camera prospettica Three.js con un angolo di visualizzazione di 60 gradi, un rapporto d'aspetto di finestra e una distanza di visualizzazione minima e massima di 1 e 1000
    this.camera.position.z = 1; // Posiziona la camera a una distanza di 1 unità lungo l'asse z dalla scena
    this.camera.rotation.x = Math.PI / 2; // Ruota la camera di 90 gradi lungo l'asse x per posizionarla in modo che punti verso il basso
    
    this.renderer = new THREE.WebGLRenderer(); // Crea un nuovo renderer WebGL
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Imposta le dimensioni del renderer in base alle dimensioni della finestra
    this.renderer.setClearColor(0x010c19, 1); // Imposta il colore di sfondo del renderer su blu scuro
    document.body.appendChild(this.renderer.domElement); // Aggiunge il renderer al DOM sotto forma di canvas HTML




    this.starGeo = new THREE.BufferGeometry(); // Crea un nuovo BufferGeometry per le stelle con attributi per la posizione, la velocità e l'accelerazione
    const positions = []; // Crea un array per le posizioni delle stelle
    const velocities = []; // Crea un array per le velocità delle stelle
    const accelerations = []; // Crea un array per le accelerazioni delle stelle
    for (let i = 0; i < 4000; i++) { // Crea 4000 stelle
      positions.push(Math.random() * 600 - 300); // Aggiunge una posizione casuale lungo l'asse x tra -300 e 300
      positions.push(Math.random() * 600 - 300); // Aggiunge una posizione casuale lungo l'asse y tra -300 e 300
      positions.push(Math.random() * 600 - 300); // Aggiunge una posizione casuale lungo l'asse z tra -300 e 300

      velocities.push(0); // Aggiunge una velocità iniziale di 0

      accelerations.push(0.02); // Aggiunge un'accelerazione iniziale di 0.02
    }


    this.starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); // Aggiunge gli attributi di posizione, velocità e accelerazione alla geometria delle stelle come buffer di float a 32 bit con 3 valori per ogni elemento (x, y, z)
    this.starGeo.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 1)); 
    this.starGeo.setAttribute('acceleration', new THREE.Float32BufferAttribute(accelerations, 1));


    const sprite = new THREE.TextureLoader().load('../public/assets/images/star.png'); // Carica la texture per le stelle da un'immagine
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.2,
      map: sprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    
    const sprite2 = new THREE.TextureLoader().load('../public/assets/images/purplestar.png');
    const starMaterial2 = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      map: sprite2,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    

    // Crea un oggetto Points per le stelle e lo aggiunge alla scena
    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);

    this.stars2 = new THREE.Points(this.starGeo, starMaterial2);
    this.scene.add(this.stars2);

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
const start = new Starspace();