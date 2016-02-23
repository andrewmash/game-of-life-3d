var express = require('express');
var app = express();
var router = express.Router()

app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/node_modules'));

router.get('/', function(req, res, next) {
  res.send('/index.html')
})

module.exports = app;

app.listen(1337, function() {
  console.log("\nListening on port 1337")
})

	var scene, camera, renderer;
	var geometry, material, mesh;

	init();
	animate();

	function init() {

		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 1000;

		game.seed();

		game.world.forEach(function(column) {
			column.forEach(function(aisle) {
				aisle.forEach(function(cell) {
					draw(cell);
				});
			});
		});

		geometry = new THREE.BoxGeometry( 200, 200, 200 );
		material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

	}

	function animate() {

		requestAnimationFrame( animate );

		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;

		renderer.render( scene, camera );

	}

