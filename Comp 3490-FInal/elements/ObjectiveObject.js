class ObjectiveObject {
  constructor(pointX, pointY, size) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.size = size;
    this.graphics = null;
  }
  
  init(){
	  var coin = new THREE.MeshPhongMaterial( { 
		    specular: 0x050505,
		    shininess: 500
		} );
	  coin.map = THREE.ImageUtils.loadTexture('images/coin.png');
	this.graphics = new THREE.Mesh(//bottom left stand
				new THREE.CylinderGeometry( this.size/2, this.size/2, 5, 32 ), coin);
	this.graphics.position.x = this.pointX * this.size;
	this.graphics.position.y = 0;
	this.graphics.position.z = this.pointY * this.size;
	this.graphics.rotation.x = Math.PI / 2;
	this.autoRotate();
  }
  
  autoRotate(){
	  var g = this.display();
	  var t = new TWEEN.Tween( g.rotation )
	  .to( { z: 2 * Math.PI }, 10000 );
	  
		t.onComplete(function(){
			g.rotation.z = 0;
			t.start();
		});
		
		t.start();
  }
  
  //Not using a speed
  setLocation(pointX, pointY, speed)
  {
	  this.graphics.position.x = pointX * this.size;
	  this.graphics.position.z = pointY * this.size;
	  this.pointX = pointX;
	  this.pointY = pointY;
  }
  
  isDrillable(){
	  return false;
  }
  
  display(){
	  return this.graphics;
  }
}