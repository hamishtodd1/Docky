//better for thinking about data if it's one protein per object, and maybe for animations.
//But better for CK part?

function update_protein() {
	if(!isMouseDown) {
		selected_object = 0;
		anchor_points[0].material.color.r = 1;
		anchor_points[1].material.color.r = 1;
		anchor_points[2].material.color.r = 1;
	}
	
	if(isMouseDown) {
		if(selected_object == 0 ){ //nothing selected, we must select the thing
			var mouse_dist_from_protein = Math.sqrt(Math.pow(MousePosition.x - protein.position.x,2) + Math.pow(MousePosition.y - protein.position.y,2));
			var protein_radius = 2;
			selected_object = 4; //protein selected
		}
		
		if(selected_object == 4){
//			protein.position.x+=Mouse_delta.x;
//			protein.position.y+=Mouse_delta.y;
			var MovementVector = Mouse_delta.clone();
			var MovementAngle = MovementVector.length() / 3;
			
			var MovementAxis = new THREE.Vector3(-MovementVector.y, MovementVector.x, 0);
			MovementAxis.normalize();
			
			for(var i = 0; i<virtual_icosahedron_vertices.length; i++)
				virtual_icosahedron_vertices[i].applyAxisAngle(MovementAxis, MovementAngle);
		}
		
		if(selected_object == 1 || selected_object == 2 || selected_object == 3){
			anchor_points[selected_object-1].material.color.r = 0;
			var moving_index = selected_object - 1;
			anchor_points[moving_index].position.x = MousePosition.x;
			anchor_points[moving_index].position.y = MousePosition.y;
		}
	}
//	fix_protein_to_anchors(anchor_points[0].position, anchor_points[1].position, anchor_points[2].position, protein);
	for(var i = 0; i<protein_array.length; i++)
		fix_protein_to_anchors(	virtual_icosahedron_vertices[protein_vertices_indices[i][0]],
								virtual_icosahedron_vertices[protein_vertices_indices[i][1]],
								virtual_icosahedron_vertices[protein_vertices_indices[i][2]], protein_array[i]);
}

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
		myprotein.geometry.attributes.position.array[i*3+0] = atom_vertices_components[i][0] * basis_vec0.x + atom_vertices_components[i][1] * basis_vec1.x + atom_vertices_components[i][2] * basis_vec2.x;
		myprotein.geometry.attributes.position.array[i*3+1] = atom_vertices_components[i][0] * basis_vec0.y + atom_vertices_components[i][1] * basis_vec1.y + atom_vertices_components[i][2] * basis_vec2.y;
		myprotein.geometry.attributes.position.array[i*3+2] = atom_vertices_components[i][0] * basis_vec0.z + atom_vertices_components[i][1] * basis_vec1.z + atom_vertices_components[i][2] * basis_vec2.z;
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
	
	for(var i = 0; i < protein_vertices_numbers.length; i++){
		protein_vertices_numbers[i] /= 32; 
	}
	
	var protein_center = 0;
	for(var i = 0; i < protein_vertices_numbers.length / 3; i++)
		protein_center += Math.abs( protein_vertices_numbers[i*3] + protein_vertices_numbers[i*3+1] + protein_vertices_numbers[i*3+2] );
	protein_center /= Math.sqrt(3);  //for vector (x,y,z), perp distance from the plane perp to the vector (1,1,1) through the origin = abs(x+y+z) / sqrt(3) 
	protein_center /= protein_vertices_numbers.length / 3;
	
	console.log(protein_vertices_numbers.length / 3 / 3);
	
	protein.material.size = 6;//1.6;
	protein.material.sizeAttenuation = false;
	protein.material.vertexColors = THREE.VertexColors;
	
	var protein_colors = new Float32Array(protein_vertices_numbers.length);
	for( var i = 0; i < protein_vertices_numbers.length / 3 / 3; i++){
		protein_colors[i*3 + 0] = 0.5;
		protein_colors[i*3 + 1] = 0;
		protein_colors[i*3 + 2] = 1;
		
		protein_colors[i*3 + 0 + 3*protein_vertices_numbers.length / 3 / 3] = 1;
		protein_colors[i*3 + 1 + 3*protein_vertices_numbers.length / 3 / 3] = 1;
		protein_colors[i*3 + 2 + 3*protein_vertices_numbers.length / 3 / 3] = 0;
		
		protein_colors[i*3 + 0 + 6*protein_vertices_numbers.length / 3 / 3] = 0;
		protein_colors[i*3 + 1 + 6*protein_vertices_numbers.length / 3 / 3] = 0.5;
		protein_colors[i*3 + 2 + 6*protein_vertices_numbers.length / 3 / 3] = 1;
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
	protein.geometry.addAttribute( 'color', new THREE.BufferAttribute(protein_colors, 3) );
	
	var anchorpointmaterial = new THREE.MeshLambertMaterial({
		color: 0xf0f00f
	});
	for(var i = 0; i< anchor_points.length; i++){
		anchor_points[i] = new THREE.Mesh( new THREE.SphereGeometry( 0.05 ), anchorpointmaterial.clone() );
		if(i==0) anchor_points[i].position.set(1,PHI,0);
		if(i==1) anchor_points[i].position.set(PHI,0,1);
		if(i==2) anchor_points[i].position.set(0,1,PHI);
		anchor_points[i].position.normalize();
		anchor_points[i].position.multiplyScalar(protein_center * Math.sin(TAU/5) / (Math.sqrt(3)/12*(3+Math.sqrt(5))));
	}
	
	protein.position.copy(anchor_points[0].position);
	for(var i = 0; i < protein.geometry.attributes.position.array.length / 3; i++){
		protein.geometry.attributes.position.array[i*3+0] -= protein.position.x; 
		protein.geometry.attributes.position.array[i*3+1] -= protein.position.y;
		protein.geometry.attributes.position.array[i*3+2] -= protein.position.z;
	}
	
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
	
	atom_vertices_components = Array(protein.geometry.attributes.position.array.length / 3);
	for(var i = 0; i<atom_vertices_components.length; i++){
		atom_vertices_components[i] = new Float32Array(3);
		atom_vertices_components[i][0] = protein.geometry.attributes.position.array[i*3+0] * conversion_matrix.elements[0] + protein.geometry.attributes.position.array[i*3+1] * conversion_matrix.elements[3] + protein.geometry.attributes.position.array[i*3+2] * conversion_matrix.elements[6];
		atom_vertices_components[i][1] = protein.geometry.attributes.position.array[i*3+0] * conversion_matrix.elements[1] + protein.geometry.attributes.position.array[i*3+1] * conversion_matrix.elements[4] + protein.geometry.attributes.position.array[i*3+2] * conversion_matrix.elements[7];
		atom_vertices_components[i][2] = protein.geometry.attributes.position.array[i*3+0] * conversion_matrix.elements[2] + protein.geometry.attributes.position.array[i*3+1] * conversion_matrix.elements[5] + protein.geometry.attributes.position.array[i*3+2] * conversion_matrix.elements[8];
	}
	
	for(var i = 0; i<protein_array.length; i++){
		protein_array[i] = new THREE.PointCloud( protein.geometry.clone(), protein.material.clone());
		protein_array[i].fix_to_anchors = protein.fix_to_anchors;
	}
	console.log(protein, protein_array[0]);
	
	virtual_icosahedron_vertices[0] = new THREE.Vector3(0, 		1,   PHI);
	virtual_icosahedron_vertices[1] = new THREE.Vector3( PHI,	0, 	 1);
	virtual_icosahedron_vertices[2] = new THREE.Vector3(0,		-1,  PHI);
	virtual_icosahedron_vertices[3] = new THREE.Vector3(-PHI,	0, 	 1);
	virtual_icosahedron_vertices[4] = new THREE.Vector3(-1, 	PHI, 0);
	virtual_icosahedron_vertices[5] = new THREE.Vector3( 1, 	PHI, 0);
	virtual_icosahedron_vertices[6] = new THREE.Vector3( PHI,	0,	 -1);
	virtual_icosahedron_vertices[7] = new THREE.Vector3( 1,		-PHI,0);
	virtual_icosahedron_vertices[8] = new THREE.Vector3(-1,		-PHI,0);
	virtual_icosahedron_vertices[9] = new THREE.Vector3(-PHI,	0,	 -1);
	virtual_icosahedron_vertices[10] = new THREE.Vector3(0, 	1,	 -PHI);
	virtual_icosahedron_vertices[11] = new THREE.Vector3(0,		-1,	 -PHI);
	
	var edgelen = virtual_icosahedron_vertices[0].distanceTo(virtual_icosahedron_vertices[1]);
	lowest_unused_protein = 0;
	
	for(var i = 0; i<protein_array.length; i++)
		fix_protein_to_anchors(	virtual_icosahedron_vertices[protein_vertices_indices[i][0]],
								virtual_icosahedron_vertices[protein_vertices_indices[i][1]],
								virtual_icosahedron_vertices[protein_vertices_indices[i][2]], protein_array[i]);
}