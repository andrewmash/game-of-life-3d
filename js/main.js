var scene, camera, controls, renderer;
var voxelSize = 50;
var frame = 0;
var voxels = [];
var voxelsColumn = [];
var voxelsAisle = [];
var red = 0;
var green = 1;
var blue = 0;

init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, worldSize * 90);

  controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', render);

  addLights();

  seed();

  world.forEach(function (column) {
    column.forEach(function (aisle) {
      aisle.forEach(function (cell) {
        draw(cell);
      });
      voxelsColumn.push(voxelsAisle);
      voxelsAisle = [];
    });
    voxels.push(voxelsColumn);
    voxelsColumn = [];
  });

  var centerCoord = Math.ceil(worldSize / 2);

  var centerCell = voxels[centerCoord][centerCoord][centerCoord];
  var bb = new THREE.Box3();
  bb.setFromObject(centerCell);
  bb.center(controls.target);

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setClearColor(0x303F9F, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;

  document.body.appendChild(renderer.domElement);

}

function draw(cell) {

  var geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
  var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(red, green, blue)
  });
  material.transparent = true;
  material.opacity = 1;

  if (!cell.alive) material.visible = false;

  var mesh = new THREE.Mesh(geometry, material);

  voxelsAisle.push(mesh);

  scene.add(mesh);
  mesh.position.set(cell.row * voxelSize, cell.column * voxelSize, cell.aisle * voxelSize);

}

function redraw(cell) {
  var mesh = voxels[cell.row][cell.column][cell.aisle];
  red = Math.random();
  green = Math.random();
  blue = Math.random();

  // For morphing colors
  // mesh.material.color = new THREE.Color(red, green, blue);

  if (cell.alive) {
    mesh.material.visible = true;
  } else mesh.material.visible = false;
}

function animate() {

  requestAnimationFrame(animate);

  frame++;

  if (frame % 10 === 0) {
    nextGen();
    world.forEach(function (column) {
      column.forEach(function (aisle) {
        aisle.forEach(function (cell) {
          redraw(cell);
        });
      });
    });
  }

  controls.update();

  renderer.render(scene, camera);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}

function addLights() {
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(worldSize * 90, 0, 0);
  scene.add(light);
  // light = new THREE.DirectionalLight( 0xffffff, 1 );
  // light.position.set( 0, worldSize * 90, 0 );
  // scene.add( light );
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, worldSize * 90);
  scene.add(light);
  light = new THREE.DirectionalLight(0xffffff, 0.4);
  light.position.set(0, 0, -worldSize * 90);
  scene.add(light);
}

function render() {

  renderer.render(scene, camera);

}
