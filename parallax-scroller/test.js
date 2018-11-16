function Coin(){
	console.log("Coin forged.");
}

Coin.prototype.win = function(bet){
	console.log("You won the flip. You won " + bet + " credits.");
	return bet*2;
}

Coin.prototype.lose = function(bet){
	console.log("You lost the flip. You lost " + bet + " credits.");
	return bet;
}

function printVal(){
	console.log("1000");
}

function test(){
var coin = new Coin();
var random = new RandomEngine(coin);
var event = coin.win;
//random.trigger(0.2, coin.win, [10]);

var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20, 21, 22 , 23 , 24 ,25 ,26 ,27 ,28 ,29 ,30];
console.log("Shuffling: " + random.shuffle(array));
}