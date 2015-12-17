//this function won't alter the passed vectors
function fix_protein_to_anchors(desired_corner0,desired_corner1,desired_corner2, myprotein) {
	var basis_vec1 = desired_corner1.clone();
	basis_vec1.sub(desired_corner0);
	var basis_vec2 = desired_corner2.clone();
	basis_vec2.sub(desired_corner0);
	var basis_vec0 = new THREE.Vector3();
	//not normalizing (or anything like normalizing) this causes a kind of distortion in "z", but that is probably ok
	basis_vec0.crossVectors(basis_vec1, basis_vec2);
	
	for(var i = 0; i < protein.geometry.attributes.position.array.length / 3; i++){
		myprotein.geometry.attributes.position.array[i*3+0] = atom_vertices_components[i*3+0] * basis_vec0.x + atom_vertices_components[i*3+1] * basis_vec1.x + atom_vertices_components[i*3+2] * basis_vec2.x;
		myprotein.geometry.attributes.position.array[i*3+1] = atom_vertices_components[i*3+0] * basis_vec0.y + atom_vertices_components[i*3+1] * basis_vec1.y + atom_vertices_components[i*3+2] * basis_vec2.y;
		myprotein.geometry.attributes.position.array[i*3+2] = atom_vertices_components[i*3+0] * basis_vec0.z + atom_vertices_components[i*3+1] * basis_vec1.z + atom_vertices_components[i*3+2] * basis_vec2.z;
	}
	
	myprotein.position.copy(desired_corner0);
    myprotein.updateMatrixWorld();
    myprotein.geometry.attributes.position.needsUpdate = true;
}

//assumes the plane of projection will go through the origin
function vec_on_plane_perp_to_axis(point, axis_top){
	var crosses = new THREE.Vector3();
	crosses.crossVectors(axis_top, point);
	crosses.cross(axis_top);
	return crosses; //length tells you nothing
}

//Import protein
//We may wish to do this or that with it. You could skew the proteins upwards, which might give clear protuberances. But those might be unnoticeable and unnecessary given nice colors
function init_static_capsid() {
	protein_vertices_indices[0]  = new Uint16Array([0,2,1]);
	protein_vertices_indices[1]  = new Uint16Array([1,2,7]);  
	protein_vertices_indices[2]  = new Uint16Array([2,8,7]);
	protein_vertices_indices[3]  = new Uint16Array([8,11,7]);
	protein_vertices_indices[4]  = new Uint16Array([0,3,2]);
	protein_vertices_indices[5]  = new Uint16Array([3,8,2]);
	protein_vertices_indices[6]  = new Uint16Array([9,8,3]);
	protein_vertices_indices[7]  = new Uint16Array([9,11,8]);
	protein_vertices_indices[8]  = new Uint16Array([4,3,0]);
	protein_vertices_indices[9]  = new Uint16Array([4,9,3]);
	protein_vertices_indices[10] = new Uint16Array([10,9,4]);
	protein_vertices_indices[11] = new Uint16Array([11,9,10]);
	protein_vertices_indices[12] = new Uint16Array([4,0,5]);
	protein_vertices_indices[13] = new Uint16Array([10,4,5]);
	protein_vertices_indices[14] = new Uint16Array([10,5,6]);
	protein_vertices_indices[15] = new Uint16Array([11,10,6]);
	protein_vertices_indices[16] = new Uint16Array([5,0,1]);
	protein_vertices_indices[17] = new Uint16Array([5,1,6]);
	protein_vertices_indices[18] = new Uint16Array([6,1,7]);
	protein_vertices_indices[19] = new Uint16Array([6,7,11]);
	
	//we got that wrong
	for(var i = 0; i < 20; i++){
		var temp = protein_vertices_indices[i][1];
		protein_vertices_indices[i][1] = protein_vertices_indices[i][2];
		protein_vertices_indices[i][2] = temp;
	}
	
	for(var i = 0; i < protein_vertices_numbers.length; i++){
		protein_vertices_numbers[i] /= 32; 
	}
	
	var threefold_axis = new THREE.Vector3(1,1,1);
	threefold_axis.normalize();
	for(var i = 0; i < protein_vertices_numbers.length / 3 / 3; i++){
		var point = new THREE.Vector3(	protein_vertices_numbers[i*3+0],
										protein_vertices_numbers[i*3+1],
										protein_vertices_numbers[i*3+2]);
		point.applyAxisAngle(threefold_axis, TAU / 3);
		protein_vertices_numbers[i*3 + 0 + protein_vertices_numbers.length / 3] = point.x;
		protein_vertices_numbers[i*3 + 1 + protein_vertices_numbers.length / 3] = point.y;
		protein_vertices_numbers[i*3 + 2 + protein_vertices_numbers.length / 3] = point.z;
		point.applyAxisAngle(threefold_axis, TAU / 3);
		protein_vertices_numbers[i*3 + 0 + 2*protein_vertices_numbers.length / 3] = point.x;
		protein_vertices_numbers[i*3 + 1 + 2*protein_vertices_numbers.length / 3] = point.y;
		protein_vertices_numbers[i*3 + 2 + 2*protein_vertices_numbers.length / 3] = point.z;
	}
	protein.geometry.addAttribute( 'position', new THREE.BufferAttribute( protein_vertices_numbers, 3 ) );
	
	for(var i = coarse_protein_triangle_indices.length / 3; i<coarse_protein_triangle_indices.length * 2 / 3; i++){
		coarse_protein_triangle_indices[i] += protein_vertices_numbers.length / 3 / 3;
	}
	for(var i = coarse_protein_triangle_indices.length * 2 / 3; i<coarse_protein_triangle_indices.length; i++){
		coarse_protein_triangle_indices[i] += protein_vertices_numbers.length / 3 / 3 * 2;
	}
	protein.geometry.addAttribute( 'index', new THREE.BufferAttribute( coarse_protein_triangle_indices, 1 ) );
	protein.geometry.computeFaceNormals();
	protein.geometry.computeVertexNormals();
	
	/* for vector (x,y,z), perp distance from the plane perp to the vector (1,1,1) through the origin = abs(x+y+z) / sqrt(3)
	 * It is somewhat arbitrary to define that as the center though. It is a spherical sort of thing after all
	 * In theory you should be able to multiply the below by a scalar without changing bocavirus.
	 * You may want to do this in order to make larger viruses more contiguous.
	 */
	var protein_vertical_center = 0;
	for(var i = 0; i < protein_vertices_numbers.length / 9; i++)
		protein_vertical_center += Math.abs( protein_vertices_numbers[i*3] + protein_vertices_numbers[i*3+1] + protein_vertices_numbers[i*3+2] );
	protein_vertical_center /= (protein_vertices_numbers.length / 9);
	protein_vertical_center /= Math.sqrt(3);
	
	var anchorpointmaterial = new THREE.MeshLambertMaterial({color: 0xf0f00f});
	for(var i = 0; i< anchor_points.length; i++){
		anchor_points[i] = new THREE.Mesh( new THREE.SphereGeometry( 0.05 ), anchorpointmaterial.clone() );
		if(i==0) anchor_points[i].position.set(1,PHI,0);
		if(i==1) anchor_points[i].position.set(PHI,0,1);
		if(i==2) anchor_points[i].position.set(0,1,PHI);
		anchor_points[i].position.normalize();
		anchor_points[i].position.multiplyScalar(protein_vertical_center * Math.sin(TAU/5) / (Math.sqrt(3)/12*(3+Math.sqrt(5))));
	}
	
	//to get the components, we need the inverse of the matrix of its current basis vectors
	var basis_vec1 = anchor_points[1].position.clone();
	basis_vec1.sub(anchor_points[0].position);
	var basis_vec2 = anchor_points[2].position.clone();
	basis_vec2.sub(anchor_points[0].position);
	var basis_vec0 = new THREE.Vector3();
	basis_vec0.crossVectors(basis_vec1, basis_vec2);
	var basis_matrix = new THREE.Matrix4();
	basis_matrix.set(	basis_vec0.x,basis_vec1.x,basis_vec2.x,	0,
						basis_vec0.y,basis_vec1.y,basis_vec2.y,	0,
						basis_vec0.z,basis_vec1.z,basis_vec2.z,	0,
						0,0,0,1);
	var conversion_matrix = new THREE.Matrix3();
	conversion_matrix.getInverse(basis_matrix,1);
	
	protein.position.copy(anchor_points[0].position);
	for(var i = 0; i < protein.geometry.attributes.position.array.length / 3; i++){
		protein.geometry.attributes.position.array[i*3+0] -= protein.position.x; 
		protein.geometry.attributes.position.array[i*3+1] -= protein.position.y;
		protein.geometry.attributes.position.array[i*3+2] -= protein.position.z;
	}
	
	atom_vertices_components = new Float32Array( protein.geometry.attributes.position.array.length );
	for(var i = 0; i<atom_vertices_components.length; i++){
		atom_vertices_components[i*3+0] = protein.geometry.attributes.position.array[i*3+0] * conversion_matrix.elements[0] + protein.geometry.attributes.position.array[i*3+1] * conversion_matrix.elements[3] + protein.geometry.attributes.position.array[i*3+2] * conversion_matrix.elements[6];
		atom_vertices_components[i*3+1] = protein.geometry.attributes.position.array[i*3+0] * conversion_matrix.elements[1] + protein.geometry.attributes.position.array[i*3+1] * conversion_matrix.elements[4] + protein.geometry.attributes.position.array[i*3+2] * conversion_matrix.elements[7];
		atom_vertices_components[i*3+2] = protein.geometry.attributes.position.array[i*3+0] * conversion_matrix.elements[2] + protein.geometry.attributes.position.array[i*3+1] * conversion_matrix.elements[5] + protein.geometry.attributes.position.array[i*3+2] * conversion_matrix.elements[8];
	}
	
	bocavirus_vertices[0] = new THREE.Vector3(0, 		1,   PHI);
	bocavirus_vertices[1] = new THREE.Vector3( PHI,	0, 	 1);
	bocavirus_vertices[2] = new THREE.Vector3(0,		-1,  PHI);
	bocavirus_vertices[3] = new THREE.Vector3(-PHI,	0, 	 1);
	bocavirus_vertices[4] = new THREE.Vector3(-1, 	PHI, 0);
	bocavirus_vertices[5] = new THREE.Vector3( 1, 	PHI, 0);
	bocavirus_vertices[6] = new THREE.Vector3( PHI,	0,	 -1);
	bocavirus_vertices[7] = new THREE.Vector3( 1,		-PHI,0);
	bocavirus_vertices[8] = new THREE.Vector3(-1,		-PHI,0);
	bocavirus_vertices[9] = new THREE.Vector3(-PHI,	0,	 -1);
	bocavirus_vertices[10] = new THREE.Vector3(0, 	1,	 -PHI);
	bocavirus_vertices[11] = new THREE.Vector3(0,		-1,	 -PHI);
	
	for(var i = 0; i < bocavirus_vertices.length; i++)
		bocavirus_vertices[i].multiplyScalar(1.45);
	
	for(var i = 0; i<protein_array.length; i++){
		protein_array[i] = new THREE.Mesh( protein.geometry.clone(), protein.material.clone());

		fix_protein_to_anchors(	bocavirus_vertices[protein_vertices_indices[i][0]],
								bocavirus_vertices[protein_vertices_indices[i][1]],
								bocavirus_vertices[protein_vertices_indices[i][2]], protein_array[i]);
	}
	
	{
		var lights = [];
		
		lights[0] = new THREE.PointLight( 0xffffff, 0.6 );
		lights[1] = new THREE.PointLight( 0xffffff, 0.6 );
		lights[2] = new THREE.PointLight( 0xffffff, 0.6 );
		lights[3] = new THREE.PointLight( 0xffffff, 0.6 );
		
		lights[0].position.set( 0, 100, 30 );
		lights[1].position.set( 100, 0, 30 );
		lights[2].position.set( -100, 0, 30 );
		lights[3].position.set( 0, -100, 30 );
	
		scene.add( lights[0] );
		scene.add( lights[1] );
		scene.add( lights[2] );
		scene.add( lights[3] );
	}
}