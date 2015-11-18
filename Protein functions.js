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
			if(mouse_dist_from_protein < protein_radius)
				selected_object = 4; //protein selected
			
			var anchor_point_radius = 0.1;
			for(var i = 0; i<anchor_points.length; i++){
				var mouse_dist_from_anchorpoint = Math.sqrt(Math.pow(MousePosition.x - anchor_points[i].position.x,2) + Math.pow(MousePosition.y - anchor_points[i].position.y,2));
				if(mouse_dist_from_anchorpoint < anchor_point_radius)
					selected_object = i+1;
			}
		}
		
//		if(selected_object == 4){
////			protein.position.x+=Mouse_delta.x;
////			protein.position.y+=Mouse_delta.y;
//			var MovementVector = Mouse_delta.clone();
//			var MovementAngle = MovementVector.length() / 3;
//			
//			var MovementAxis = new THREE.Vector3(-MovementVector.y, MovementVector.x, 0);
//			MovementAxis.normalize();
//			
//			for(var i = 0; i<anchor_points.length; i++)
//				anchor_points[i].position.applyAxisAngle(MovementAxis, MovementAngle);
//		}
		
		if(selected_object == 1 || selected_object == 2 || selected_object == 3){
			anchor_points[selected_object-1].material.color.r = 0;
			
			{
				var moving_index = selected_object - 1;
				anchor_points[moving_index].position.x = MousePosition.x;
				anchor_points[moving_index].position.y = MousePosition.y;
			}
		}
		protein.fix_to_anchors(anchor_points[0].position.clone(), anchor_points[2].position.clone(), anchor_points[1].position.clone());
	}
}

//this function won't alter the passed vectors
protein.fix_to_anchors = function(desired_corner0,desired_corner1,desired_corner2) {
	var desired_vectors = new THREE.Matrix3(
		desired_corner0.x,desired_corner0.y,desired_corner0.z,
		desired_corner1.x,desired_corner1.y,desired_corner1.z,
		desired_corner2.x,desired_corner2.y,desired_corner2.z);
//	var current_vectors = 
	
	
	
	//could you do all this with matrices?
    this.position.copy(desired_corner0);
    this.updateMatrixWorld();
    
    var desired_corner1_local = desired_corner1.clone();
    this.worldToLocal(desired_corner1_local);
    
    var firstangle = this.edge1.angleTo(desired_corner1_local);
    if(firstangle > 0.0001){
    	var firstaxis = this.edge1.clone();
        firstaxis.cross(desired_corner1_local);
        firstaxis.normalize();
        
    	this.rotateOnAxis(firstaxis,firstangle);
        this.updateMatrixWorld();
    }
    
    var undirected_secondaxis = this.edge1.clone();
    undirected_secondaxis.normalize();
    
    var desired_corner2_local = desired_corner2.clone();
    this.worldToLocal(desired_corner2_local);
    var projected_desired_corner2 = vec_on_plane_perp_to_axis(desired_corner2_local, undirected_secondaxis);
	var projected_current_corner2 = vec_on_plane_perp_to_axis(this.edge2, undirected_secondaxis);
	
	var secondangle = projected_desired_corner2.angleTo(projected_current_corner2 );
	if(secondangle > 0.0001){
		//possible speedup opportunity... could work this out from angle, considering sin.
		var secondaxis = new THREE.Vector3();
		secondaxis.crossVectors(projected_desired_corner2,projected_current_corner2);
		secondaxis.normalize();
		
		this.rotateOnAxis(secondaxis,-secondangle);
	    this.updateMatrixWorld();
	}
};

//assumes the plane of projection will go through the origin
function vec_on_plane_perp_to_axis(point, axis_top){
	var crosses = new THREE.Vector3();
	crosses.crossVectors(axis_top, point);
	crosses.cross(axis_top);
	return crosses; //length tells you nothing
}

//we want to make this a method associated with all the proteins
//protein will always snap anchor0 to origin, anchor1 to axis, anchor2 to mover, so take care of that!
//TODO: can clean up by making the protein's origin anchor0
//purple, blue, yellow

//better for thinking about data if it's one protein per object, and maybe for animations.
//But better for CK part?
//function fix_to_anchors(myprotein, anchor0_world,anchor1_world,anchor2_world) {
//	var world_anchor0 = new THREE.Vector3();
//	var world_anchor1 = new THREE.Vector3();
//	var world_anchor2 = new THREE.Vector3();
//	
//	world_anchor0.copy(myprotein.anchor0);
//	myprotein.localToWorld(world_anchor0);
//	
//	var firstmovement = anchor0_world.clone();
//	firstmovement.sub(world_anchor0);
//	myprotein.position.add(firstmovement);
//	myprotein.updateMatrixWorld();
//	
//	var desired_edge = anchor1_world.clone();
//	myprotein.worldToLocal(desired_edge);
//	desired_edge.sub(myprotein.anchor0);
//	var current_edge = myprotein.anchor1.clone();
//	current_edge.sub(myprotein.anchor0);
//	var cosfirstangle = desired_edge.dot(current_edge) / current_edge.length() / desired_edge.length();
//	if( -1 < cosfirstangle && cosfirstangle < 1){
//		var firstangle = -Math.acos(cosfirstangle);
//		var firstaxis = new THREE.Vector3();
//		firstaxis.crossVectors(desired_edge,current_edge);
//		firstaxis.normalize();
//		
//		myprotein.translateOnAxis(myprotein.anchor0_unit,myprotein.anchor0_length);
//		myprotein.rotateOnAxis(firstaxis, firstangle);
//		myprotein.translateOnAxis(myprotein.anchor0_unit,-myprotein.anchor0_length);
//		myprotein.updateMatrixWorld();
//	}
//	
//	//ok so we project anchor2 and corner_mover onto our final axis, gets their hinge points, sub them, then get cross, dot, etc
//	var axis_edge = new THREE.Vector3(); //guess you could just have this in there
//	axis_edge.copy(myprotein.anchor1);
//	axis_edge.sub(myprotein.anchor0);
//	axis_edge.normalize();
//	
//	current_edge.copy(myprotein.anchor2);
//	current_edge.sub(myprotein.anchor0);
//	var current_edge_hingepoint = axis_edge.clone();
//	current_edge_hingepoint.multiplyScalar(current_edge.dot(axis_edge));
//	var current_edge_hinge = current_edge.clone();
//	current_edge_hinge.sub(current_edge_hingepoint);
//	
//	desired_edge.copy(anchor2_world);
//	myprotein.worldToLocal(desired_edge);
//	desired_edge.sub(myprotein.anchor0);
//	var desired_edge_hingepoint = axis_edge.clone();
//	desired_edge_hingepoint.multiplyScalar(desired_edge.dot(axis_edge));
//	var desired_edge_hinge = desired_edge.clone();
//	desired_edge_hinge.sub(desired_edge_hingepoint);
//	
//	var cossecondangle = desired_edge.dot(current_edge) / current_edge.length() / desired_edge.length();
//	if( -1 < cossecondangle && cossecondangle < 1){
//		var lastangle = -Math.acos(cossecondangle);
//		var lastaxis = new THREE.Vector3();
//		lastaxis.crossVectors(desired_edge,current_edge);
//		lastaxis.normalize();
//		
//		myprotein.translateOnAxis(myprotein.anchor0_unit,myprotein.anchor0_length);
//		myprotein.rotateOnAxis(lastaxis, lastangle);
//		myprotein.translateOnAxis(myprotein.anchor0_unit,-myprotein.anchor0_length);
//		myprotein.updateMatrixWorld();
//	}
//}