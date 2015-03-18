#pragma strict

var bodyConnected : Transform;
var newPos : Vector3;
var lastPos : Vector3;

function Start () {
	lastPos = newPos = transform.position;
}

function Update () {
	if(lastPos != newPos) {
		transform.position = newPos;
		lastPos = newPos;
	}
}