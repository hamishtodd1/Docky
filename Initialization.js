function Init(){
	var material = new THREE.MeshLambertMaterial({
		color: 0xf0f00f
	});
	
	var radius = 0.03;
	mouseblob = new THREE.Mesh( new THREE.CircleGeometry( radius ), new THREE.MeshBasicMaterial({color: 0xf0f00f}) );
	scene.add( mouseblob );
	
	indicatorblob = new THREE.Mesh( new THREE.CircleGeometry( 0.1 ), new THREE.MeshBasicMaterial({color: 0xf00fff}) );
//	scene.add( indicatorblob );
	
	init_static_capsid();
//	for(var i = 0; i< anchor_points.length; i++)
//		scene.add( anchor_points[i] );
//	for(var i = 0; i<protein_array.length; i++)
//		scene.add(protein_array[i]);
	
	init_DNA_cage();
	scene.add(DNA_cage);
	
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