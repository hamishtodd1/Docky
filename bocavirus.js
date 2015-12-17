function deduce_most_of_surface(openness, vertices_numbers) {
	for( var i = 3; i < 22; i++) {
		var a_index = vertices_derivations[i][0];
		var b_index = vertices_derivations[i][1];
		var c_index = vertices_derivations[i][2];
			
		var a_net = new THREE.Vector3( //this is our origin
			flatnet_vertices.array[a_index * 3 + 0],
			flatnet_vertices.array[a_index * 3 + 1],
			0);	
		
		var net_crossbar_unit = new THREE.Vector3(
			flatnet_vertices.array[b_index*3+0],
			flatnet_vertices.array[b_index*3+1],
			0);
		net_crossbar_unit.sub(a_net);
		net_crossbar_unit.normalize();
		
		var d_net = new THREE.Vector3( 
			flatnet_vertices.array[i*3+0],
			flatnet_vertices.array[i*3+1],
			0);
		d_net.sub(a_net);
		var d_hinge_origin_length = d_net.length() * get_cos( d_net, net_crossbar_unit);
		var d_hinge_net = d_net.clone();
		var d_hinge_origin_net = new THREE.Vector3(
				net_crossbar_unit.x * d_hinge_origin_length,
				net_crossbar_unit.y * d_hinge_origin_length,
				net_crossbar_unit.z * d_hinge_origin_length);
		d_hinge_net.sub( d_hinge_origin_net );
		
		var a = new THREE.Vector3(
			vertices_numbers.array[a_index * 3 + 0],
			vertices_numbers.array[a_index * 3 + 1],
			vertices_numbers.array[a_index * 3 + 2]);	
		var b = new THREE.Vector3(
			vertices_numbers.array[b_index * 3 + 0],
			vertices_numbers.array[b_index * 3 + 1],
			vertices_numbers.array[b_index * 3 + 2]);
		var c = new THREE.Vector3(
			vertices_numbers.array[c_index * 3 + 0],
			vertices_numbers.array[c_index * 3 + 1],
			vertices_numbers.array[c_index * 3 + 2]);
		
		var bend_angle = minimum_angles[i] + openness * (TAU/2 - minimum_angles[i]);
		
		var d = bent_down_quad_corner(a,b,c,bend_angle,d_hinge_origin_length, d_hinge_net.length());
		
		vertices_numbers.setXYZ(i, d.x,d.y,d.z);
	}
}

function update_bocavirus() {
	//if you're on DNA_CAGE_MODE then we unfold, if you're on STATIC_PROTEIN_MODE we fold.
	
	if(isMouseDown) {
		bocavirus_MovementAngle = Mouse_delta.length() / 3;
		bocavirus_MovementAxis.set(-Mouse_delta.y, Mouse_delta.x, 0);
		bocavirus_MovementAxis.normalize();
	}
	else {
		bocavirus_MovementAngle *= 0.93;
	}
	
	var DNA_cage_axis = bocavirus_MovementAxis.clone();
	DNA_cage.worldToLocal(DNA_cage_axis);
	DNA_cage.rotateOnAxis(DNA_cage_axis, bocavirus_MovementAngle);
	DNA_cage.updateMatrixWorld();
	for(var i = 0; i<bocavirus_vertices.length; i++)
		bocavirus_vertices[i].applyAxisAngle(bocavirus_MovementAxis, bocavirus_MovementAngle);

	for(var i = 0; i<protein_array.length; i++){
		fix_protein_to_anchors(	bocavirus_vertices[protein_vertices_indices[i][0]],
								bocavirus_vertices[protein_vertices_indices[i][1]],
								bocavirus_vertices[protein_vertices_indices[i][2]], protein_array[i]);
	}
}