function update_DNA_cage(){
	if(isMouseDown){
		var MovementVector = Mouse_delta.clone();
		var MovementAngle = MovementVector.length() / 3;
		
		var MovementAxis = new THREE.Vector3(-MovementVector.y, MovementVector.x, 0);
		
		DNA_cage.worldToLocal(MovementAxis);
		MovementAxis.normalize();
		DNA_cage.rotateOnAxis(MovementAxis, MovementAngle);
		DNA_cage.updateMatrixWorld();
		
		
		//var correction_rotation = -TAU * 0.016;
		correction_rotation += 0.0004;
		console.log(correction_rotation);
		for(var i = 0; i<60; i++){
			var strand_avg = new THREE.Vector3();
			for(var j = 0; j<50; j++){
				strand_avg.x += DNA_cage.geometry.attributes.position.array[(i*50+j)*3+0];
				strand_avg.y += DNA_cage.geometry.attributes.position.array[(i*50+j)*3+1];
				strand_avg.z += DNA_cage.geometry.attributes.position.array[(i*50+j)*3+2];
			}
			strand_avg.normalize();
			for(var j = 0; j<50; j++){
				var ourpoint = new THREE.Vector3(DNA_vertices_numbers[(i*50+j)*3+0],DNA_vertices_numbers[(i*50+j)*3+1],DNA_vertices_numbers[(i*50+j)*3+2]);
				ourpoint.applyAxisAngle(strand_avg,-0.0004);
				
				DNA_cage.geometry.attributes.position.array[(i*50+j)*3+0] = ourpoint.x;
				DNA_cage.geometry.attributes.position.array[(i*50+j)*3+1] = ourpoint.y;
				DNA_cage.geometry.attributes.position.array[(i*50+j)*3+2] = ourpoint.z;
			}
		}
		DNA_cage.geometry.attributes.position.needsUpdate = true;
		//so to correct them we want to rotate around an axis pointing at the average position
	}
}

function init_DNA_cage(){
	DNA_cage = new THREE.Line( new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color: 0xf0f00f}), THREE.LinePieces);
	 
	var avg = new THREE.Vector3();
	for(var i = 0; i<DNA_vertices_numbers.length / 3; i++){
		avg.x += DNA_vertices_numbers[i*3+0];
		avg.y += DNA_vertices_numbers[i*3+1];
		avg.z += DNA_vertices_numbers[i*3+2];
	}
	avg.multiplyScalar(3/DNA_vertices_numbers.length);
	console.log(avg)
	var scaleFactor = 2.3/109; //this sort of says "we want the first point to be 3 away from the center"
	for(var i = 0; i<DNA_vertices_numbers.length / 3; i++){
		DNA_vertices_numbers[i*3+0] -= avg.x;
		DNA_vertices_numbers[i*3+1] -= avg.y;
		DNA_vertices_numbers[i*3+2] -= avg.z;
		
		DNA_vertices_numbers[i*3+0] *= scaleFactor;
		DNA_vertices_numbers[i*3+1] *= scaleFactor;
		DNA_vertices_numbers[i*3+2] *= scaleFactor;
	}
	
	
	
	DNA_cage.geometry.addAttribute( 'position', new THREE.BufferAttribute( DNA_vertices_numbers, 3 ) );
	var DNA_colors = new Float32Array(DNA_vertices_numbers.length);
	DNA_cage.geometry.addAttribute( 'color', new THREE.BufferAttribute(DNA_colors, 3) );
	
	var DNA_line_pairs = new Uint16Array(DNA_vertices_numbers.length / 3 * 2)
	
	for(var i = 0; i<60;i++){ //each of the 60 strands has 50 "atoms"
		for(var j = 0; j<50; j++){
			if(j==49){
				DNA_line_pairs[ 2*(i*50+j) ] = i*50+j-1;
				DNA_line_pairs[2*(i*50+j)+1] = i*50+j-1; //we do something special here to join them, probably
				//search through all the points at the beginnings and ends of other strands, find whose first atom is closest.
				
				DNA_colors[(i*50+j)*3+0] = 0; DNA_colors[(i*50+j)*3+1] = 0; DNA_colors[(i*50+j)*3+2] = 0;
			}
			else if(j%2==0) {//base
				DNA_line_pairs[ 2*(i*50+j) ] = 0;
				DNA_line_pairs[2*(i*50+j)+1] = 0;
				
				DNA_colors[(i*50+j)*3+0] = 1; DNA_colors[(i*50+j)*3+1] = 0; DNA_colors[(i*50+j)*3+2] = 0;
			}
			else {//backbone
				DNA_line_pairs[ 2*(i*50+j) ] = i*50+j-1;
				DNA_line_pairs[2*(i*50+j)+1] = i*50+j+1;
				
				DNA_colors[(i*50+j)*3+0] = 0; DNA_colors[(i*50+j)*3+1] = 0; DNA_colors[(i*50+j)*3+2] = 0;
			}
		}
	} 
	
//	for(var i = 0; i < 6000; i++){
//		DNA_line_pairs[i] = 0;
//	}
//	DNA_line_pairs[0] = 0
	
	console.log(DNA_cage.geometry);
	DNA_cage.geometry.addAttribute( 'index', new THREE.BufferAttribute( DNA_line_pairs, 1 ) );
}