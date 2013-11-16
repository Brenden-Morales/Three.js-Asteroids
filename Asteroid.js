function Asteroid(scene, scale, difficulty, viewportSize, time, audioContext){

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

	    //set up sounds
	    var largeExplosionBuffer = null;
	    var mediumExplosionBuffer = null;
	    var smallExplosionBuffer = null;
	    function loadSounds(i){

	        var request = new XMLHttpRequest();
	        if(i == 0)request.open('GET', "Sounds/bangLarge.wav", true);
	        if(i == 1)request.open('GET', "Sounds/bangMedium.wav", true);
	        if(i == 2)request.open('GET', "Sounds/bangSmall.wav", true);
	        request.responseType = 'arraybuffer';

	        // Decode asynchronously
	        request.onload = function() {
	            audioContext.decodeAudioData(request.response, function(buffer) {
	            if(i == 0)largeExplosionBuffer = buffer;
	            if(i == 1)mediumExplosionBuffer = buffer;
	            if(i == 2)smallExplosionBuffer = buffer;
	            });
	        }
	        request.send();
	    }
	    loadSounds(0);
	    loadSounds(1);
	    loadSounds(2);

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
	    	if(isNaN(mainAsteroid.position.x)) alert("bFUCK");
	    	that.position.copy(mainAsteroid.position);
	    	if(isNaN(that.position.x)) alert("cFUCK");
	    }
	    

	    //set asteroid scale
	    if(isNaN(mainAsteroid.position.x)) alert("aFUCK");
	    mainAsteroid.scale.set(scale,scale,1);
	    scene.add(mainAsteroid);


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
	    		//large explosion
		        var explosionSource = audioContext.createBufferSource();
		        explosionSource.buffer = largeExplosionBuffer;
		        explosionSource.connect(audioContext.destination);
		        explosionSource.start(0);

		        var seedDate = Date.now();
		        for(var i = 0; i < 3; i ++){
		            var a = new Asteroid(scene,3,that.Difficulty,viewportSize,seedDate, audioContext);
		            a.fixedStart(that.position)
		            childAsteroids.push(a);
		        }
	    	}

	    	if(scale == 3){
	    		//medium explosion
		        var explosionSource = audioContext.createBufferSource();
		        explosionSource.buffer = mediumExplosionBuffer;
		        explosionSource.connect(audioContext.destination);
		        explosionSource.start(0);

	    		var seedDate = Date.now();
		        for(var i = 0; i < 3; i ++){
		            var a = new Asteroid(scene,2,that.Difficulty,viewportSize,seedDate, audioContext);
		            a.fixedStart(that.position)
		            childAsteroids.push(a);
		        }
	    	}

	    	if(scale == 2){
	    		//small explosion
		        var explosionSource = audioContext.createBufferSource();
		        explosionSource.buffer = smallExplosionBuffer;
		        explosionSource.connect(audioContext.destination);
		        explosionSource.start(0);
	    	}

	    	return childAsteroids;
	    }
	}
	catch(err){
		alert(err);
	}
	
}