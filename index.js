var grid = [];
var rows, columns;

(function (window, document, undefined) {
	var cellWidth = 40;
	var current, fps, fpsInterval, ellapsed, now, then;

	document.addEventListener('DOMContentLoaded',
		function () {
			setup(5);
			draw();
		});

	function createCanvas(width, height) {
		var body = document.querySelector('body');
		if (body) {
			body.innerHTML = '<canvas id="drawArea" width="' + width + '" height="' + height + '" />'
		}
		rows = Math.floor(width / cellWidth);
		columns = Math.floor(width / cellWidth);
	}

	function initGrid() {
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
				var cell = new Cell(i, j, cellWidth);
				grid.push(cell);
			}
		}
	}

	function setup(fps) {
		createCanvas(400, 400);
		initGrid();
		current = grid[0];
		fpsInterval = 1000 / fps;
		then = Date.now();
	}

	function draw() {
		window.setTimeout(fpsInterval);
		window.requestAnimationFrame(draw);
		now = Date.now();
		ellapsed = now - then;

		if (ellapsed > fpsInterval) {

			then = now - (ellapsed % fpsInterval);
			for (let cell of grid) {
				cell.draw();
			}

			var next = current.visit();
			if (next)
				current = next;
		}
	}

}(window, document))

function getGridIndex(row, col) {
	if (row < 0 || col < 0 || row > rows - 1 || col > columns - 1)
		return undefined;
	return row + col * columns;
}
