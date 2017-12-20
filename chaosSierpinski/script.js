var points = [[1300,100],
			        [300, 1500],
			        [2000,1500]];
var dot;
// var num = 0;
function setup(){
	createCanvas(2800, 1900);
	background(0);
	stroke('#00C90D')
	strokeWeight(20);
	for(var i=0; i<3; i++){
		point(points[i][0], points[i][1]);
	}
	dot = [Math.random()*width, Math.random()*height]
	strokeWeight(3);
	stroke('#ffffff');	
}

function draw(){
	point(dot[0], dot[1]);
	updateDot(randomInt(0, 3));
	// updateDot(num);
	// num++;
	// if(num==3) num = 0;
}

function updateDot(randnum){
	dot[0] += (points[randnum][0] - dot[0])/2
	dot[1] += (points[randnum][1] - dot[1])/2
}

function randomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max-min))+min;
}
