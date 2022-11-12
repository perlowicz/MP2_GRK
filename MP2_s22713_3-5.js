function setup(){
    createCanvas(512,512);
    background(255);
}
var x0 = -1;
var y0 = -1;
var x1 = -1;
var y1 = -1;

function mousePressed(){
    x0=mouseX;
    y0=mouseY;
}

function mouseDragged(){
    x1 = mouseX;
    y1 = mouseY;
    background(255);
    noStroke();
    fill('red');
    ellipse(x0-3,y0-3,6);
    fill('green');
    ellipse(x1-3,y1-3,6);
}

function mouseReleased(){
    background(255);
    loadPixels();
    color_screen();
    updatePixels();
}

function set_pixel(x,y,c){
    idx = (y*512+x)*4;
    pixels[idx] = -c;
    pixels[idx+1] = c;
    pixels[idx+2] = 0;
    pixels[idx+3] = 255;
}

function color_screen(){
    dx = round(x1) - round(x0);
    dy = round(y1) - round(y0);
    a = dy/dx;
    b = round(y0) - a * round(x0);

    for(y=0; y<height; y++){
        for(x=0; x<width; x++){
            Dxy = (dy/dx)*(x-x0)-(y-y0);
            Dxy2 = 2*dy*(x-x0)-(2*dx*(y-y0));
            set_pixel(x,y,Dxy);
        }
    }
}