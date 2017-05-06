var xcenter;
var ycenter;
var scl = 80;
var ticklen = 6;
var x_values = new Array();
var y_values = new Array();
var xnumsteps;
var ynumsteps;
var dotsize = 40;
var fsize = 50;
var boxw = 670;
var boxh = 100;
function setup(){
	createCanvas(2800, 1900);
	background(250);
	xcenter = 500;
	ycenter = height - 300;
	xnumsteps = int(width/scl);
	ynumsteps = int(height/scl);
}

function draw(){
	translate(xcenter,ycenter);
	strokeWeight(6);
	line(-xcenter, 0, width - xcenter, 0);
	line(0, -ycenter, 0, height - ycenter);
	strokeWeight(3);
	spc = spearman(x_values, y_values);
	if(Number.isNaN(spc)){spc=''} else {spc = spc.toFixed(2)}
	textSize(fsize);
	fill(250);
	rect(1420, -ycenter, boxw, boxh);
	fill(0);
	text("Spearman Correlation: " + spc, 1450, -ycenter+60);
	// for (var i = 0; i < xnumsteps; i++) {
	// 	line(-xcenter+i*scl, -ticklen, -xcenter+i*scl, +ticklen);
	// }
	// for (var i = 0; i < ynumsteps; i++) {
	// 	line(-ticklen, -ycenter+i*scl, ticklen, -ycenter+i*scl);
	// }
}

function mouseDragged(){
	xval = mouseX-xcenter;
	yval = -(mouseY-ycenter);
	noFill();
	ellipse(xval, -yval, dotsize);
	append(x_values, xval);
	append(y_values, yval);	
}

function mouseClicked(){
	xval = mouseX-xcenter;
	yval = -(mouseY-ycenter);
	noFill();
	ellipse(xval, -yval, dotsize);
	append(x_values, xval);
	append(y_values, yval);	
}

function spearman(x_values, y_values){
	len = x_values.length;
	var ranked_x = ranker(x_values);
	var ranked_y = ranker(y_values);
	var dif = 0;
	for(var i=0; i<len; i++){
		dif += pow(ranked_x[i] - ranked_y[i], 2)
	}
	return 1 - 6 * dif / (pow(len,3) - len);
}

function ranker(arr){
	var sorted = new Array();
	arrayCopy(arr, sorted);
	sort(sorted);
	var ranked = arr.slice().map(function(v){return sorted.indexOf(v) + 1});
	return ranked;
}