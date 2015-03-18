#pragma strict

var score : int = 0;

var player : GameObject;
var pfbPlayer : GameObject;
var playerScript : PlayerController;
private var lastPos: Vector3;
private var newPos: Vector3;

var startAmountOfTails : int;
var tails : Array;
var pfbTail : GameObject;

var food : GameObject;
var pfbFood : GameObject;

function Start () {

	food = Instantiate(pfbFood, randomCoor(), Quaternion.identity);
	tails = new Array();
	player = Instantiate(pfbPlayer, Vector3.zero, Quaternion.identity);
	playerScript = player.gameObject.GetComponent(PlayerController);
	
	lastPos = newPos = playerScript.newPos;
	
	addTail(startAmountOfTails);
	 
}

function Update () {
	newPos = playerScript.newPos;
	var nexttime : float = 0;
	
	if(lastPos != newPos) {
		var tailCount = tails.length;
		for(var i = 0; i < tailCount; i++) {
			var tail : GameObject = tails[i];
			var tail2 : GameObject;
			
			if(i == 0)
				tail.gameObject.GetComponent(tailController).newPos = lastPos;
			else {
			 	tail2 = tails[i-1];
				tail.gameObject.GetComponent(tailController).newPos = tail2.gameObject.GetComponent(tailController).lastPos;
			}
		}
		lastPos = newPos;
	}
}

function addTail(count : int) : void {
	
	if(count == 0)
		return;
		
	//Debug.Log(tails);
	var newTail : GameObject = Instantiate(pfbTail, Vector3.zero, Quaternion.identity);
	tails.Push(newTail);
	
	var tail2 : GameObject;
	
	if(tails.length == 1)
		newTail.GetComponent(tailController).bodyConnected = player.gameObject.transform;
	else {	
		tail2 = tails[tails.length-2];
		newTail.GetComponent(tailController).bodyConnected = tail2.gameObject.transform;
	}
	
	addTail(count - 1);

}

function addScore() {
	
	food.gameObject.active = false;
	score++;
	food.transform.position = randomCoor();
	food.gameObject.active = true;
	
	addTail(1);
	
}

function randomCoor() {
	return Vector3(Random.Range(-20.0, 20.0), Random.Range(-12.0, 12.0), 0);
}