var grid = [];
var rows, columns, ctx;

(function (window, document, undefined) {
	var cellWidth = 80;
	var gridSize = 400;
	var current, fps, fpsInterval, ellapsed, now, then, canvas;

	document.addEventListener('DOMContentLoaded',
		function () {
			setup(5);
			draw();
		});


	function setup(fps) {
		canvas = document.getElementById("drawArea");
		ctx = canvas.getContext('2d');
		fpsInterval = 1000 / fps;
		then = Date.now();

		createCanvas(400, 400);
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
				var cell = new Cell(i, j, cellWidth);
				grid.push(cell);
			}
		}

		current = grid[0];
	}

	function draw() {
		now = Date.now();
		ellapsed = now - then;

		if (ellapsed > fpsInterval) {
			clear();
			for (let cell of grid) {
				cell.draw();
			}

			current.visited = true;
			current.highlight();
			var next = current.getNextNeighbor();
			if (next) {
				next.visited = true;

				//current.collapseWall(next);
				removeWalls(current, next);

				current = next;
			}

			then = now - (ellapsed % fpsInterval);
		}
		window.requestAnimationFrame(draw);
	}

	function createCanvas(width, height) {
		var body = document.querySelector('body');
		if (body) {
			body.innerHTML = '<canvas id="drawArea" width="' + width + '" height="' + height + '" />'
		}
		rows = Math.floor(height / cellWidth);
		columns = Math.floor(width / cellWidth);
	}

	function clear() {
		ctx.save();

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.restore();
	}

	function removeWalls(a, b) {
		var x = a.i - b.i;
		if (x === 1) {
			a.walls[3] = false;
			b.walls[1] = false;
		} else if (x === -1) {
			a.walls[1] = false;
			b.walls[3] = false;
		}
		var y = a.j - b.j;
		if (y === 1) {
			a.walls[0] = false;
			b.walls[2] = false;
		} else if (y === -1) {
			a.walls[2] = false;
			b.walls[0] = false;
		}
	}
}(window, document))

function getGridIndex(row, col) {
	if (row < 0 || col < 0 || row > rows - 1 || col > columns - 1)
		return -1;
	return row * columns + col;
}
