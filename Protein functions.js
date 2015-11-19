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