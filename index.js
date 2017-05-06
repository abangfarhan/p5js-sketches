var points = [[1300,100],
			  [300, 1500],
			  [2000,1500]]
// var A = [1000, 100];
// var B = [300, 1500];
// var C = [2000, 1500];
var dot = [1000, 1000];
// var randnum;
function setup(){
	createCanvas(2800, 1900);
	background(0);
	stroke('#00C90D')
	strokeWeight(20);
	for(var i=0; i<3; i++){
		point(points[i][0], points[i][1]);
	}
	// point(A[0], A[1]);
	// point(B[0], B[1]);
	// point(C[0], C[1]);
	strokeWeight(7);
	stroke('#ffffff');
}

function draw(){
	point(dot[0], dot[1]);
	// randnum = randomInt(0, 3);
	updateDot(randomInt(0, 3));
// 	if(randnum==1){
// 		dot[0] += (A[0] - dot[0])/2
// 		dot[1] += (A[1] - dot[1])/2
// 	} else if (randnum==2){
// 		dot[0] += (B[0] - dot[0])/2
// 		dot[1] += (B[1] - dot[1])/2
// 	} else {
// 		dot[0] += (C[0] - dot[0])/2
// 		dot[1] += (C[1] - dot[1])/2
// 	}
// 	print(randnum);
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