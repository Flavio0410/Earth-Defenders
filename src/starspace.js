class MyScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.camera.rotation.x = 0.1;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.starGeo = new THREE.Geometry();
        for (let i = 0; i < 6000; i++) {
            let star = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
                );
        star.velocity = 0;
        star.acceleration = 0.001;
        this.starGeo.vertices.push(star);
        }

        let sprite = new THREE.TextureLoader().load('../public/assets/star.png');
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.6,
            map: sprite
            });

        this.stars = new THREE.Points(this.starGeo, starMaterial);
        this.scene.add(this.stars);

        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const material = new THREE.MeshBasicMaterial({ color: 0xffca27 });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(2, 2, 0);
        this.scene.add(this.cube);

        window.addEventListener("resize", this.onWindowResize.bind(this), false);
    }


    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    animate() {
      this.starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;
  
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      this.starGeo.verticesNeedUpdate = true;
      this.stars.rotation.y += 0.003;
  
      if (this.model) {
        this.model.rotation.y += 0.01;
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate.bind(this));
    }
  
    init() {
      this.animate();
    }
  }
  
  const myScene = new MyScene();
  myScene.init();