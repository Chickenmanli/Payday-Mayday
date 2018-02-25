class TileMap {
  constructor(pointX, pointY) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.map = null;
  }
  
  initMap(){
	  this.map = new Array();
	  for (var i = 0; i < this.pointX; i++) { 
		  this.map[i] = new Array();
			for (var j = 0; j < this.pointY; j++) {
				this.map[i][j] = new Tile(i,j,null);
			}
		}
  }
  
  getTileData(pointX, pointY){
	  if(!this.isOutOfBounds(pointX, pointY))
	  {
		  return this.map[pointX][pointY].getData();
	  }else{
		  alert("TileMap: outofbounds");
		  return null;
	  }
  }
  
  setTileData(pointX, pointY, data){
	  if(!this.isOutOfBounds(pointX, pointY))
	  {
		  this.map[pointX][pointY].setData(data);
	  }else{
		  alert("TileMap: outofbounds");
		  return null;
	  }
  }
  
  moveTileData(pointX,pointY,newX,newY){
	  var original = this.getTileData(pointX,pointY);
	  var target = this.getTileData(newX,newY);
	  if(target != null)
	  {
		  alert("moveTileData(), target is occupied");
	  }else{
		  if(original != null)
		  {
			  this.setTileData(newX,newY,this.getTileData(pointX,pointY));
			  this.setTileData(pointX,pointY,null);
		  }else{
			  alert("moveTileData(), original object doesnt exist");
		  }
	  }
  }
  
  intersects(pointX, pointY, otherX, otherY)
  {
	  if(this.getTileData(pointX, pointY) == null)
	  {
		  alert("intersects(), original object doesnt exist");
		  return null;
	  }else{
		  if(this.getTileData(otherX, otherY) == null)
		  {
			  return false;
		  }else{
			  return true;
		  }
	  }
  }
  
  isOutOfBounds(pointX,pointY){
	  if(pointX >= 0 && pointX < this.pointX
			  && pointY >= 0 && pointY < this.pointY)
	  {
		  return false;
	  }else{
		  return true;
	  }
	  
  }
}