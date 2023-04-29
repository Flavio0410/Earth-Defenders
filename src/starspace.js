import * as THREE from "https://unpkg.com/three@0.151.3/build/three.module.js";


class Starspace {
  constructor(containerId) 
  {
  {

    this.container = document.getElementById(containerId); // Ottiene il contenitore per il canvas

    this.scene = new THREE.Scene(); // Crea una nuova scena Three.js
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000); // Crea una nuova camera prospettica Three.js con un angolo di visualizzazione di 60 gradi, un rapporto d'aspetto di finestra e una distanza di visualizzazione minima e massima di 1 e 1000
    this.camera.position.z = 1; // Posiziona la camera a una distanza di 1 unità lungo l'asse z dalla scena
    this.camera.rotation.x = Math.PI / 2; // Ruota la camera di 90 gradi lungo l'asse x per posizionarla in modo che punti verso il basso
    
    this.renderer = new THREE.WebGLRenderer(); // Crea un nuovo renderer WebGL
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Imposta le dimensioni del renderer in base alle dimensioni della finestra
    this.renderer.setClearColor(0x010c19, 1); // Imposta il colore di sfondo del renderer su blu scuro
    document.body.appendChild(this.renderer.domElement); // Aggiunge il renderer al DOM sotto forma di canvas HTML




    this.starGeometry = new THREE.BufferGeometry(); // Crea un nuovo BufferGeometry per le stelle con attributi per la posizione, la velocità e l'accelerazione
    const positions = []; // Crea un array per le posizioni delle stelle
    const velocities = []; // Crea un array per le velocità delle stelle
    const accelerations = []; // Crea un array per le accelerazioni delle stelle
    for (let i = 0; i < 3000; i++) { // Crea 4000 stelle
      positions.push(Math.random() * 600 - 300); // Aggiunge una posizione casuale lungo l'asse x tra -300 e 300
      positions.push(Math.random() * 600 - 300); // Aggiunge una posizione casuale lungo l'asse y tra -300 e 300
      positions.push(Math.random() * 600 - 300); // Aggiunge una posizione casuale lungo l'asse z tra -300 e 300

      velocities.push(0); // Aggiunge una velocità iniziale di 0

      accelerations.push(0.02); // Aggiunge un'accelerazione iniziale di 0.02
    }


    this.starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); // Aggiunge gli attributi di posizione, velocità e accelerazione alla geometria delle stelle come buffer di float a 32 bit con 3 valori per ogni elemento (x, y, z)
    this.starGeometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 1)); 
    this.starGeometry.setAttribute('acceleration', new THREE.Float32BufferAttribute(accelerations, 1));


    const sprite = new THREE.TextureLoader().load('../public/assets/images/whitestar.png'); // Carica la texture per le stelle da un'immagine 
    const starMaterial = new THREE.PointsMaterial({ // Crea un nuovo materiale Points per le stelle 
      size: 2, // Imposta la dimensione delle stelle su 2
      map: sprite, // Imposta la texture delle stelle sulla texture caricata
      transparent: true, // Imposta il materiale delle stelle su trasparente
      blending: THREE.AdditiveBlending, // Imposta il blending delle stelle su AdditiveBlending per creare un effetto di sfocatura 
    });

    
    const sprite2 = new THREE.TextureLoader().load('../public/assets/images/purplestar.png'); // Carica la texture per le stelle da un'immagine
    const starMaterial2 = new THREE.PointsMaterial({ // Crea un nuovo materiale Points per le stelle
      size: 2,  // Imposta la dimensione delle stelle su 2
      map: sprite2, // Imposta la texture delle stelle sulla texture caricata
      transparent: true, // Imposta il materiale delle stelle su trasparente
      blending: THREE.AdditiveBlending, // Imposta il blending delle stelle su AdditiveBlending per creare un effetto di sfocatura
    });

    
    this.stars = new THREE.Points(this.starGeometry, starMaterial); // Crea un nuovo oggetto Points per le stelle con la geometria e il materiale creati in precedenza
    this.scene.add(this.stars); // Aggiunge le stelle bianche alla scena

    this.stars2 = new THREE.Points(this.starGeometry, starMaterial2); // Crea un nuovo oggetto Points per le stelle con la geometria e il materiale creati in precedenza
    this.scene.add(this.stars2); // Aggiunge le stelle viola alla scena

    // Aggiunge un event listener per la finestra che chiama la funzione onWindowResize quando la finestra viene ridimensionata
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.container.appendChild(this.renderer.domElement); //aggiunge il canvas della scena Three.js al container HTML della pagina web

    // Avvia l'animazione
    this.animate();
  }
}

  // Funzione chiamata quando la finestra viene ridimensionata
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight; // Imposta il rapporto d'aspetto della camera in base alle dimensioni della finestra
    this.camera.updateProjectionMatrix(); // Aggiorna la matrice di proiezione della camera in base alle nuove dimensioni della finestra 
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Imposta le dimensioni del renderer in base alle dimensioni della finestra
  }

  // Funzione per l'animazione delle stelle
  animate() {
    const positions = this.starGeometry.getAttribute('position'); // Ottiene l'attributo di posizione dalla geometria delle stelle 
    const velocities = this.starGeometry.getAttribute('velocity'); // Ottiene l'attributo di velocità dalla geometria delle stelle
    const accelerations = this.starGeometry.getAttribute('acceleration'); // Ottiene l'attributo di accelerazione dalla geometria delle stelle
    for (let i = 0; i < positions.count; i++) { 
      velocities.setX(i, velocities.getX(i) + accelerations.getX(i)); 
      positions.setY(i, positions.getY(i) - velocities.getX(i));
      if (positions.getY(i) < -200) {
        positions.setY(i, 200);
        velocities.setX(i, 0);
      }
    }
    positions.needsUpdate = true;

    this.stars.rotation.y += 0.002; // Ruota le stelle bianche lungo l'asse y 
    this.stars2.rotation.y += 0.004; // Ruota le stelle viola lungo l'asse y

    this.renderer.render(this.scene, this.camera); // Renderizza la scena e la camera
    requestAnimationFrame(this.animate.bind(this)); // Richiede una nuova animazione al browser
  }
}
// Crea un'isstanza della classe StarField e inizia l'animazione delle stelle
const start = new Starspace("mainContainer");