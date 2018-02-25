////////////////////////////////////////////////////////////////////////////////

/* COMP 3490 A1 Skeleton for Claw Machine (Barebones Edition) 
 * Note that you may make use of the skeleton provided, or start from scratch.
 * The choice is up to you.
 * Read the assignment directions carefully
 * Your claw mechanism should be created such that it is represented hierarchically
 * You might consider looking at THREE.Group and THREE.Object3D for reference
 * If you want to play around with the canvas position, or other HTML/JS level constructs
 * you are welcome to do so.


 /*global variables, coordinates, clock etc.  */
var camera, scene, renderer;
var cameraControls;
var objMap, terrainMap;
var tileSize;
var player;
var playerDirection;
var animating;
var playerViewDistance;
var cameraRotateSpeed, playerMoveSpeed, objectMoveSpeed;
var playerViewPOV, playerToMirrorPOV, topDownPOV;
var objective;
var objectiveSpotLight, playerSpotLight;
var ground;
var mapLevels, currentLevel;
var glassXPositive, glassXNegative, glassYPositive, glassYNegative;
var MAXLEVEL = 5;
var mirrorCamera, mirror; //Need to be reset via clearmap
var ambientLight;
var drillImage;//stored mesh of the drill when it finishes loading, this will be cloned
var hasFinishedInit;//Used for images that require processing time to load, the game will not load until the images have finished
var welcomeObject;
var welcomePageUp;
var clock = new THREE.Clock();

//0 = nothing
//1 = player
//2 = objective
//3 = wall
//4 = crate
//5 = ice
//6 = drill
//Needs at least player and objective
function generateMapLevel(theLevel){
	welcomeObject = null;
	switch(theLevel) {
    case 0:
    	var level = [
    		[0 , 0 , 3 , 3 , 3 , 3 , 3, 3],
    		[0 , 3 , 3 , 0 , 3 , 2 , 3, 3],
    		[0 , 3 , 0 , 4 , 4 , 0 , 0, 3],
    		[0 , 3 , 0 , 0 , 3 , 3 , 3, 3],
    		[0 , 3 , 4 , 3 , 3 , 0 , 0, 0],
    		[0 , 3 , 0 , 3 , 0 , 0 , 0, 0],
    		[3 , 3 , 0 , 3 , 0 , 0 , 0, 0],
    		[0 , 3 , 1 , 3 , 0 , 0 , 0, 0],
    		[0 , 3 , 3 , 3 , 0 , 0 , 0, 0]
    	]
    	mapLevels[0] = level;
    	tileSize = 50;
    	cameraRotateSpeed = 500;
    	playerMoveSpeed = 500;
    	objectMoveSpeed = playerMoveSpeed/2;
    	playerViewDistance = 2;
    	playerViewPOV = true;
    	playerToMirrorPOV = false;
		topDownPOV = false;
    	animating = false;
    	playerDirection = new THREE.Vector2(0,-playerViewDistance);
        break;
    
        //--------------------------------------------------------------------
    case 1:
    	var level = [
    		[0 , 0 , 0 , 0 , 0 , 3 , 3, 3],
    		[3 , 3 , 3 , 3 , 3 , 3 , 2, 3],
    		[0 , 4 , 0 , 4 , 0 , 4 , 0, 4],
    		[4 , 0 , 4 , 0 , 4 , 0 , 4, 0],
    		[1 , 4 , 0 , 4 , 0 , 4 , 0, 4],
    		[4 , 0 , 4 , 0 , 4 , 0 , 4, 0],
    	]
    	mapLevels[1] = level;
    	tileSize = 50;
    	cameraRotateSpeed = 500;
    	playerMoveSpeed = 500;
    	objectMoveSpeed = playerMoveSpeed/2;
		playerViewDistance = 2;
		playerViewPOV = true;
		playerToMirrorPOV = false;
		topDownPOV = false;
		animating = false;
		playerDirection = new THREE.Vector2(0,-playerViewDistance);
        break;
    
        //--------------------------------------------------------------------
    case 2:
    	var level = [
    		[0 , 0 , 3 , 0 , 0 , 0 , 5 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
    		[3 , 3 , 3 , 0 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 0 , 0],
    		[1 , 0 , 0 , 5 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2],
    		[3 , 3 , 3 , 0 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 0 , 0],
    		[0 , 0 , 3 , 0 , 0 , 0 , 5 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
    	]
    	mapLevels[2] = level;
    	tileSize = 50;
    	cameraRotateSpeed = 500;
    	playerMoveSpeed = 500;
    	objectMoveSpeed = playerMoveSpeed/2;
		playerViewDistance = 2;
		playerViewPOV = true;
		playerToMirrorPOV = false;
		topDownPOV = false;
		animating = false;
		playerDirection = new THREE.Vector2(0,-playerViewDistance);
        break;
    
        //--------------------------------------------------------------------
    case 3:
    	var level = [
    		[3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 0 , 0 , 0 , 3, 3],
    		[0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 3, 3],
    		[0 , 0 , 3 , 3 , 3 , 3 , 0 , 3 , 3 , 3 , 3 , 3 , 3 , 0 , 0, 3],
    		[3 , 0 , 3 , 3 , 0 , 3 , 0 , 3 , 3 , 3 , 0 , 0 , 3 , 0 , 0, 0],
    		[3 , 5 , 0 , 0 , 0 , 0 , 5 , 0 , 0 , 5 , 0 , 0 , 0 , 0 , 3, 0],
    		[3 , 0 , 3 , 3 , 3 , 0 , 0 , 3 , 3 , 3 , 3 , 3 , 3 , 0 , 0, 0],
    		[3 , 1 , 3 , 0 , 3 , 0 , 3 , 0 , 3 , 3 , 3 , 3 , 3 , 2 , 3, 3]
    	]
    	mapLevels[3] = level;
    	tileSize = 50;
    	cameraRotateSpeed = 500;
    	playerMoveSpeed = 500;
    	objectMoveSpeed = playerMoveSpeed/2;
		playerViewDistance = 2;
		playerViewPOV = true;
		playerToMirrorPOV = false;
		topDownPOV = false;
		animating = false;
		playerDirection = new THREE.Vector2(0,-playerViewDistance);
        break;
    
        //--------------------------------------------------------------------
    case 4:
    	var level = [
    		[3 , 3 , 6 , 3 , 3 , 3 , 3 , 3],
    		[3 , 3 , 6 , 3 , 3 , 3 , 3 , 3],
    		[6 , 3 , 5 , 3 , 3 , 3 , 6 , 3],
    		[0 , 3 , 0 , 3 , 3 , 3 , 6 , 3],
    		[1 , 0 , 4 , 0 , 3 , 3 , 6 , 3],
    		[3 , 3 , 4 , 3 , 3 , 3 , 3 , 3],
    		[3 , 3 , 6 , 3 , 3 , 3 , 3 , 3],
    		[3 , 3 , 6 , 3 , 3 , 3 , 3 , 2]
    	]
    	mapLevels[4] = level;
    	tileSize = 50;
    	cameraRotateSpeed = 500;
    	playerMoveSpeed = 500;
    	objectMoveSpeed = playerMoveSpeed/2;
		playerViewDistance = 2;
		playerViewPOV = true;
		playerToMirrorPOV = false;
		topDownPOV = false;
		animating = false;
		playerDirection = new THREE.Vector2(0,-playerViewDistance);
        break;
    
        //--------------------------------------------------------------------
  default:
        alert("cannot generate map");
	}
}

function createLevel(level)
{
	var x = mapLevels[level][0].length;
	var y = mapLevels[level].length;
	
	
	//Terrain map
	terrainMap = new TileMap(x,y);
	terrainMap.initMap();
	for (var i = 0; i < y; i++) { 
		for (var j = 0; j < x; j++) {
			var obj = new Grass(j,i,tileSize);
			obj.init();
			terrainMap.setTileData(j,i,obj);
			scene.add(obj.display());
		}
	}
	
	//Init map
	objMap = new TileMap(x,y);
	objMap.initMap();
	for (var i = 0; i < y; i++) { 
		for (var j = 0; j < x; j++) {
			switch(mapLevels[level][i][j]) {
		    case 0:
		    	//add nothing
		        break;
		    case 1:
		    	addPlayer(j,i);
		        break;
		    case 2:
		    	addObjectiveObject(j,i);
		        break;
		    case 3:
		    	addImpassableObject(j,i);
		        break;
		    case 4:
		    	addMoveableObject(j,i);
		        break;
		    case 5:
		    	addIceObject(j,i);
		        break;
		    case 6:
		    	addDrillObject(j,i);
		        break;
		    default:
		        alert("createLevel(): didnt read element properly");
			}
		}
	}
	  
	//Init camera
	camera.position.set( player.getX()*tileSize, 0, player.getY()*tileSize);
	rotateCamera(playerDirection.getComponent(0),playerDirection.getComponent(1));
	
	scene.fog = new THREE.Fog( 0x808080, 1, ( playerViewDistance + 1 ) * tileSize);
	
	playerSpotLight = new THREE.SpotLight( 0xffffff, 20, (playerViewDistance + 1) * tileSize, (playerViewDistance * Math.PI/8));
	playerSpotLight.position.set( player.getX() * tileSize, playerViewDistance * tileSize, player.getY() * tileSize );
	scene.add(playerSpotLight);
	playerSpotLight.target = player.display();
	playerSpotLight.target.updateMatrixWorld();
	
	objectiveSpotLight = new THREE.SpotLight( 0xffffff, 5, (playerViewDistance + 1) * tileSize, (playerViewDistance * Math.PI/8));
	objectiveSpotLight.position.set( objective.pointX * tileSize, playerViewDistance * tileSize, objective.pointY * tileSize );
	scene.add(objectiveSpotLight);
	objectiveSpotLight.target = objective.display();
	objectiveSpotLight.target.updateMatrixWorld();
	
	//createGround();
	visualizeBounds();
	addReflection();
	
	var spotLightHelper = new THREE.SpotLightHelper( playerSpotLight );
	//scene.add( spotLightHelper );
	
	var spotLightHelper1 = new THREE.SpotLightHelper( objectiveSpotLight );
	//scene.add( spotLightHelper1 );
}

//Ambient light is never removed - its in init() and not createlevel()
function clearMap(){
	var tx = terrainMap.pointX;
	var ty = terrainMap.pointY;
	var data = null;
	
	for (var ti = 0; ti < tx; ti++) { 
		for (var tj = 0; tj < ty; tj++) {
			data = terrainMap.getTileData(ti,tj);
			if(data != null)
			{
				scene.remove(data.display());
				terrainMap.setTileData(ti,tj,null);
			}
		}
	}
	
	var x = objMap.pointX;
	var y = objMap.pointY;
	var data = null;
	
	for (var i = 0; i < x; i++) { 
		for (var j = 0; j < y; j++) {
			data = objMap.getTileData(i,j);
			if(data != null)
			{
				scene.remove(data.display());
				objMap.setTileData(i,j,null);
			}
		}
	}
	
	scene.remove(objectiveSpotLight);
	objectiveSpotLight = null;
	scene.remove(playerSpotLight);
	playerSpotLight = null;
	
	scene.remove(glassXPositive);
	glassXPositive = null;
	scene.remove(glassXNegative);
	glassXNegative = null
	scene.remove(glassYPositive);
	glassYPositive = null;
	scene.remove(glassYNegative);
	glassYNegative = null
	
	scene.remove(mirror);
	mirror = null;
	
	scene.remove(mirrorCamera);
	mirrorCamera = null;
	
	tileSize = 0;
	cameraRotateSpeed = 0;
	playerMoveSpeed = 0;
	playerViewDistance = 0;
	playerViewPOV = false;
	playerToMirrorPOV = false;
	topDownPOV = false;
	animating = false;
	playerDirection = null;
	
	player = null;
	objective = null;
	objMap = null;
	loadedObject = null;
	welcomeObject = null;
}

function addReflection(){
	var height = 300;
	var geom = new THREE.CubeGeometry(objMap.pointX * tileSize, 0, objMap.pointY * tileSize);
	mirrorCamera = new THREE.CubeCamera( 10, 1000, 1080 );
	scene.add( mirrorCamera );
	var mirrorCubeMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, envMap: mirrorCamera.renderTarget } );
	mirror = new THREE.Mesh( geom, mirrorCubeMaterial );
	mirror.position.set(player.getX()*tileSize, height, player.getY()*tileSize);
	mirrorCamera.position.set( player.getX()*tileSize, height, player.getY()*tileSize);//reset cam
	scene.add(mirror);
}

function moveReflection()
{
	var height = 300;
	mirror.position.set(player.getX()*tileSize, height, player.getY()*tileSize);
	mirrorCamera.position.set( player.getX()*tileSize, height, player.getY()*tileSize);
}
/*
function createGround(){
	var grass = new THREE.MeshLambertMaterial();
	grass.map = THREE.ImageUtils.loadTexture('images/grass.png');
	ground = new THREE.Mesh(
				new THREE.BoxGeometry( objMap.pointX * tileSize, 1, objMap.pointY * tileSize ), grass);
	ground.position.x = objMap.pointX * tileSize/2- tileSize/2;
	ground.position.y = -tileSize/2;
	ground.position.z = objMap.pointY * tileSize/2 - tileSize/2;
	scene.add(ground);
}
*/
function resetToPlayerPOV(){
	playerViewPOV = true;
	playerToMirrorPOV = false;
	topDownPOV = false;
	camera.position.set( player.getX()*tileSize, 0, player.getY()*tileSize);
	cameraControls.target.set( ( player.getX() + playerDirection.getComponent(0) ) * tileSize ,0, ( player.getY() + playerDirection.getComponent(1) )* tileSize);
	scene.fog = new THREE.Fog( 0x808080, 1, ( playerViewDistance + 1 ) * tileSize);
	ambientLight.intensity = 0.5;
}

function resetToTopDownPOV(){
	playerViewPOV = false;
	playerToMirrorPOV = false;
	topDownPOV = true;
	camera.position.set(objMap.pointX * tileSize/2,1000, objMap.pointY * tileSize/2)
	cameraControls.target.set(objMap.pointX * tileSize/2, 0, objMap.pointY * tileSize/2);
	scene.fog = new THREE.Fog( 0x808080, 1, 2000);
	ambientLight.intensity = 0;
}

function resetToMirrorPOV(){
	playerViewPOV = false;
	playerToMirrorPOV = true;
	topDownPOV = false;
	camera.position.set( player.getX()*tileSize, 0, player.getY()*tileSize);
	cameraControls.target.set( player.getX() * tileSize + playerDirection.getComponent(0)  ,100, player.getY() * tileSize + playerDirection.getComponent(1));	
	scene.fog = new THREE.Fog( 0x808080, 1, 2000);
	ambientLight.intensity = 0.2;
}

//rotateCamera(0,-1); = North
//rotateCamera(1,0); = East
//rotateCamera(0,1); = South
//rotateCamera(-1,0); = West
function controls(){
	document.addEventListener("keydown", onDocumentKeyDown, false);
	function onDocumentKeyDown(event) {
	    var keyCode = event.which;
	    
	    if (keyCode == 40 && animating == false) {//down
	    	resetToPlayerPOV();
	    	if(playerDirection.equals(new THREE.Vector2(0,-playerViewDistance)))//North
	    	{
	    		playerDirection.set(0,playerViewDistance);//South
	    	}else if(playerDirection.equals(new THREE.Vector2(playerViewDistance,0)))//East
	    	{
	    		playerDirection.set(-playerViewDistance,0);//West
	    	}else if(playerDirection.equals(new THREE.Vector2(0,playerViewDistance)))//South
	    	{
	    		playerDirection.set(0,-playerViewDistance);//North
	    	}else if(playerDirection.equals(new THREE.Vector2(-playerViewDistance,0)))//West
	    	{
	    		playerDirection.set(playerViewDistance,0);//East
	    	}
	    	rotateCamera(playerDirection.getComponent(0),playerDirection.getComponent(1));
	    } else if (keyCode == 37 && animating == false) {//left
	    	resetToPlayerPOV();
	    	if(playerDirection.equals(new THREE.Vector2(0,-playerViewDistance)))//North
	    	{
	    		playerDirection.set(-playerViewDistance,0);//West
	    	}else if(playerDirection.equals(new THREE.Vector2(playerViewDistance,0)))//East
	    	{
	    		playerDirection.set(0,-playerViewDistance);//North
	    	}else if(playerDirection.equals(new THREE.Vector2(0,playerViewDistance)))//South
	    	{
	    		playerDirection.set(playerViewDistance,0);//East
	    	}else if(playerDirection.equals(new THREE.Vector2(-playerViewDistance,0)))//West
	    	{
	    		playerDirection.set(0,playerViewDistance);//South
	    	}
	    	rotateCamera(playerDirection.getComponent(0),playerDirection.getComponent(1));
	    } else if (keyCode == 38 && animating == false) {//up
	    	if(playerToMirrorPOV == true)
    		{
    			resetToPlayerPOV();
    		}else{
    			resetToMirrorPOV();
    		}
	    } else if (keyCode == 39 && animating == false) {//right
	    	resetToPlayerPOV();
	    	if(playerDirection.equals(new THREE.Vector2(0,-playerViewDistance)))//North
	    	{
	    		playerDirection.set(playerViewDistance,0);//East
	    	}else if(playerDirection.equals(new THREE.Vector2(playerViewDistance,0)))//East
	    	{
	    		playerDirection.set(0,playerViewDistance);//South
	    	}else if(playerDirection.equals(new THREE.Vector2(0,playerViewDistance)))//South
	    	{
	    		playerDirection.set(-playerViewDistance,0);//West
	    	}else if(playerDirection.equals(new THREE.Vector2(-playerViewDistance,0)))//West
	    	{
	    		playerDirection.set(0,-playerViewDistance);//North
	    	}
	    	rotateCamera(playerDirection.getComponent(0),playerDirection.getComponent(1));
	    } else if (keyCode == 86) { //"v"
	    	//Top down view of the area
	    	if(animating == false){
	    		if(topDownPOV == true)
	    		{
	    			resetToPlayerPOV();
	    		}else{
	    			resetToTopDownPOV();
	    		}
	    	}
	    } else if (keyCode == 32 && animating == false) { // spacebar
	    	//move player
	    	resetToPlayerPOV();
	    	determinePlayerMovement();
	    }else if (keyCode == 81 && animating == false){ // q
	    	//cheat
	    	currentLevel++;
			if(currentLevel >= MAXLEVEL)
			{
				clearMap();
				alert("Congratulations, you are officially rich (Not in your real dimension)");
			}else{
				clearMap();
				generateMapLevel(currentLevel);
				createLevel(currentLevel);
			}
	    }else if (keyCode == 68 && animating == false){ //d = drill
	    	//drill
	    	attemptDrill();
	    }else if (keyCode == 82 && animating == false){ // r
	    	//reset level
	    	alert("Another pay day has been lost")
			clearMap();
			generateMapLevel(currentLevel);
			createLevel(currentLevel);
	    }else if (keyCode == 8 && welcomePageUp == true){ // backspace
	    	scene.remove(welcomeObject);
	    	welcomeObject = null;
	    	welcomePageUp = false;
	    }
	};
}

function determinePlayerMovement(){
	//alert(player.getX() + "|" + player.getY());
	var playerNewPoint = findDirectionPoint(player.getX(),player.getY());
	var x = playerNewPoint.x;
	var y = playerNewPoint.y;
	//alert("Player: x=" + player.getX() + " | y=" + player.getY() + 
			//" to  x=" + x + " | y=" + y);
	if(!objMap.isOutOfBounds(x,y))
	{
		if(!objMap.intersects(player.getX(),player.getY(),x,y))
		{
			movePlayer(x,y);
		}else{
			if(x == objective.pointX && y == objective.pointY)
			{
				currentLevel++;
				if(currentLevel >= MAXLEVEL)
				{
					clearMap();
					alert("Congratulations, you are officially rich (Not in your real dimension)");
				}else{
					clearMap();
					generateMapLevel(currentLevel);
					createLevel(currentLevel);
				}
				
			}else{
				if(objMap.getTileData(x,y) instanceof Drill)
				{
					collectDrill(x,y);
					movePlayer(x,y);
				}else{
					if(objMap.getTileData(x,y).isMoveable())
					{
						if(objMap.getTileData(x,y) instanceof Ice){
							var currentPoint = new Point(x,y);
							var nextPoint = findDirectionPoint(x,y);
							var occupiedLoc = false;
							if(objMap.isOutOfBounds(nextPoint.x,nextPoint.y)){
								occupiedLoc = true;
							}else{
								occupiedLoc = objMap.intersects(x, y, nextPoint.x, nextPoint.y);
							}
							while(occupiedLoc == false){
								currentPoint = new Point(nextPoint.x,nextPoint.y);
								nextPoint = findDirectionPoint(nextPoint.x,nextPoint.y);
								if(objMap.isOutOfBounds(nextPoint.x,nextPoint.y))
								{
									occupiedLoc = true;
								}else{
									occupiedLoc = objMap.intersects(x, y, nextPoint.x, nextPoint.y);
								}
							}
							//alert(currentPoint.x + "|" + currentPoint.y);
							var hasMovedObject = moveObject(x,y,currentPoint.x,currentPoint.y, objectMoveSpeed);
							//Move player only if the object moved
							if(hasMovedObject)
							{
								//alert("player: " + player.getX() + "|" + player.getY() + " to " + x + "|" + y);
								movePlayer(x,y);
							}
						}else{
							//alert("moveable object collision");
							var objectNewPoint = findDirectionPoint(x,y);
							//Moves the object if successful else it doesnt
							//alert("object: " + playerNewPoint.x + "|" + playerNewPoint.y + " to " + objectNewPoint.x + "|" + objectNewPoint.y);
							var hasMovedObject = moveObject(x,y,objectNewPoint.x,objectNewPoint.y, objectMoveSpeed);
							//Move player only if the object moved
							if(hasMovedObject)
							{
								//alert("player: " + player.getX() + "|" + player.getY() + " to " + x + "|" + y);
								movePlayer(x,y);
							}
						}
						
						
					}else{
						//alert("non-moveable object collision");
					}
				}
			}
		}
	}
	
}

function movePlayer(x,y){
	if(!objMap.isOutOfBounds(x,y))
	{
		objMap.moveTileData(player.getX(),player.getY(),x,y);
		//alert("2: " + player.getX() + "|" + player.getY());
		player.setLocation(x,y,playerMoveSpeed);
		var t = new TWEEN.Tween(camera.position)
    	.to({ x: x * tileSize, y: 0, z: y * tileSize}, playerMoveSpeed);
		t.start();
		animating = true;
		t.onComplete(function(){
			animating = false;
		});
		//camera.position.set( x * tileSize, 0, y * tileSize);
		//Update camera towards new player location
		cameraControls.target.set( ( player.getX() + playerDirection.getComponent(0) ) * tileSize, 0, 
			( player.getY() + playerDirection.getComponent(1) ) * tileSize);
		//Move player's spotlight
		playerSpotLight.position.set( player.getX() * tileSize, playerViewDistance * tileSize, player.getY() * tileSize );
		playerSpotLight.target.updateMatrixWorld();
		//Move reflection
		moveReflection();
	}
	
}

function rotateCamera(deltaX, deltaY){
	var t = new TWEEN.Tween(cameraControls.target)
    .to({ x: (player.getX() + deltaX) * tileSize - 1, y: 0, z: (player.getY() + deltaY) * tileSize - 1}, cameraRotateSpeed);
	t.start();
	animating = true;
	playerViewPOV = true;
	t.onComplete(function(){
		animating = false;
	});
}

function addImpassableObject(pointX,pointY){
	var occupied = objMap.getTileData(pointX,pointY);
	if(occupied == null)
	{
		var obj = new ImpassableObject(pointX,pointY,tileSize);
		obj.init();
		objMap.setTileData(pointX,pointY,obj);
		scene.add(obj.display());
	}else{
		alert("cant add object to occupied location");
	}
}

function addMoveableObject(pointX,pointY){
	var occupied = objMap.getTileData(pointX,pointY);
	if(occupied == null)
	{
		var obj = new MoveableObject(pointX,pointY,tileSize);
		obj.init();
		objMap.setTileData(pointX,pointY,obj);
		scene.add(obj.display());
	}else{
		alert("cant add object to occupied location");
	}
}

function addObjectiveObject(pointX,pointY){
	var occupied = objMap.getTileData(pointX,pointY);
	if(occupied == null)
	{
		objective = new ObjectiveObject(pointX,pointY,tileSize);
		objective.init();
		objMap.setTileData(pointX,pointY,objective);
		scene.add(objective.display());
	}else{
		alert("cant add object to occupied location");
	}
}

function addPlayer(pointX,pointY){
	var occupied = objMap.getTileData(pointX,pointY);
	if(occupied == null)
	{
		player = new Player(pointX,pointY,tileSize);
		player.init();
		objMap.setTileData(pointX,pointY,player);
		scene.add(player.display());
	}else{
		alert("cant add object to occupied location");
	}
}

function addDrillObject(pointX,pointY){
	var occupied = objMap.getTileData(pointX,pointY);
	if(occupied == null)
	{
		var obj = new Drill(pointX,pointY,tileSize);
		obj.init(drillImage.clone());
		objMap.setTileData(pointX,pointY,obj);
		scene.add(obj.display());
	}else{
		alert("cant add object to occupied location");
	}
}

function collectDrill(pointX, pointY){
	var drillCharges = 1;
	var data = objMap.getTileData(pointX,pointY);
	if( !(data instanceof Drill) ){
		alert("collectDrill(), that's not a drill " + pointX + "|" + pointY);
	}else{
		player.pickUpDrill(drillCharges);
		scene.remove(data.display());
		objMap.setTileData(pointX,pointY,null);
	}
}

function attemptDrill(){
	var playerNewPoint = findDirectionPoint(player.getX(),player.getY());
	var x = playerNewPoint.x;
	var y = playerNewPoint.y;
	//alert("Player drilling: x=" + x + " | y=" + y);
	if(!objMap.isOutOfBounds(x,y)){
		if(objMap.intersects(player.getX(),player.getY(),x,y)){
			var data = objMap.getTileData(x,y);
			if(data.isDrillable())
			{
				if(player.startDrill() == true){
					//Not yet
					//scene.remove(data.display());
					objMap.setTileData(x,y,null);
					//Fade out object
					data.display().material.transparent = true;
					var fadeSpeed = playerMoveSpeed/2;
					var t = new TWEEN.Tween(data.display().material)
					.to({ opacity: 0}, fadeSpeed);
					t.start();
					t.onComplete(function(){
						scene.remove(data.display());
					});
				}else{
					alert("Player has no drill charges");
				}
			
			}else{
				alert("That's not drillable");
			}
		}else{
			alert("You tried to drill air - Nice try");
		}
	}else{
		alert("You tried to drill space - Nice try");
	}
	
}

function addIceObject(pointX,pointY){
	var occupied = objMap.getTileData(pointX,pointY);
	if(occupied == null)
	{
		var obj = new Ice(pointX,pointY,tileSize);
		obj.init();
		objMap.setTileData(pointX,pointY,obj);
		scene.add(obj.display());
	}else{
		alert("cant add object to occupied location");
	}
}

//Return true if moving the object was successful
function moveObject(pointX, pointY, newX, newY, speed)
{
	if(objMap.isOutOfBounds(pointX,pointY))
	{
		alert("original location doesnt exist");
		return false;
	}else{
		if(objMap.isOutOfBounds(newX,newY))
		{
			//alert("target location doesnt exist");
			return false;
		}else{
			if(objMap.intersects(pointX, pointY, newX, newY) == false)
			{
				var obj = objMap.getTileData(pointX,pointY);
				obj.setLocation(newX,newY, speed);
				objMap.moveTileData(pointX,pointY,newX,newY);
				return true;
			}else{
				//alert("cant move to occupied location");
				return false;
			}
		}
	}
}

function findDirectionPoint(targetX,targetY)
{
	var x = targetX;
	var y = targetY;
	if(playerDirection.equals(new THREE.Vector2(0,-playerViewDistance)))//North
	{
		y -= 1;
	}else if(playerDirection.equals(new THREE.Vector2(playerViewDistance,0)))//East
	{
		x += 1;
	}else if(playerDirection.equals(new THREE.Vector2(0,playerViewDistance)))//South
	{
		y += 1;
	}else if(playerDirection.equals(new THREE.Vector2(-playerViewDistance,0)))//West
	{
		x -= 1;
	}
	var point = new Point(x,y);
	return point;
}

function visualizeBounds()
{
	var height = 300;
	var glass = new THREE.MeshBasicMaterial();
	glass.transparent = true;
	glass.color.setRGB( 1, 1, 1 );
	glass.opacity = 0.3;
	
	glassXPositive = new THREE.Mesh(
			new THREE.BoxGeometry( 1, height, objMap.pointY * tileSize ), glass);
	glassXPositive.position.x = objMap.pointX * tileSize - (tileSize/2);
	glassXPositive.position.y = height/2 -(tileSize/2);
	glassXPositive.position.z = objMap.pointY * tileSize / 2 - (tileSize/2);
	scene.add( glassXPositive );
	
	glassXNegative = new THREE.Mesh(
			new THREE.BoxGeometry( 1, height, objMap.pointY * tileSize ), glass);
	glassXNegative.position.x = -(tileSize/2);
	glassXNegative.position.y = height/2 -(tileSize/2);
	glassXNegative.position.z = objMap.pointY * tileSize / 2 - (tileSize/2);
	scene.add( glassXNegative );
	
	glassYPositive = new THREE.Mesh(
			new THREE.BoxGeometry( objMap.pointX * tileSize, height, 1 ), glass);
	glassYPositive.position.x = objMap.pointX * tileSize / 2 - (tileSize/2);
	glassYPositive.position.y = height/2 -(tileSize/2);
	glassYPositive.position.z = objMap.pointY * tileSize - (tileSize/2);
	scene.add( glassYPositive );	
	
	glassYNegative = new THREE.Mesh(
			new THREE.BoxGeometry( objMap.pointX * tileSize, height, 1 ), glass);
	glassYNegative.position.x = objMap.pointX * tileSize / 2 - (tileSize/2);
	glassYNegative.position.y = height/2 - (tileSize/2);
	glassYNegative.position.z = -(tileSize/2);
	scene.add( glassYNegative );
}

// Initialization. Define the size of the canvas and store the aspect ratio
// You can change these as well

function init() {
	var canvasWidth = 1280;
	var canvasHeight = 720;
	var canvasRatio = canvasWidth / canvasHeight;

	// Set up a renderer. This will allow WebGL to make your scene appear
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );

	// You also want a camera. The camera has a default position, but you most likely want to change this.
	// You'll also want to allow a viewpoint that is reminiscent of using the machine as described in the pdf
	// This might include a different position and/or a different field of view etc.
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 10000 + 25 );
	// Moving the camera with the mouse is simple enough - so this is provided. However, note that by default,
	// the keyboard moves the viewpoint as well
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.keyPanSpeed = 0;
	
	scene = new THREE.Scene();
	ambientLight = new THREE.AmbientLight( 0x222222 );
	ambientLight.intensity = 7;
	scene.add( ambientLight );

	var gridXZ = new THREE.GridHelper(2000, 100, new THREE.Color(0xCCCCCC), new THREE.Color(0x888888));
	//scene.add(gridXZ);

	var axes = new THREE.AxisHelper(150);
	axes.position.y = 1;
	//scene.add(axes);
 
	currentLevel = 0;
	mapLevels = new Array();
	
	hasFinishedInit = false;
	loadImages();
	welcomePage(canvasWidth,canvasHeight);
}

function loadImages(){
	var loader = new THREE.OBJLoader();
	// load a resource
	loader.load(
		// resource URL
		'images/drill.obj',
		//window scope... the class scope
		function ( object ) {
			drillImage = object;
		},
		// called when resource is loaded
		// called when loading is in progresses
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	);
}

function welcomePage(intX, intY){
	camera.position.set(0,0,860);
	var welIMG = new THREE.MeshLambertMaterial();
	welIMG.map = THREE.ImageUtils.loadTexture('images/welcome.png');
	welcomeObject = new THREE.Mesh(//bottom left stand
			new THREE.BoxGeometry( intX, intY, 1), welIMG);
	scene.add(welcomeObject);
	welcomePageUp = true;
}

	// We want our document object model (a javascript / HTML construct) to include our canvas
	// These allow for easy integration of webGL and HTML
function addToDOM() {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(renderer.domElement);
}

	// This is a browser callback for repainting
	// Since you might change view, or move things
	// We cant to update what appears
function animate() {
	window.requestAnimationFrame(animate);
	render();
	
	if(drillImage != null && hasFinishedInit == false && welcomePageUp == false){
		hasFinishedInit = true;
		generateMapLevel(currentLevel);
		createLevel(currentLevel);
	}
}

	// getDelta comes from THREE.js - this tells how much time passed since this was last called
	// This might be useful if time is needed to make things appear smooth, in any animation, or calculation
	// The following function stores this, and also renders the scene based on the defined scene and camera
function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	TWEEN.update();
	renderer.render(scene, camera);
	if(hasFinishedInit == true)
	{
		mirror.visible = false;
		mirrorCamera.updateCubeMap( renderer, scene );
		if(topDownPOV == false)
		{
			mirror.visible = true;
		}
	}
}

	// Since we're such talented programmers, we include some exception handeling in case we break something
	// a try and catch accomplished this as it often does
	// The sequence below includes initialization, filling up the scene, adding this to the DOM, and animating (updating what appears)
try {
  init();
  controls();
  addToDOM();
  animate();
} catch(error) {
    console.log("You did something bordering on utter madness. Error was:");
    console.log(error);
}
