class ImpassableObject {
  constructor(pointX, pointY, size) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.size = size;
    this.graphics = null;
  }
  
  init(){
	  var rock = new THREE.MeshLambertMaterial();
	  rock.map = THREE.ImageUtils.loadTexture('images/rock.jpg');
	this.graphics = new THREE.Mesh(//bottom left stand
				new THREE.BoxGeometry( this.size, this.size, this.size ), rock);
	this.graphics.position.x = this.pointX * this.size;
	this.graphics.position.y = 0;
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
  
  isMoveable(){
	  return false;
  }
  
  isDrillable(){
	  return true;
  }
}