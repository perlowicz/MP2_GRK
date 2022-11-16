function setup(){
    createCanvas(512,512);
    background(255);
}

var last_x = -1;
var last_y = -1;

function mouseDragged(){
    if(mouseButton != LEFT) return;
    if(last_x>0) {
        line(last_x,last_y,mouseX,mouseY);
    }
    last_x=mouseX;
    last_y=mouseY;
}

function mouseReleased() {
    last_x=last_y=-1;
    if(mouseButton == RIGHT) {
      loadPixels();
      flood_fill(mouseX,mouseY);
      updatePixels();
    }
}

function set_pixel(x,y) {
    idx=(y*512+x)*4;
    pixels[idx]=254;
    pixels[idx+1]=0;
    pixels[idx+2]=0;
    pixels[idx+3]=255;
}

function get_pixel(x,y) {
    idx=(y*512+x)*4;
    return pixels[idx];
}

function flood_fill(x, y){
    stos = [];
    stos.push([x,y]);
    while(stos.length > 0){
        tempArray = stos.pop();
        if(tempArray[0] > 512 || tempArray[1] > 512){
                continue;
        }
        pixel = get_pixel(tempArray[0], tempArray[1]);
        if(pixel != 255){
            continue;
        }
        set_pixel(tempArray[0], tempArray[1]);
        stos.push([tempArray[0], tempArray[1]-1]);// (x,y-1)
        stos.push([tempArray[0], tempArray[1]+1]);// (x,y+1)
        stos.push([tempArray[0]-1, tempArray[1]]);// (x-1,y)
        stos.push([tempArray[0]+1, tempArray[1]]);// (x+1,y)
    }
}