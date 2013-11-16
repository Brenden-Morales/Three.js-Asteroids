function SpaceShip(scene, time, viewportSize, scale){
	"use strict";


	//the current vector for speed / direction of the spaceship
	var shipMomentum = new THREE.Vector3(0,0,0);

	var invincible = false;
	var invincibleTime = 0;

	//last time the ship was updated
	var lastTime = time;
	var timeDelta;
	function updateTime(t){
		if(lastTime == t) return;
		else{
			timeDelta = (t - lastTime) / 1000;
			lastTime = t;
		}
	}

	//whether or not we want to show exhaust
	var showExhaust = false;

	//the last time the ship fired a shot
	var lastShot = 0;

	//the white line we use to draw the spaceship
    var shipMaterial = new THREE.LineBasicMaterial( { color: 0xffffff} );
    //holds vertices for drawing the spaceship
    var shipGeometry = new THREE.Geometry();
    //holds vertices for drawing the spaceship "exhaust"
    var exhaustGeometry = new THREE.Geometry();

    //create spaceship vertices
    shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
    shipGeometry.vertices.push(new THREE.Vector3(2,-3,0));
    shipGeometry.vertices.push(new THREE.Vector3(1,-2,0));
    shipGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
    shipGeometry.vertices.push(new THREE.Vector3(-2,-3,0));
    shipGeometry.vertices.push(new THREE.Vector3(0,3,0));

    //create exhaust vertices
    exhaustGeometry.vertices.push(new THREE.Vector3(1,-2,0));
    exhaustGeometry.vertices.push(new THREE.Vector3(0,-4,0));
    exhaustGeometry.vertices.push(new THREE.Vector3(-1,-2,0));

    //create the spaceship and exhaust
    var spaceShip = new THREE.Line(shipGeometry, shipMaterial, THREE.LineStrip);
    var shipExhaust = new THREE.Line(exhaustGeometry, shipMaterial, THREE.LineStrip);

    //set position and scale of the spaceship / exhaust
    spaceShip.position.set(0,0,750);
    spaceShip.scale.set(scale,scale,1);
    shipExhaust.position.set(0,0,0);
    shipExhaust.scale.set(scale,scale,1);
    
    //add spaceship and exhaust to the scene
    scene.add(spaceShip);
    scene.add(shipExhaust);

    this.setPosition = function(v){
    	spaceShip.position.set(v.x,v.y,v.z);
    	shipExhaust.position.set(v.x,v.y,0);
    }
    this.setRotation = function(v){
    	spaceShip.rotation.z = v.z;
        shipExhaust.rotation.z = v.z;
    }
    this.setMomentum = function(v){
    	shipMomentum.copy(v);
    }
    this.clear = function(){
    	scene.remove(spaceShip);
    	scene.remove(shipExhaust);
    }

    this.setInvincible = function(){
    	invincible = true;
    }
    this.getInvincible = function(t){
    	updateTime(t);
    	if(invincible){
    		invincibleTime += timeDelta;
    		if(invincibleTime >= 5){
    			invincible = false;
    			invincibleTime = 0;
    		}
    	}
    	return invincible;
    }
    

    this.rotateLeft = function(t){
    	updateTime(t);
    	spaceShip.rotation.z += 6 * timeDelta;
        shipExhaust.rotation.z += 6 * timeDelta;
    }

    this.rotateRight = function(t){
    	updateTime(t);
    	spaceShip.rotation.z -= 6 * timeDelta;
        shipExhaust.rotation.z -= 6 * timeDelta;
    }

    this.goForward = function(t){
    	updateTime(t);
    	var forwardVector = new THREE.Vector3(0, 10 * timeDelta, 0);
        var rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationFromEuler(spaceShip.rotation);
        forwardVector.applyMatrix4(rotationMatrix);

        //check to see if we're going too fast
        //var newMomentum = new THREE.Vector3();
        //newMomentum.copy(forwardVector);
        //newMomentum.add(shipMomentum);
        //if(newMomentum.add(shipMomentum).length() < 5){
        	shipMomentum.add(forwardVector);
        //}
        
        //make sure ship doesn't go too fast
        if(shipMomentum.x > 5) shipMomentum.x = 5;
        if(shipMomentum.x < -5) shipMomentum.x = -5;
        if(shipMomentum.y > 5) shipMomentum.y = 5;
        if(shipMomentum.y < -5) shipMomentum.y = -5;
        //show exhaust
        showExhaust = true;
        shipExhaust.position.z = 1;
    }

    this.shoot = function(t, held){
    	updateTime(t);

    	//set time based on whether or not space was held
    	var shotdelay = held ? 350 : 100;

    	//check to see if enough time has elapsed since the last shot
    	if(lastTime - lastShot > shotdelay){
    		lastShot = lastTime;
    		var b = new Bullet(spaceShip.position, spaceShip.rotation, scale, scene, lastTime, viewportSize);
    		return b;
    	}
    	
    }

    this.draw = function(t){
    	updateTime(t);

    	//show exhaust?
    	if(showExhaust) shipExhaust.position.z = 1;
    	else shipExhaust.position.z = 0;
    	showExhaust = false;

    	var tempMomentum = new THREE.Vector3();
    	tempMomentum.copy(shipMomentum);
    	tempMomentum.multiplyScalar(50 * timeDelta);

    	//ships position
        spaceShip.position.add(tempMomentum);
        shipExhaust.position.add(tempMomentum);

        if(spaceShip.position.x < viewportSize / -2){
            spaceShip.position.x = viewportSize / 2;
            shipExhaust.position.x = viewportSize / 2;
        }
        if(spaceShip.position.x > viewportSize / 2){ 
            spaceShip.position.x = viewportSize / -2;
            shipExhaust.position.x = viewportSize / -2;
        }
        if(spaceShip.position.y < viewportSize / -2){ 
            spaceShip.position.y = viewportSize / 2;
            shipExhaust.position.y = viewportSize / 2;
        }
        if(spaceShip.position.y > viewportSize / 2){ 
            spaceShip.position.y = viewportSize / -2;
            shipExhaust.position.y = viewportSize / -2;
        }
    }

    this.getVertices = function(){
    	var verts = [];
    	for (var i = 0; i < spaceShip.geometry.vertices.length; i ++){
    		var Vec = new THREE.Vector3();
    		Vec.copy(spaceShip.geometry.vertices[i]);
    		Vec.applyAxisAngle(new THREE.Vector3(0,0,1), spaceShip.rotation.z);
    		Vec.add(spaceShip.position);
    		verts.push(Vec);
    	}
    	return verts;
    }

}

function Bullet(shipLocation, shipRotation, scale, scene, time, viewportSize){

	//time the bullet was created
	var startTime = time;

	//last time the bullet was updated
	var lastTime = time;
	var timeDelta;
	function updateTime(t){
		if(lastTime == t) return;
		else{
			timeDelta = (t - lastTime) / 1000;
			lastTime = t;
		}
	}

	var whiteMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
	var bullet = new THREE.Mesh( new THREE.PlaneGeometry( 1 * scale, 1 * scale, 1, 1 ), whiteMaterial );
    
    //spawn bullet on ships nose
	var noseVector = new THREE.Vector3(0,3 * scale, 0);
	var m = new THREE.Matrix4();
	m.makeRotationFromEuler(shipRotation);
	noseVector.applyMatrix4(m);
	bullet.position.copy(shipLocation);
	bullet.position.add(noseVector);

	//rotate bullet to match ships rotation
	bullet.rotation.copy(shipRotation);
    scene.add(bullet);

    this.destroy = function(){
    	scene.remove(bullet);
    }

    this.checkTime = function(t){
    	updateTime(t);
    	if(lastTime - startTime > 1000) return false;
    	else return true;
    }

    this.move = function(){

    	var movement = new THREE.Vector3(0,10,0);
    	var m = new THREE.Matrix4();
		m.makeRotationFromEuler(bullet.rotation);
		movement.applyMatrix4(m);
    	bullet.position.add(movement);

    	//check to see if we went pass viewport bounds
    	if(bullet.position.x < viewportSize / -2){
            bullet.position.x = viewportSize / 2;
        }
        if(bullet.position.x > viewportSize / 2){ 
            bullet.position.x = viewportSize / -2;
        }
        if(bullet.position.y < viewportSize / -2){ 
            bullet.position.y = viewportSize / 2;
        }
        if(bullet.position.y > viewportSize / 2){ 
            bullet.position.y = viewportSize / -2;
        }
    }

    this.position = function(){
    	return bullet.position;
    }
}