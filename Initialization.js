function Init(){
	var material = new THREE.MeshLambertMaterial({
		color: 0xf0f00f
	});
	
	var radius = 0.03;
	mouseblob = new THREE.Mesh( new THREE.CircleGeometry( radius ), new THREE.MeshBasicMaterial({color: 0xf0f00f}) );
	scene.add( mouseblob );
	
	indicatorblob = new THREE.Mesh( new THREE.CircleGeometry( 0.1 ), new THREE.MeshBasicMaterial({color: 0xffffff}) );
	scene.add( indicatorblob );
	
	//Import protein
	
	{
		var avg_r = 0; //not really the average, actually the perp distance from the plane perp to the vector (1,1,1) through the origin
		for(var i = 0; i < protein_vertices_numbers.length; i++)
			if(i%3===0) avg_r += Math.abs( protein_vertices_numbers[i] + protein_vertices_numbers[i+1] + protein_vertices_numbers[i+2] );
		avg_r /= Math.sqrt(3);
		avg_r /= protein_vertices_numbers.length / 3;
		
		for(var i = 0; i < protein_vertices_numbers.length; i++){
			protein_vertices_numbers[i] /= 32; 
		}
		avg_r /= 32;
		
		for(var i = 0; i< anchor_points.length; i++){
			anchor_points[i] = new THREE.Mesh( new THREE.SphereGeometry( 0.05 ), material.clone() );
			if(i==0) anchor_points[i].position.set(1,PHI,0);
			if(i==1) anchor_points[i].position.set(PHI,0,1);
			if(i==2) anchor_points[i].position.set(0,1,PHI);
			anchor_points[i].position.normalize();
			anchor_points[i].position.multiplyScalar(avg_r * Math.sin(TAU/5) / (Math.sqrt(3)/12*(3+Math.sqrt(5))));
			
			scene.add( anchor_points[i] );
		}
		
		protein.material.size = 1.6;
		protein.material.sizeAttenuation = false;
		protein.material.vertexColors = THREE.VertexColors;
		for( var i = 0; i < NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN; i++){
			protein_colors[i*3 + 0] = 0.5;
			protein_colors[i*3 + 1] = 0;
			protein_colors[i*3 + 2] = 1;
			
			protein_colors[i*3 + 0 + 3*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = 1;
			protein_colors[i*3 + 1 + 3*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = 1;
			protein_colors[i*3 + 2 + 3*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = 0;
			
			protein_colors[i*3 + 0 + 6*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = 0;
			protein_colors[i*3 + 1 + 6*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = 0.5;
			protein_colors[i*3 + 2 + 6*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = 1;
		}
		
		var threefold_axis = new THREE.Vector3(1,1,1);
		threefold_axis.normalize();
		for(var i = 0; i < NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN; i++){
			var point = new THREE.Vector3(	protein_vertices_numbers[i*3+0],
											protein_vertices_numbers[i*3+1],
											protein_vertices_numbers[i*3+2]);
			point.applyAxisAngle(threefold_axis, TAU / 3);
			protein_vertices_numbers[i*3 + 0 + 3*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = point.x;
			protein_vertices_numbers[i*3 + 1 + 3*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = point.y;
			protein_vertices_numbers[i*3 + 2 + 3*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = point.z;
			point.applyAxisAngle(threefold_axis, TAU / 3);
			protein_vertices_numbers[i*3 + 0 + 6*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = point.x;
			protein_vertices_numbers[i*3 + 1 + 6*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = point.y;
			protein_vertices_numbers[i*3 + 2 + 6*NUMBER_OF_POINTS_IN_FUNDAMENTALDOMAIN] = point.z;
		}
		protein.geometry.addAttribute( 'position', new THREE.BufferAttribute( protein_vertices_numbers, 3 ) );
		protein.geometry.addAttribute( 'color', new THREE.BufferAttribute(protein_colors, 3) );
		scene.add(protein);
		
		protein.position.copy(anchor_points[0].position);
		for(var i = 0; i < protein.geometry.attributes.position.array.length / 3; i++){
			protein.geometry.attributes.position.array[i*3+0] -= protein.position.x; 
			protein.geometry.attributes.position.array[i*3+1] -= protein.position.y;
			protein.geometry.attributes.position.array[i*3+2] -= protein.position.z;
		}
		
		protein.edge1 = anchor_points[2].position.clone();
		protein.edge1.sub(anchor_points[0].position);
		protein.edge2 = anchor_points[1].position.clone();
		protein.edge2.sub(anchor_points[0].position);
	}
	
	var len = anchor_points[0].position.distanceTo(anchor_points[1].position);
	var central_axis = new THREE.Vector3(0,0,1);
	anchor_points[0].position.set(0,len/Math.sqrt(3),0);
	anchor_points[1].position.set(0,len/Math.sqrt(3),0);
	anchor_points[2].position.set(0,len/Math.sqrt(3),0);
	anchor_points[1].position.applyAxisAngle(central_axis,TAU/3)
	anchor_points[2].position.applyAxisAngle(central_axis,2*TAU/3);
	
	protein.fix_to_anchors(anchor_points[0].position.clone(), anchor_points[2].position.clone(), anchor_points[1].position.clone());
	
	{
		var ambientLight = new THREE.AmbientLight( 0x000000 );
		scene.add( ambientLight );
		
		var lights = [];
		lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );
		
		lights[0].position.set( 0, 200, 0 );
		lights[1].position.set( 100, 200, 100 );
		lights[2].position.set( -100, -200, -100 );
	
		scene.add( lights[0] );
		scene.add( lights[1] );
		scene.add( lights[2] );
	}
}