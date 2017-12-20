var FONT_SIZE = 70;
var TEXT_Y_POS;
var TEXT_X_POS;

var num_left;
var num_right;
var distance_percentage = 10;

var numbers = [
	[1, 2],   [3, 2],   [3, 4],   [5, 4],   [5, 6],
	// [7, 6],   [7, 8],   [9, 8],   [9, 10],  [22, 20],
	// [28, 32], [37, 33], [44, 46], [58, 56], [59, 55],
	// [60, 64], [71, 69], [76, 74], [88, 92], [89, 91]
]

numbers = randomize_array(numbers);

var number_index = 0;
var start_time;

function setup(){
	createCanvas(1340, 745);

	TEXT_Y_POS = height/2;
	TEXT_X_POS = width/2;

	textFont('Arial');
	textSize(FONT_SIZE);
	fill(255);

	new_page(number_index);
}

function draw(){
	var distance_pixel = distance_percentage/100 * width;

	textAlign(RIGHT);
	text(num_left, TEXT_X_POS - (distance_pixel/2), TEXT_Y_POS);

	textAlign(LEFT);
	text(num_right, TEXT_X_POS + (distance_pixel/2), TEXT_Y_POS);
}

function keyPressed(){
	if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW){
		var duration_ms = Date.now() - start_time;
		if ((keyCode == LEFT_ARROW && num_left < num_right) || (keyCode == RIGHT_ARROW && num_right < num_left)){
			console.log('Correct');
		} else {
			console.log('Wrong')
		}
		console.log('Duration', duration_ms);
		number_index++;
		new_page(number_index);
	}
}

function new_page(number_index){
	background(50);
	if (number_index < numbers.length){
		num_left = numbers[number_index][0];
		num_right = numbers[number_index][1];
	} else {
		text('Finish', 100, 100);
		noLoop();
		num_left = 99;
		num_right = 00;
	}
	start_time = Date.now();
}


function randomize_array(arr){
	function rand_int(low, high){
		return low + Math.round(Math.random()*(high-low));
	}

	var new_arr = [];
	var rand_index;
	var array_length = arr.length;
	for(var i=0; i<array_length; i++){
		rand_index = rand_int(low=0, high=arr.length-1);
		new_arr.push(arr.splice(rand_index, 1)[0]);
	}
	return new_arr;
}
