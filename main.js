let scene, camera, renderer;
let enemies = [];
let score = 0;
let maxScore = 10;
const scoreDiv = document.getElementById("score");
const messageDiv = document.getElementById("message");

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);

  spawnEnemy();
  animate();

  document.body.addEventListener("click", shoot);
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function spawnEnemy() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xff66cc });
  const enemy = new THREE.Mesh(geometry, material);

  enemy.position.x = (Math.random() - 0.5) * 6;
  enemy.position.y = (Math.random() - 0.5) * 4;
  enemy.position.z = -10;
  enemies.push(enemy);
  scene.add(enemy);
}

function shoot() {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const intersects = raycaster.intersectObjects(enemies);
  if (intersects.length > 0) {
    const hit = intersects[0].object;
    scene.remove(hit);
    enemies = enemies.filter(e => e !== hit);
    score++;
    scoreDiv.textContent = `Score: ${score}`;
    if (score >= maxScore) {
      messageDiv.classList.remove("hidden");
    }
    spawnEnemy();
  }
}

function animate() {
  requestAnimationFrame(animate);
  enemies.forEach(enemy => enemy.position.z += 0.05);
  renderer.render(scene, camera);
}

init();
