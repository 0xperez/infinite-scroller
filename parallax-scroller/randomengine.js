/**
* Constructor for a RandomEngine. Context refers to the object on which the function calls will be made, in case of OO-like methods.
* Can be null in case only call to function with no context are made (functions which do not belong to a particular class)
*/
function RandomEngine(context){
	this.context = context;
}

/**
* INPUT: 
* 	p: a probability 0 <= p <=1
* 	evt: a function to trigger
* 	arguments: an optional list of arguments
* OUTPUT:
* 	triggers the function evt with a probability of p.
* RETURNS:
* 	the return value of evt, if it has any, or undefined as default if the function was not triggered.
* NOTES:
* 	-calls will fail if event is null or if no context is provided for a function that requires one.
*/
RandomEngine.prototype.trigger = function(p, evt, arguments){

	var context = this.context;

	if(p < 0){
		p = 0;
	}
	if(p > 1){
		p = 1;
	}

	var randomVar = Math.random();
	
	if(randomVar <= p){
		console.log("RANDOM ENGINE: event triggered on " + context.constructor.name + " with arguments " + arguments); 
		return evt.apply(context, arguments);

	}
	else{
		console.log("RANDOM ENGINE: no event triggered.")
	}
}



/**
* Chooses a random element from an array.
*/
RandomEngine.prototype.pick = function(array){
	return array[this.getRandomInt(0, array.length)];
}


/**
* Shuffle an array with the Fisher - Yates algorithm.
*/
RandomEngine.prototype.shuffle = function(arr){
	//creates new array copy
    let newArr = [...arr]
    //iterates from end to beginning
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        //swaps the current element with an element in a random position in the array
        [newArr[i], newArr[rand]]=[newArr[rand], newArr[i]];
    }
    return newArr;
}


//// GENERATING RANDOM PRIMITIVES /////


/**
* Returns a random integer in the interval [min, max). To have max included, just change the parentheses to (max - min + 1).
*/
RandomEngine.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
* Given a lower and an upper bound and an integer representing the decimal precision, computes a random double [lower, upper).
* The generating formula is the standard formula used also in getRandomInt, but rounding is applied to bounds and then the whole result
* is divided again after flooring it.
*/
RandomEngine.prototype.getRandomReal = function(lower, upper, precision){
	if(precision == null || precision <= 0){
		precision = 2;//2 decimals by default
	}
	var decimalDigits = 10^precision;
	var randomnum = Math.floor(Math.random() * (upper * decimalDigits - lower * decimalDigits) + lower * decimalDigits) / decimalDigits;
	return randomnum;
}



/**
* Returns a random boolean.
*/
RandomEngine.prototype.getRandomBool = function(){
	return getRandomInt(0, 2) == 0 ? true : false;
}