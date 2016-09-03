function Cell( row, column, width ) {
	this.visited = false;
	this.row = row;
	this.column = column;
	this.width = width;
	this.walls = [ true, true, true, true ];


	var canvas = document.getElementById( "drawArea" );
	this.ctx = canvas.getContext( '2d' );
}

Cell.prototype.draw = function () {
	var x = this.row * this.width;
	var y = this.column * this.width;

	this.ctx.beginPath();

	//this.ctx.moveTo(x, y);
	if ( this.walls[ 0 ] )
		this.ctx.lineTo( x + this.width, y );
	if ( this.walls[ 1 ] )
		this.ctx.lineTo( x + this.width, y + this.width );
	if ( this.walls[ 2 ] )
		this.ctx.lineTo( x, y + this.width );
	if ( this.walls[ 3 ] )
		this.ctx.lineTo( x, y );

	this.ctx.closePath();

	this.ctx.strokeStyle = "#CCC";
	this.ctx.stroke();
	this.ctx.strokeStyle = null;

	if ( this.visited ) {
		this.ctx.fillStyle = "#7d4ec2";
		this.ctx.fillRect( x, y, this.width, this.width );
	}
};

Cell.prototype.visit = function () {
	this.visited = true;
	var neighbours = [];

	var top = grid[ getGridIndex( this.row - 1, this.column ) ];
	var right = grid[ getGridIndex( this.row, this.column + 1 ) ];
	var bottom = grid[ getGridIndex( this.row + 1, this.column ) ];
	var left = grid[ getGridIndex( this.row, this.column - 1 ) ];

	if ( top && !top.visited )
		neighbours.push( top );
	if ( right && !right.visited )
		neighbours.push( right );
	if ( bottom && !bottom.visited )
		neighbours.push( bottom );
	if ( left && !left.visited )
		neighbours.push( left );

	if ( neighbours.length > 0 ) {
		var nextIndex = Math.floor( Math.random() * ( neighbours.length + 1 ) );
		return neighbours[ nextIndex ];
	} else
		return undefined;
};

Cell.prototype.collapseWall = function ( neighbor ) {
	console.log( this );
	var xDirection = this.column - neighbor.column;
	if ( xDirection === 1 ) {
		//the neighbor is to the left
		this.walls[ 3 ] = false;
		neighbor.walls[ 1 ] = false;
	} else if ( xDirection === -1 ) {
		//the neighbor is to the left
		this.walls[ 1 ] = false;
		neighbor.walls[ 3 ] = false;
	}

	var yDirection = this.row - neighbor.row;
	if ( yDirection === 1 ) {
		//the neighbor is above
		this.walls[ 0 ] = false;
		neighbor.walls[ 2 ] = false;
	} else if ( yDirection === -1 ) {
		//the neighbor is below
		this.walls[ 2 ] = false;
		neighbor.walls[ 0 ] = false;
	}
};

Cell.prototype.highlight = function () {
	var x = this.row * this.width;
	var y = this.column * this.width;
	this.ctx.fillStyle = "#5a1480"
	this.ctx.fillRect( x, y, this.width - 2, this.width - 2 );
};
