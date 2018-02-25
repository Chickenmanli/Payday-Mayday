class MoveableObject {
  constructor(pointX, pointY, size) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.size = size;
    this.graphics = null;
  }
  
  init(){
	  var plywood = new THREE.MeshLambertMaterial();
		plywood.map = THREE.ImageUtils.loadTexture('images/plywood.jpg');
	this.graphics = new THREE.Mesh(//bottom left stand
				new THREE.BoxGeometry( this.size, this.size, this.size ), plywood);
	this.graphics.position.x = this.pointX * this.size;
	this.graphics.position.y = 0;
	this.graphics.position.z = this.pointY * this.size;
  }
  
  setLocation(pointX, pointY, speed)
  {
	  var t = new TWEEN.Tween(this.graphics.position)
	    .to({ x: pointX * this.size, y: 0, z: pointY * this.size}, speed);
		t.start();
	  //this.graphics.position.x = pointX * this.size;
	  //this.graphics.position.z = pointY * this.size;
	  this.pointX = pointX;
	  this.pointY = pointY;
  }
  
  display(){
	  return this.graphics;
  }
  
  isMoveable(){
	  return true;
  }
  
  isDrillable(){
	  return true;
  }
}