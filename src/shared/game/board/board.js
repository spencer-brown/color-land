import Tile from './tile.js';

class Board{

  constructor(width, height) {
    this._width = width;
    this._height = height;
    for(this._grid = [];this._grid.length < this._height; this._grid.push([]) );


    for(var i=0; i<this._width; i++) {
      for(var j=0; j<this._height; j++) {
        var c = '#686868'//'#'+Math.floor(Math.random()*16777215).toString(16);
        this._grid[i][j] = new Tile(i,j,c);
      }
    } 
  }

  getTile(x,y){
    return this._grid[x][y];
  }
  
}

export default Board;