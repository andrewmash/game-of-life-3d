var scene, camera, renderer;
var voxelSize = 50;
var game = require('gameoflife3d');

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    game.seed();

    game.world.forEach(function(column) {
        column.forEach(function(aisle) {
            aisle.forEach(function(cell) {
                draw(cell);
            });
        });
    });

    // geometry = new THREE.BoxGeometry(200, 200, 200);
    // material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    // mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

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

    	game.world = game.nextGen();
    	game.world.forEach(function(column) {
	        column.forEach(function(aisle) {
	            aisle.forEach(function(cell) {
	                redraw(cell);
	            });
	        });
	    });
    

    scene.rotation.x += 0.01;

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}
