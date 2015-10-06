var TAU = Math.PI * 2;

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
document.body.appendChild( renderer.domElement );

var ourclock = new THREE.Clock( true );
var delta_t = 0;

//urgh do they need to be "children" or something? Would that compromise the buffer thing?
var molecules;

//------------------Less fundamental
var mouseblob;

var isMouseDown = false;
var MousePosition = new THREE.Vector2(0,0);
var OldMousePosition = new THREE.Vector2(0,0);
var Mouse_delta = new THREE.Vector2(0,0);

var protein;
var demoshape;

//-------------These things should ONLY be referenced in Inputgetter
var InputObject = {};
InputObject.mousex = window_width/2+30;
InputObject.mousey = window_height/2+30;
InputObject.isMouseDown = false;