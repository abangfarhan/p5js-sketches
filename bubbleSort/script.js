var array = [];
var hues = [];
var x;
var len = 100;
var screenW = 600;
var screenH = 400;
var w = screenW/len;
var h;
var pos_1 = 0;
var pos_2 = len - 1;
function setup(){
    createCanvas(screenW,screenH);
    for(var i=0; i<len; i++){
        array[i] = Math.random();
    }
    strokeWeight(0);
    colorMode(HSB);
}

function draw(){
    //
    background(240);
    x = 0;
    for(var i=0; i<array.length; i++){
        hue_ = array[i] * 360;
        h = array[i] * screenH;
        fill(hue_, 100, 100); 
        rect(x, 400-h, w, h);
        x = x + w;
    }
    
    // bubble sort part
    if(pos_2 > pos_1){
        if(array[pos_2] < array[pos_2 - 1]){
            temp = array[pos_2];
            array[pos_2] = array[pos_2 - 1];
            array[pos_2 - 1] = temp;
        }
        pos_2 -= 1;
    } else {
        pos_1 += 1;
        pos_2 = len - 1;
    }
}
