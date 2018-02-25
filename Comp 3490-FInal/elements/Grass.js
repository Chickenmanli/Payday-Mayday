class Grass {
  constructor(pointX, pointY, size) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.size = size;
    this.graphics = null;
  }
  
  init(){
	  var grass = new THREE.MeshLambertMaterial();
	  grass.map = THREE.ImageUtils.loadTexture('images/grass.png');
	this.graphics = new THREE.Mesh(//bottom left stand
				new THREE.BoxGeometry( this.size, 1, this.size ), grass);
	this.graphics.position.x = this.pointX * this.size;
	this.graphics.position.y = -this.size/2;
	this.graphics.position.z = this.pointY * this.size;
  }
  //Not using speed
  setLocation(pointX, pointY, speed)
  {
	  this.graphics.position.x = pointX * this.size;
	  this.graphics.position.z = pointY * this.size;
	  this.pointX = pointX;
	  this.pointY = pointY;
  }
  
  display(){
	  return this.graphics;
  }
}