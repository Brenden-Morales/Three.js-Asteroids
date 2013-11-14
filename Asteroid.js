function Asteroid(scene, scale, difficulty, viewportSize, time){

	try{
		//the white line we use to draw the asteroids
	    var asteroidMaterial = new THREE.LineBasicMaterial( { color: 0xffffff} );
	    //holds vertices for drawing various asteroids
	    var asteroid1Geometry = new THREE.Geometry();
	    //the direction the asteroid is flying
	    var xDMod = Math.random() > .5 ? 1 : -1;
	    var yDMod = Math.random() > .5 ? 1 : -1;
	    var asteroidVector = new THREE.Vector3(Math.random() * difficulty * 75 * xDMod, Math.random() * difficulty * 75 * yDMod, 0);

	    this.position = new THREE.Vector3();
	    this.Difficulty = difficulty;
	    var that = this;


	    //last time the asteroid was updated
		var lastTime = time;
		var timeDelta;
		function updateTime(t){
			if(lastTime == t) return;
			else{
				timeDelta = (t - lastTime) / 1000;
				lastTime = t;
			}
		}

	    //possible asteroid geometry
	    asteroid1Geometry.vertices.push(new THREE.Vector3(-3,-3,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(-4,0,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(-3,4,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(-2,3,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(1,4,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(4,2,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(1,0,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(4,-1,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(2,-4,0));
	    asteroid1Geometry.vertices.push(new THREE.Vector3(-3,-3,0));

	    //create the asteroid
	    var mainAsteroid = new THREE.Line(asteroid1Geometry, asteroidMaterial, THREE.LineStrip);

	    //the bullet hitbox of the asteroid
	    var bulletHitboxVertices = [];
	    bulletHitboxVertices.push(new THREE.Vector3(-4 * scale,-4 * scale,0));
	    bulletHitboxVertices.push(new THREE.Vector3(-4 * scale,4 * scale,0));
	    bulletHitboxVertices.push(new THREE.Vector3(4 * scale,4 * scale,0));
	    bulletHitboxVertices.push(new THREE.Vector3(4 * scale,-4 * scale,0));

	    //check if any of the points collides with this hitbox
	    this.checkCollision = function(points){
	    	for(var i = 0; i < points.length; i ++){
	    		//check vertical plane of hitbox
	    		if(points[i].y < bulletHitboxVertices[1].y && points[i].y > bulletHitboxVertices[0].y ){
	    			//check horizontal plane of the hitbox
	    			if(points[i].x < bulletHitboxVertices[2].x && points[i].x > bulletHitboxVertices[0].x ) {
	    				return true;
	    			}
	    		}
	    	}
	    	return false;
	    }

	    //set a random starting position
	    this.randomStart = function(){
	    	var startX = 0;
	    	var startY = 0;
	    	while(that.checkCollision([new THREE.Vector3(10, 10, 0)])){
	    		startX = Math.random() * viewportSize;
		    	startY = Math.random() * viewportSize;
		    	startX = startX > viewportSize / 2 ? (startX - (viewportSize/2)) * -1 : startX;
		    	startY = startY > viewportSize / 2 ? (startY - (viewportSize/2)) * -1 : startY;
		    	
		    	bulletHitboxVertices = [];
	    		bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(-4 * scale) + startY,0));
	    		bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(4 * scale) + startY,0));
	    		bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(4 * scale) + startY,0));
	    		bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(-4 * scale) + startY,0));

		    	mainAsteroid.position.set(startX, startY, 750);
		    	that.position.copy(mainAsteroid.position);
	    	}
	    	
	    }

	    //a fixed starting position
	    this.fixedStart = function(location){
	    	var startX = location.x;
	    	var startY = location.y;

	    	bulletHitboxVertices = [];
    		bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(-4 * scale) + startY,0));
    		bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + startX,(4 * scale) + startY,0));
    		bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(4 * scale) + startY,0));
    		bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + startX,(-4 * scale) + startY,0));

	    	mainAsteroid.position.set(startX, startY, 750);
	    	that.position.copy(mainAsteroid.position);
	    }
	    

	    //set asteroid scale
	    mainAsteroid.scale.set(scale,scale,1);
	    scene.add(mainAsteroid);

	    if(this.position.x == NaN) alert("FUCK!");

	    function setHitboxXY(xValue, yValue){
	    	bulletHitboxVertices = [];
			bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + xValue,(-4 * scale) + yValue,0));
			bulletHitboxVertices.push(new THREE.Vector3((-4 * scale) + xValue,(4 * scale) + yValue,0));
			bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + xValue,(4 * scale) + yValue,0));
			bulletHitboxVertices.push(new THREE.Vector3((4 * scale) + xValue,(-4 * scale) + yValue,0));
	    }

	    this.draw = function(t){

	    	updateTime(t);
	    	var vec = new THREE.Vector3();
	    	vec.copy(asteroidVector);
	    	vec.multiplyScalar(timeDelta);
	    	mainAsteroid.position.add(vec);
	    	that.position.copy(mainAsteroid.position);

	    	//check to see if we went 
	    	if(mainAsteroid.position.x < viewportSize / -2){
	            mainAsteroid.position.x = viewportSize / 2;
	        }
	        if(mainAsteroid.position.x > viewportSize / 2){ 
	            mainAsteroid.position.x = viewportSize / -2;
	        }
	        if(mainAsteroid.position.y < viewportSize / -2){ 
	            mainAsteroid.position.y = viewportSize / 2;
	        }
	        if(mainAsteroid.position.y > viewportSize / 2){ 
	            mainAsteroid.position.y = viewportSize / -2;
	        }

	        setHitboxXY(mainAsteroid.position.x, mainAsteroid.position.y);
	    }

	    this.destroy = function(){
	    	scene.remove(mainAsteroid);
	    	var childAsteroids = [];

	    	if(scale == 5){
		        var seedDate = Date.now();
		        for(var i = 0; i < 3; i ++){
		            var a = new Asteroid(scene,3,that.Difficulty,viewportSize,seedDate);
		            a.fixedStart(that.position)
		            childAsteroids.push(a);
		        }
	    	}

	    	if(scale == 3){
	    		var seedDate = Date.now();
		        for(var i = 0; i < 3; i ++){
		            var a = new Asteroid(scene,2,that.Difficulty,viewportSize,seedDate);
		            a.fixedStart(that.position)
		            childAsteroids.push(a);
		        }
	    	}

	    	return childAsteroids;
	    }
	}
	catch(err){
		alert(err);
	}
	
}