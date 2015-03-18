#pragma strict

var unitAmount : float = 5;
var rotateSpeed : float;
var movement : Vector3 = Vector3.up;
var speed : float = 0.1;
private var nextFire : float = 0;
var newPos : Vector3;


var gameManagerScr : GameManager;


function Start () {
	gameManagerScr = GameObject.Find("GameManager").GetComponent(GameManager);
	newPos = transform.position;
	
}

function Update () {

	if(Input.GetKeyDown(KeyCode.UpArrow)) {
		movement = Vector3.up;
	}else if(Input.GetKeyDown(KeyCode.DownArrow)) {
		movement = -Vector3.up;
	}else if(Input.GetKeyDown(KeyCode.LeftArrow)) {
		movement = -Vector3.right;
	}else if(Input.GetKeyDown(KeyCode.RightArrow)) {
		movement = Vector3.right;
	}
	
	if(Time.time > nextFire){
		
		nextFire=Time.time+speed;
		
		newPos = transform.position;
		transform.position += movement * unitAmount;
		
	}
}

function OnTriggerEnter2D(other : Collider2D) {
	Debug.Log(other.gameObject.tag);
	
	if(other.gameObject.tag == "food") {
		gameManagerScr.addScore();
	}
}