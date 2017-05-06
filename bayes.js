var sliders = [];
var names = ["P(B|A)", "P(A)", "P(B|A')", "P(A|B)"];
var update_x;
var update_y;
var update_len;
var update_th;

function setup(){
	createCanvas(850,400);
	for (var i = 0; i < 4; i++) {
		sliders.push(new slider(80, 10+i*35, names[i]))
	}
}

function draw(){
	background(250);
	sliders[3].prob = bayes(sliders[0].prob,
							sliders[1].prob,
							sliders[2].prob);
	for (var i = 0; i < 4; i++) {
		sliders[i].show();
	}

	update_x = 80;
	update_y = 150;
	update_len = sliders[0].len;
	update_th = 25;
	fill(0);
	rect(update_x, update_y, update_len, update_th);
	fill(255);
	textAlign(CENTER);
	text("UPDATE", update_x+update_len/2, update_y+update_th/1.5);
	if(mouseIsPressed && mouseX>update_x && mouseX<(update_x+update_len)
	   && mouseY>update_y && mouseY<(update_y+update_th)){
		fill(50);
		rect(update_x, update_y, update_len, update_th);
		fill(255);
		textAlign(CENTER);
		text("UPDATE", update_x+update_len/2, update_y+update_th/1.5);
	}
}

function mouseClicked(){
	if(mouseX>update_x && mouseX<(update_x+update_len)
	   && mouseY>update_y && mouseY<(update_y+update_th)){
		fill(50);
		rect(update_x, update_y, update_len, update_th);
		fill(255);
		textAlign(CENTER);
		text("UPDATE", update_x+update_len/2, update_y+update_th/1.5);
		sliders[1].prob = sliders[3].prob;
	}
}

function slider(x, y, name){
	this.x = x;
	this.y = y;
	this.prob = 0.50; // initial probability
	this.name = name;
	this.len = 650;
	this.thick = 25;
	var button = 15;
	var fsize = this.thick/1.5;
	this.show = function() {
		noStroke();
		fill(230);
		rect(this.x, this.y, this.len, this.thick);
		fill('#33CCCC');
		var colored_len = this.len*this.prob;
		rect(this.x, this.y, colored_len, this.thick);
		// fill(0);
		// rect(this.x+colored_len-button, this.y, button, this.thick)
		fill(0);
		textFont("Courier New")
		textSize(fsize);
		textAlign(LEFT);
		var percentage = (this.prob * 100).toFixed(2);
		text(percentage + "%", this.x+this.len+5, this.y+fsize+2);
		// textAlign(RIGHT);
		text(this.name, this.x-75, this.y+fsize+2);
	};
};

function mouseDragged(){
	// assuming all sliders have the same X
	if(mouseX >= sliders[0].x && mouseX <= (sliders[0].x+sliders[0].len)){
		if(mouseY>sliders[0].y && mouseY<sliders[0].y+sliders[0].thick){
			sliders[0].prob = (mouseX-sliders[0].x)/sliders[0].len;
		}
		else if(mouseY>=sliders[1].y && mouseY<=sliders[1].y+sliders[1].thick){
			sliders[1].prob = (mouseX-sliders[1].x)/sliders[1].len;
		}
		else if(mouseY>sliders[2].y && mouseY<sliders[2].y+sliders[2].thick){
			sliders[2].prob = (mouseX-sliders[2].x)/sliders[2].len;
		}
	}
}

function bayes(pba, pa, pbac){
	return pba*pa / (pba*pa + pbac*(1-pa));
}