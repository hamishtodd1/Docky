function update_protein() {
	if(isMouseDown){
		for(var i = 0; i<23; i++){
			if(protein.geometry.attributes.position.array[i*3]!=0){
				//console.log(protein.geometry.attributes.position.array[i*3], i);
//				protein.geometry.attributes.position.array[i*3+0] = 0;
//				protein.geometry.attributes.position.array[i*3+1] = 0;
//				protein.geometry.attributes.position.array[i*3+2] = 0;
				//console.log(i)
				break;
			}
		}
		protein.geometry.attributes.position.needsUpdate = true;
		
		
		var mouse_dist_from_protein = MousePosition.distanceTo(protein.position); 
		
		var protein_radius = 2;
		
		if(mouse_dist_from_protein < protein_radius) {
			var MovementVector = MousePosition.clone();
			MovementVector.sub(OldMousePosition);
			
			var MovementAxis = new THREE.Vector3(-MovementVector.y, MovementVector.x, 0);
			MovementAxis.normalize();
			
			protein.worldToLocal(MovementAxis);
			
			protein.rotateOnAxis(MovementAxis,MovementVector.length() / 3);
			
			protein.updateMatrixWorld();
		}
	}
}