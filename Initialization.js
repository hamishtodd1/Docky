function Init(){
	var material = new THREE.MeshLambertMaterial({
		color: 0xf0f00f
	});
	
	var radius = 0.03;
	mouseblob = new THREE.Mesh( new THREE.CircleGeometry( radius ), material );
	scene.add( mouseblob );
	
	//Import protein
	demoshape = new THREE.Mesh( new THREE.TorusKnotGeometry( 1, 0.3, 100, 16 ), material );
	//scene.add( demoshape );
	
	{
		var avg_x = 0;
		var avg_y = 0;
		var avg_z = 0;
		for(var i = 0; i < protein_vertices_numbers.length; i++){
			if(i%3===0) avg_x+=protein_vertices_numbers[i];
			if(i%3===1) avg_y+=protein_vertices_numbers[i];
			if(i%3===2) avg_z+=protein_vertices_numbers[i];
		}
		avg_x /= protein_vertices_numbers.length / 3;
		avg_y /= protein_vertices_numbers.length / 3;
		avg_z /= protein_vertices_numbers.length / 3;
		for(var i = 0; i < protein_vertices_numbers.length; i++){
			if(i%3===0) protein_vertices_numbers[i] -= avg_x;
			if(i%3===1) protein_vertices_numbers[i] -= avg_y;
			if(i%3===2) protein_vertices_numbers[i] -= avg_z;
			
			protein_vertices_numbers[i] /= 16; 
		}
		
		var proteinmaterial = new THREE.PointCloudMaterial({
			size: 0.065
		});
		
		
		var protein_geometry = new THREE.BufferGeometry();
		protein_geometry.addAttribute( 'position', new THREE.BufferAttribute( protein_vertices_numbers, 3 ) );
		protein = new THREE.PointCloud( protein_geometry, proteinmaterial );
		scene.add(protein);
		
		/*
		molecules = Array(protein_vertices_numbers.length/3);
//		var sprite_map = THREE.ImageUtils.loadTexture( "sprite.png" );
//		var atomsprite = new THREE.SpriteMaterial( { map: sprite_map, color: 0xffffff } );
		for( var i = 0; i < protein_vertices_numbers.length/3; i++){
			var molecule_geometry = new THREE.BufferGeometry();
			var molecule_vertices_numbers = new Float32Array([protein_vertices_numbers[i*3+0],
			                                                  protein_vertices_numbers[i*3+1],
			                                                  protein_vertices_numbers[i*3+2] ]);
			molecule_geometry.addAttribute( 'position', new THREE.BufferAttribute( molecule_vertices_numbers, 3 ) );
			molecules[i] = new THREE.Sprite( molecule_geometry, atomsprite );
			scene.add(molecules[i]);
		}
		 */
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
	
	//Ok so it could just be a surface, could light it too. Or:
	//each atom a sprite. Scoop out ones toward the middle. Could compare speed of each
	//It is definitely plausible that sphere sprites would be faster than a bunch of faces and shaders, and by colouring them right you get distinction
	//you could just show the amino acids.
}