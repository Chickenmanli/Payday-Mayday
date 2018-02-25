class Drill {
  constructor(pointX, pointY, size) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.size = size;
    this.graphics = null;
  }
  
  //0 = handle
  //1 = back
  //2 = base
  //3 = drillbit
  init(graphics)
  {
	  this.graphics = graphics;
	  this.graphics.scale.x = this.size/10;
	  this.graphics.scale.y = this.size/10;
	  this.graphics.scale.z = this.size/10;
	  this.graphics.position.x = this.pointX * this.size;
	  this.graphics.position.y = 0;
	  this.graphics.position.z = this.pointY * this.size;
	  var glow = new THREE.MeshPhongMaterial( { 
		  	color: 0x050505, 
		    specular: 0x050505,
		    shininess: 300,
		    side: THREE.DoubleSide
		} );
	  var brown = new THREE.MeshPhongMaterial( { 
		  	color: 0xA0522D,
		    specular: 0x050505,
		    shininess: 300,
		} );
	  this.graphics.children[0].material = brown;
	  this.graphics.children[1].material = brown;
	  this.graphics.children[2].material = brown;
	  this.graphics.children[3].material = glow;
	  this.autoRotate();
  }
  //Not using a speed
  setLocation(pointX, pointY, speed)
  {
	  this.graphics.position.x = pointX * this.size;
	  this.graphics.position.z = pointY * this.size;
	  this.pointX = pointX;
	  this.pointY = pointY;
  }
  
  autoRotate(){
	  var g = this.display();
	  var t = new TWEEN.Tween( g.rotation )
	  .to( { y: 2 * Math.PI }, 10000 );
	  
		t.onComplete(function(){
			g.rotation.y = 0;
			t.start();
		});
		
		t.start();
  }
  
  isDrillable(){
	  return false;
  }
  
  display(){
	  return this.graphics;
  }
}