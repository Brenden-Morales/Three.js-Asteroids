function newGame(scene){
		
		//line coloring
	    var letterMaterial = new THREE.LineBasicMaterial( { color: 0xffffff} );
	    //holds vertices for drawing various asteroids
	    var letterGeometry = new THREE.Geometry();

	    //"N"
	    letterGeometry.vertices.push(new THREE.Vector3(0,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(0,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(0,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(2,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(2,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(2,5,0));

	    //"E"
	    letterGeometry.vertices.push(new THREE.Vector3(3,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(3,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(3,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(5,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(3,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(5,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(3,2.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(5,2.5,0));

	    //"W"
	    letterGeometry.vertices.push(new THREE.Vector3(6,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(6.5,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(6.5,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(7,2.5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(7,2.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(7.5,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(7.5,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(8,5,0));

	    //"G"
	    letterGeometry.vertices.push(new THREE.Vector3(11,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(11,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(11,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(13,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(11,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(13,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(13,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(13,2.5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(13,2.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(12,2.5,0));

	    //"A"
	    letterGeometry.vertices.push(new THREE.Vector3(14,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(15,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(15,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(16,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(14.5,2.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(15.5,2.5,0));

	    //"M"
	    letterGeometry.vertices.push(new THREE.Vector3(17,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(17,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(17,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(18,2.5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(18,2.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(19,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(19,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(19,0,0));

	    //"E"
	    letterGeometry.vertices.push(new THREE.Vector3(20,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(20,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(20,5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(22,5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(20,0,0));
	    letterGeometry.vertices.push(new THREE.Vector3(22,0,0));

	    letterGeometry.vertices.push(new THREE.Vector3(20,2.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(22,2.5,0));

	    //"Y"
	    letterGeometry.vertices.push(new THREE.Vector3(5.5,-2,0));
	    letterGeometry.vertices.push(new THREE.Vector3(6.5,-4.5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(6.5,-4.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(7.5,-2,0));

		letterGeometry.vertices.push(new THREE.Vector3(6.5,-4.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(6.5,-7,0));

	    //"/"
	    letterGeometry.vertices.push(new THREE.Vector3(8.5,-7,0));
	    letterGeometry.vertices.push(new THREE.Vector3(10.5,-2,0));

	    //"N"
	    letterGeometry.vertices.push(new THREE.Vector3(11.5,-7,0));
	    letterGeometry.vertices.push(new THREE.Vector3(11.5,-2,0));

	    letterGeometry.vertices.push(new THREE.Vector3(13.5,-7,0));
	    letterGeometry.vertices.push(new THREE.Vector3(13.5,-2,0));

	    letterGeometry.vertices.push(new THREE.Vector3(11.5,-2,0));
	    letterGeometry.vertices.push(new THREE.Vector3(13.5,-7,0));

	    //"?"
	    letterGeometry.vertices.push(new THREE.Vector3(15.5,-7,0));
	    letterGeometry.vertices.push(new THREE.Vector3(15.5,-4.5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(15.5,-4.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(16.5,-4.5,0));

	    letterGeometry.vertices.push(new THREE.Vector3(16.5,-4.5,0));
	    letterGeometry.vertices.push(new THREE.Vector3(16.5,-2,0));

	    letterGeometry.vertices.push(new THREE.Vector3(16.5,-2,0));
	    letterGeometry.vertices.push(new THREE.Vector3(14.5,-2,0));





	    //create the lettering from verts
	    var mainMessage = new THREE.Line(letterGeometry, letterMaterial, THREE.LinePieces);
	    mainMessage.position.set(-11 * 20,0,-1);
	    mainMessage.scale.set(20,20,1);
	    scene.add(mainMessage);

	    this.hide = function(){
	    	mainMessage.position.z = -1;
	    }

	    this.show = function(){
	    	mainMessage.position.z = 50;
	    }

	    this.shown = function(){
	    	if(mainMessage.position.z == -1) return false;
	    	else if (mainMessage.position.z == 50) return true;
	    }
}