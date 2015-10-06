document.addEventListener( 'mousedown', onDocumentMouseDown, false);
document.addEventListener( 'mouseup', onDocumentMouseUp, false);
window.addEventListener( 'mousemove', onMouseMove, false );

function onDocumentMouseDown(event) {
	event.preventDefault();
	InputObject.isMouseDown = true;
}
function onDocumentMouseUp(event) {
	event.preventDefault();
	InputObject.isMouseDown = false;
}

function onMouseMove( event ) {
	event.preventDefault();
	InputObject.mousex = event.clientX;
	InputObject.mousey = event.clientY;
}

function update_mouseblob(){
	mouseblob.geometry.vertices[i];
	
	var Xdists_from_center = Array(mouseblob.geometry.vertices.length);
	var Ydists_from_center = Array(mouseblob.geometry.vertices.length);
	for(var i = 0; i < mouseblob.geometry.vertices.length; i++) {
		Xdists_from_center[i] = mouseblob.geometry.vertices[i].x - mouseblob.geometry.vertices[0].x;
		Ydists_from_center[i] = mouseblob.geometry.vertices[i].y - mouseblob.geometry.vertices[0].y;
	}
	
	for(var i = 0; i < mouseblob.geometry.vertices.length; i++) {
		mouseblob.geometry.vertices[i].x = MousePosition.x + Xdists_from_center[i];
		mouseblob.geometry.vertices[i].y = MousePosition.y + Ydists_from_center[i];
	}
	
	mouseblob.geometry.verticesNeedUpdate = true;
}

function ReadInput() {
	OldMousePosition.copy( MousePosition );
	MousePosition.x = (InputObject.mousex-window_width/2) * (playing_field_width / window_width);
	MousePosition.y = -(InputObject.mousey-window_height/2) * (playing_field_height / window_height);	
	Mouse_delta.set( MousePosition.x - OldMousePosition.x, MousePosition.y - OldMousePosition.y);
	
	if(InputObject.isMouseDown) isMouseDown = true;
	else isMouseDown = false;
}