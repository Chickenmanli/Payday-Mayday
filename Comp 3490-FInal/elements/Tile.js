class Tile {
  constructor(pointX, pointY, data) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.data = data;
  }
  
  getData(){
	  return this.data;
  }
  
  setData(data){
	  this.data = data;
  }
}