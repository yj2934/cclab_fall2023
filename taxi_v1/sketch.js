console.log("js is linked!");

let InstanceOfTaxi;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    InstanceOfTaxi = new Taxi(100,200,1);
    secondTaxi= new Taxi(300,200,0.5);
}

function draw() {
  background(90, 120, 250);
 InstanceOfTaxi.display()
 InstanceOfTaxi.update()

 secondTaxi.display()
 secondTaxi.update()
}

class Taxi{
  constructor(startX,startY,s){
    //every class must have constructor function
    //inside we list and define the class's properties
    this.x=startX
    this.y=startY
    this.w=100
    this.scalefactor=s
    this.speed=random(-2,2)
    this.col=[200,200,100] //rgb in array
  }
display(){
  //draw things 
  push()
  translate(this.x,this.y)
  scale(this.scalefactor)
  fill(this.col[0],this.col[1],this.col[2])
  rect(0,0,this.w,30)
  pop()
}
update(){
  //change property values
  this.x+=this.speed
this.reappear();
}
reappear(){
  if(this.x > width){
    // moving to right
    this.x = -this.w*this.scalefactor;
  }else if(this.x < -this.w*this.scalefactor){
    // moving to left
    this.x = width;
}

}
}