var array = [];
var len = 50;
var screenW = 600;
var screenH = 400;
var w = screenW/len;
var colorhue;
var h;
var sorted = false;

function setup(){
    createCanvas(screenW,screenH);
    for(var i=0; i<len; i++){
        array[i] = Math.random();
    }
    strokeWeight(0);
    colorMode(HSB);
}

function draw(){
    //background(240);
    drawbars(array);
    if(!sorted){
        array = quicksort(array);
        sorted = true;
    }
}

function quicksort(array, start=0){
    if(array.length <= 1) return array;
    var pivot_ix = Math.floor(array.length/2);
    var pivot = array[pivot_ix];
    var array1 = [];
    var array2 = [];
    var start2 = Math.floor(array.length/2) + start + 1;
    for(var i=0; i<array.length; i++){ 
        if(i==pivot_ix){
            continue;
        }
        if(array[i] < pivot){
            array1.push(array[i]);
        } else {
            array2.push(array[i]);
        }
    }
    drawbars(array1.concat(pivot, array2), start);
    array1 = quicksort(array1, start);
    array2 = quicksort(array2, start2);
    return array1.concat(pivot, array2);
}

function drawbars(array, start=0){
    var x = start * w;
    for(var i=0; i<array.length; i++){
        fill(0, 0,100);
        rect(x, 0, w, screenH);

        h = array[i] * screenH;
        colorhue = array[i] * 360;
        fill(colorhue, 100, 100);
        rect(x, screenH-h, w, h);
        x = x + w;
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
