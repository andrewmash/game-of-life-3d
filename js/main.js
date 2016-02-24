var scene, camera, controls, renderer;
var voxelSize = 50;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(250, 250, 1000);

    controls = new THREE.OrbitControls( camera );
  	controls.addEventListener( 'change', render );

    seed();

    world.forEach(function(column) {
        column.forEach(function(aisle) {
            aisle.forEach(function(cell) {
                draw(cell);
            });
        });
    });

    var centerCoord = Math.ceil(worldSize / 2);

    var centerCell = scene.getObjectByName(centerCoord + '' + centerCoord + centerCoord);
	var bb = new THREE.Box3();
	bb.setFromObject(centerCell);
	bb.center(controls.target);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function draw (cell) {

    var geometry = new THREE.SphereGeometry(voxelSize / 3);
    var material = new THREE.MeshBasicMaterial({ color: 0x000099 });
    // material.transparent = true;

    if (cell.alive) material.color.setHex(0x00FF00);
    // else material.opacity = 0x000000; 

    var mesh = new THREE.Mesh(geometry, material);

    mesh.name = cell.row + '' + cell.column + cell.aisle;

    scene.add(mesh);
    mesh.position.set(cell.row * voxelSize, cell.column * voxelSize, cell.aisle * voxelSize);

}

function redraw (cell) {
	var mesh = scene.getObjectByName(cell.row + '' + cell.column + cell.aisle);
	if (cell.alive) mesh.material.color.setHex(0x00FF00);
	else mesh.material.color.setHex(0x000099);
}

function animate() {

    requestAnimationFrame(animate);

    	nextGen();
    	world.forEach(function(column) {
	        column.forEach(function(aisle) {
	            aisle.forEach(function(cell) {
	                redraw(cell);
	            });
	        });
	    });

	controls.update();

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function render() {

  renderer.render( scene, camera );

}
