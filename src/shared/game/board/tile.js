class Tile{

  constructor(pos_x, pos_y, i_color) {
    this._xloc = pos_x;
    this._yloc = pos_y;
    this._color = i_color; 
  }

  getX(){
    return this._xloc;
  }

  getY(){
    return this._yloc;
  }

  getColor(){
    return this._color;
  }
  
}

export default Tile;