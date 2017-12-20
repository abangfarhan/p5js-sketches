var pascal;
var x;
var y = 0;

function setup(){
	createCanvas(1600, 1400);
	background(0);
	x = width/2;
	stroke('#ffffff');
	pascal = [1];
}

function draw(){
	for(var j=x; j<(x+pascal.length); j++){
		// if(pascal[j-x]%2 != 0)
		// 	point(j, i);
		if(pascal[j-x] == 1)
			point(j, y);
	}
	x = x - 0.5;
	y++;
	pascal = pascalNext(pascal);
	if(y > height)
		noLoop();
}

function pascalNext(pascal){
	var newPascal = [1]
	for(var i=1; i < pascal.length; i++){
		newPascal = newPascal.concat((pascal[i]+pascal[i-1])%2)
	}
	return newPascal.concat(1)
}

// function pascalNext(pascal){
// 	var newPascal = [1];
// 	for(var i=1; i < pascal.length; i++){
// 		newPascal = newPascal.concat(parseInt(
// 			parseInt(pascal[i]) + parseInt(pascal[i-1])));
// 	}
// 	return newPascal.concat(1)
// }