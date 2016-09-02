function Cell(row, column, width) {
	this.visited = false;
	this.row = row;
	this.column = column;
	this.width = width;
	this.walls = [true, true, true, true];


	var canvas = document.getElementById("drawArea");
	this.ctx = canvas.getContext('2d');
}

Cell.prototype.draw = function () {
	var x = this.row * this.width;
	var y = this.column * this.width;

	this.ctx.beginPath();

	this.ctx.moveTo(x, y);
	if (this.walls[0])
		this.ctx.lineTo(x + this.width, y);
	if (this.walls[1])
		this.ctx.lineTo(x + this.width, y + this.width);
	if (this.walls[2])
		this.ctx.lineTo(x, y + this.width);
	if (this.walls[3])
		this.ctx.lineTo(x, y);

	this.ctx.closePath();

	this.ctx.strokeStyle = "#CCC";
	this.ctx.stroke();
	this.ctx.strokeStyle = null;

	if (this.visited) {
		this.ctx.fillStyle = "#7D4EC2";
		this.ctx.fillRect(x, y, this.width, this.width);
	}
};

Cell.prototype.visit = function () {
	this.visited = true;
	var neighbours = [];

	var top = grid[getGridIndex(this.row - 1, this.column)];
	var right = grid[getGridIndex(this.row, this.column + 1)];
	var bottom = grid[getGridIndex(this.row + 1, this.column)];
	var left = grid[getGridIndex(this.row, this.column - 1)];

	if (top && !top.visited)
		neighbours.push(top);
	if (right && !right.visited)
		neighbours.push(right);
	if (bottom && !bottom.visited)
		neighbours.push(bottom);
	if (left && !left.visited)
		neighbours.push(left);

	if (neighbours.length > 0)
		return neighbours[Math.floor(Math.random(0, neighbours.length))];
	else
		return undefined;
};
