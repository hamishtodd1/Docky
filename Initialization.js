function Init(){
	var material = new THREE.MeshLambertMaterial({
		color: 0xf0f00f
	});
	
	var radius = 0.03;
	mouseblob = new THREE.Mesh( new THREE.CircleGeometry( radius ), new THREE.MeshBasicMaterial({color: 0xf0f00f}) );
	scene.add( mouseblob );
	
	indicatorblob = new THREE.Mesh( new THREE.CircleGeometry( 0.1 ), new THREE.MeshBasicMaterial({color: 0xffffff}) );
//	scene.add( indicatorblob );
	
	//Import protein
	//We may wish to do this or that with it. You could skew the proteins upwards, which might give clear protuberances. But those might be unnoticeable and unnecessary given nice colors
	{
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
		
		for(var i = 0; i< anchor_points.length; i++){
			anchor_points[i] = new THREE.Mesh( new THREE.SphereGeometry( 0.05 ), material.clone() );
			if(i==0) anchor_points[i].position.set(1,PHI,0);
			if(i==1) anchor_points[i].position.set(PHI,0,1);
			if(i==2) anchor_points[i].position.set(0,1,PHI);
			anchor_points[i].position.normalize();
			anchor_points[i].position.multiplyScalar(protein_center * Math.sin(TAU/5) / (Math.sqrt(3)/12*(3+Math.sqrt(5))));
			
			scene.add( anchor_points[i] );
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
			scene.add(protein_array[i]);
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
		
		//it is certainly a non trivial question how you get the bunches of triangle vertices.
		for(var i = 0; i< virtual_icosahedron_vertices.length; i++){
			for(var j = i+1; j< virtual_icosahedron_vertices.length; j++){
				if(Math.abs( virtual_icosahedron_vertices[i].distanceTo(virtual_icosahedron_vertices[j]) - edgelen ) > 0.00001 )
					continue;
				for(var k = j+1; k< virtual_icosahedron_vertices.length; k++){
					if(Math.abs( virtual_icosahedron_vertices[k].distanceTo(virtual_icosahedron_vertices[i]) - edgelen ) > 0.00001 )
						continue;
					if(Math.abs( virtual_icosahedron_vertices[k].distanceTo(virtual_icosahedron_vertices[j]) - edgelen ) > 0.00001 )
						continue;
					
					//no, you need to work out which way clockwise is and maybe swap them
					//or really you should write it out, isn't that what we're going towards anyway?
					protein_vertices_indices[lowest_unused_protein] = new Uint16Array([i,j,k]);
					lowest_unused_protein++;
				}
			}
		}
		
		for(var i = 0; i<protein_array.length; i++)
			fix_protein_to_anchors(	virtual_icosahedron_vertices[protein_vertices_indices[i][0]],
									virtual_icosahedron_vertices[protein_vertices_indices[i][1]],
									virtual_icosahedron_vertices[protein_vertices_indices[i][2]], protein_array[i]);
	}
	
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

function point_to_the_right_of_line(ourpointx,ourpointy,
		line_topx,line_topy, line_bottomx,line_bottomy) {
	var z_coord = 	(ourpointx * line_topy + line_bottomx *-line_topy + ourpointx *-line_bottomy + line_bottomx * line_bottomy)
				-	(ourpointy * line_topx + line_bottomy *-line_topx + ourpointy *-line_bottomx + line_bottomy * line_bottomx);
	if( z_coord < 0 ) return 0;
	else if( z_coord > 0 ) return 1;
	else return 2; //on the line
}