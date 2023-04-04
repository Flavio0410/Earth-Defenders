let scene, camera, renderer, stars, starGeo;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.z = 0;
    camera.rotation.x = Math.PI/2;
    //camera.rotation.x = 1.16;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for(let i=0;i<6000;i++) {
    star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.001;
    starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load('public/assets/star.png');
    let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.6,
    map: sprite
    });

    stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animate();
}            



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    }
function animate() {
    starGeo.vertices.forEach(p => {
    p.velocity += p.acceleration
    p.y -= p.velocity;
    
    if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
    }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y +=0.003;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();