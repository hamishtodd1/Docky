var TAU = Math.PI * 2;
var PHI = (1+Math.sqrt(5))/2;

//--------------Technologically fundamental
var playing_field_width = 6;
var playing_field_height = 6;
var window_height = 600; //100 pixels per unit
var window_width = window_height;
var min_cameradist = 10; //get any closer and the perspective is weird
var vertical_fov = 2 * Math.atan(playing_field_height/(2*min_cameradist));

//var camera = new THREE.PerspectiveCamera( vertical_fov * 360 / TAU, window_width / window_height, 0.1, 1000 );
var camera = new THREE.OrthographicCamera( playing_field_width / -2, playing_field_width / 2, playing_field_height / 2, playing_field_height / -2, 0.1, 1000 );
camera.position.z = min_cameradist;

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window_width, window_height );
renderer.setClearColor( 0xffffff, 1);
document.body.appendChild( renderer.domElement );

var ourclock = new THREE.Clock( true );
var delta_t = 0;

var logged = 0;

//------------------Less fundamental
var mouseblob;

//urgh do they need to be "children" or something? Would that compromise the buffer thing?
var molecules;

var indicatorblob = new THREE.Vector3(0,0,0);

var selected_object = 0; //i for anchor point i+1, 4 for protein

var isMouseDown = false;
var MousePosition = new THREE.Vector2(0,0);
var OldMousePosition = new THREE.Vector2(0,0);
var Mouse_delta = new THREE.Vector2(0,0);

var protein = new THREE.PointCloud( new THREE.BufferGeometry(), new THREE.PointCloudMaterial() ); //should have an () there!!
var protein_array = Array(20);
var anchor_points = Array(3);
var atom_vertices_components;
var virtual_icosahedron_vertices = Array(12);
var protein_vertices_indices = Array(20);

var DNA_cage;
var correction_rotation = 0;

//-------------These things should ONLY be referenced in Inputgetter
var InputObject = {};
InputObject.mousex = window_width/2+30;
InputObject.mousey = window_height/2+30;
InputObject.isMouseDown = false;