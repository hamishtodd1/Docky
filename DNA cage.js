function update_DNA_cage(){
	if(isMouseDown){
		var MovementVector = Mouse_delta.clone();
		var MovementAngle = MovementVector.length() / 3;
		
		var MovementAxis = new THREE.Vector3(-MovementVector.y, MovementVector.x, 0);
		
		DNA_cage.worldToLocal(MovementAxis);
		MovementAxis.normalize();
		DNA_cage.rotateOnAxis(MovementAxis, MovementAngle);
		DNA_cage.updateMatrixWorld();
	}
}

function init_DNA_cage(){
	DNA_cage = new THREE.Line( new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color: 0xf0f00f,vertexColors: THREE.VertexColors}), THREE.LinePieces);
	 
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
	
	var correction_rotation = -0.1; //gotten "heuristically"
	console.log(correction_rotation);
	for(var i = 0; i<60; i++){
		var strand_avg = new THREE.Vector3();
		for(var j = 0; j<50; j++){
			strand_avg.x += DNA_cage.geometry.attributes.position.array[(i*50+j)*3+0];
			strand_avg.y += DNA_cage.geometry.attributes.position.array[(i*50+j)*3+1];
			strand_avg.z += DNA_cage.geometry.attributes.position.array[(i*50+j)*3+2];
		}
//		strand_avg.multiplyScalar(3 / DNA_cage.geometry.attributes.position.array.length);
//		strand_avg //so what would be nice would be to rotate them a bit so that you remove those kinks. Some cross product.
		strand_avg.normalize(); //not a great way of doing it.
		for(var j = 0; j<50; j++){
			var ourpoint = new THREE.Vector3(DNA_vertices_numbers[(i*50+j)*3+0],DNA_vertices_numbers[(i*50+j)*3+1],DNA_vertices_numbers[(i*50+j)*3+2]);
			ourpoint.applyAxisAngle(strand_avg,correction_rotation);
			
			DNA_cage.geometry.attributes.position.array[(i*50+j)*3+0] = ourpoint.x;
			DNA_cage.geometry.attributes.position.array[(i*50+j)*3+1] = ourpoint.y;
			DNA_cage.geometry.attributes.position.array[(i*50+j)*3+2] = ourpoint.z;
		}
	}
	DNA_cage.geometry.attributes.position.needsUpdate = true;
	
	var DNA_colors = new Float32Array(DNA_vertices_numbers.length);
	var DNA_line_pairs = new Uint16Array(DNA_vertices_numbers.length / 3 * 2);
	
	for(var i = 0; i<60;i++){ //each of the 60 strands has 50 "atoms"
		for(var j = 0; j<50; j++){
			if(j==49){
				var closest_quadrance_so_far = 10000;
				var closest_index_so_far = 666;
				
				for( var k = 0; k < 60; k++){
					if(k==i)
						continue;
					
					if(quadrance_between_DNA_points(i*50+j,k*50) < closest_quadrance_so_far){
						closest_index_so_far = k*50;
						closest_quadrance_so_far = quadrance_between_DNA_points(i*50+j,k*50);
					}
					if(quadrance_between_DNA_points(i*50+j,k*50+49) < closest_quadrance_so_far){
						closest_index_so_far = k*50+49;
						closest_quadrance_so_far = quadrance_between_DNA_points(i*50+j,k*50+49);
					}
				}
				
				DNA_line_pairs[ 2*(i*50+j) ] = i*50+j-1;
				DNA_line_pairs[2*(i*50+j)+1] = closest_index_so_far;
				
				DNA_colors[(i*50+j)*3+0] = 1; DNA_colors[(i*50+j)*3+1] = 0; DNA_colors[(i*50+j)*3+2] = 0;
			}
			else if(j%2==0) {//base
				DNA_line_pairs[ 2*(i*50+j) ] = i*50+j;
				DNA_line_pairs[2*(i*50+j)+1] = i*50+j+1;
				
				DNA_colors[(i*50+j)*3+0] = 0; DNA_colors[(i*50+j)*3+1] = 0; DNA_colors[(i*50+j)*3+2] = 0;
			}
			else {//backbone
				DNA_line_pairs[ 2*(i*50+j) ] = i*50+j-1;
				DNA_line_pairs[2*(i*50+j)+1] = i*50+j+1;
				
				DNA_colors[(i*50+j)*3+0] = 1; DNA_colors[(i*50+j)*3+1] = 0; DNA_colors[(i*50+j)*3+2] = 0;
			}
		}
	}
	DNA_cage.geometry.addAttribute( 'color', new THREE.BufferAttribute(DNA_colors, 3) );
	DNA_cage.geometry.addAttribute( 'index', new THREE.BufferAttribute( DNA_line_pairs, 1 ) );
}

function quadrance_between_DNA_points(index1,index2){
	var dX = DNA_cage.geometry.attributes.position.array[index1*3+0] - DNA_cage.geometry.attributes.position.array[index2*3+0];
	var dY = DNA_cage.geometry.attributes.position.array[index1*3+1] - DNA_cage.geometry.attributes.position.array[index2*3+1];
	var dZ = DNA_cage.geometry.attributes.position.array[index1*3+2] - DNA_cage.geometry.attributes.position.array[index2*3+2];
	
	return dX*dX + dY*dY + dZ*dZ;
}