 //var game = (function() {

	var worldSize = 10;
	var world = [];

	function Cell(row, column, aisle, alive) {
		this.row = row;
		this.column = column;
		this.aisle = aisle;
		this.alive = alive;
	}

	function seed() {
		var column = [];
		var aisle = [];
		for (var i = 0; i < worldSize; i++) {
			for (var j = 0; j < worldSize; j++) {
				for (var k = 0; k < worldSize; k++) {
					if (Math.random() < 0.2) aisle.push(new Cell(i, j, k, true));
					else aisle.push(new Cell(i, j, k, false));
				}
				column.push(aisle);
				aisle = [];
			}
			world.push(column);
			column = [];
		}
	}

	function nextGen() {
		var newGen = [];
		var newColumn = [];
		var newAisle = [];
		world.forEach(function(row, rowIndex) {
			row.forEach(function(column, columnIndex) {
				column.forEach(function(cell, aisleIndex) {
					var population = getPop(world, rowIndex, columnIndex, aisleIndex);
					newAisle.push(new Cell(rowIndex, columnIndex, aisleIndex, isItAlive(population, cell)));
				});
				newColumn.push(newAisle);
				newAisle = [];
			});
			newGen.push(newColumn);
			newColumn = [];
		});
		world = newGen;
	}

	function getPop(world, rowIndex, columnIndex, aisleIndex) {
		var population = 0;
		for (var i = rowIndex - 1; i <= rowIndex + 1; i++) {
			for (var j = columnIndex - 1; j <= columnIndex + 1; j++) {
				for (var k = aisleIndex - 1; k <= aisleIndex + 1; k++) {
					if (world[wrap(i)][wrap(j)][wrap(k)].alive && 
						!(i === rowIndex && j === columnIndex && k === aisleIndex)) population++;
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
		// Ruleset 4555
		if (population === 4) return cell.alive;
		if (population === 5) return true;
		return false;

		// Ruleset 5766
		// if (population === 5 || population === 7) return cell.alive;
		// if (population === 6) return true;
		// return false;

		// Ruleset 10 21 10 21
		// if (population >= 10 && population <= 21) return true;
		// return false;

		// Ruleset 4526
		// if (population >= 4 && population <= 5) return cell.alive;
		// if (population >= 2 && population <= 6) return true;
		// return false;
	}












