var game = (function() {

	var worldSize = 30;
	var world = [];

	function seed() {
		var column = [];
		var aisle = [];
		for (var i = 0; i < worldSize; i++) {
			for (var j = 0; j < worldSize; j++) {
				for (var k = 0; k < worldSize; k++) {
					if (Math.random() < 0.2) aisle.push(1);
					else aisle.push(0);
				}
				column.push(aisle);
				aisle = [];
			}
			world.push(column);
			column = [];
		}
		return world;
	}

	function nextGen() {
		var newGen = [];
		var newColumn = [];
		var newAisle = [];
		world.forEach(function(row, rowIndex) {
			row.forEach(function(column, columnIndex) {
				column.forEach(function(cell, aisleIndex) {
					var population = getPop(world, rowIndex, columnIndex, aisleIndex, cell);
					newAisle.push(isItAlive(population, cell));
				});
				newColumn.push(newAisle);
				newAisle = [];
			});
			newGen.push(newColumn);
			newColumn = [];
		});
		world = newGen;
	}

	function getPop(world, rowIndex, columnIndex, aisleIndex, cell) {
		var population = 0;
		for (var i = rowIndex - 1; i <= rowIndex + 1; i++) {
			for (var j = columnIndex - 1; j <= columnIndex + 1; j++) {
				for (var k = aisleIndex - 1; k <= aisleIndex + 1; k++) {
					if (world[wrap(i)][wrap(j)][wrap(k)] === 1) population++;
				}
			}
		}
		return population;
	}

	function wrap(n) {
		if (n < 0) return worldSize - 1;
		if (n === worldSize) return 0;
		return n;
	}

	function isItAlive(population, cell) {
		if (population === 5) return 1;
		if (population === 6) return cell;
		return 0;
	}

	return {
		world: world,
		nextGen: nextGen,
		seed: seed
	};
})();



// setInterval(function() {
// 	cells = nextGen(cells);
// 	console.log(nextGen(cells));
// }, 30);













