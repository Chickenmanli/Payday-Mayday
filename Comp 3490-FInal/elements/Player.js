class Player {
  constructor(pointX, pointY, size) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.size = size;
    this.drillCharges = 0;
  }
  
  init(){
	  var glow = new THREE.MeshPhongMaterial( { 
		    specular: 0x050505,
		    shininess: 200
		} );
			glow.color.setRGB( 255, 165, 0 );
		this.graphics = new THREE.Mesh(//bottom left stand
					new THREE.SphereGeometry( this.size/4, 32, 32 ), glow);
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
  
  getX(){
	  return this.pointX;
  }
  
  getY(){
	  return this.pointY;
  }
  
  //return true drill has started
  //return false if player cant drill
  startDrill(){
	  if(this.drillCharges > 0)
	  {
		  this.drillCharges--;
		  return true;
	  }else{
		  return false;
	  }
	  
  }
  
  pickUpDrill(drillCharges){
	  this.drillCharges += drillCharges;
  }
  
  isDrillable(){
	  return false;
  }
  
  display(){
	  return this.graphics;
  }
}