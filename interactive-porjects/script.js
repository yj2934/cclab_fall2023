let faces = [];
let numFaces = 4;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for (let i = 0; i < numFaces; i++) {
        faces.push(new Face(random(width), random(height)));
    }
    

}

function draw() {
    background(180);

    for (let i = 0; i < faces.length; i++) {
        faces[i].update();
        faces[i].display();
    }

    
}

class Face {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.offsetX = 0;

        this.angleForSineRadians = random(0,2*PI);
        this.speed=random(0.01,0.1)
        this.normalColor = color(220, 250, 90);
        this.angryColor=color(255,90,29)
this.angryToTurnAge=random(22,55)
        this.c=this.normalColor

this.age=0
this.radius=25

    }
    update() {
        this.offsetX = map(sin(this.angleForSineRadians), -1, 1, -20, 20);
        this.age+=0.2
        this.angleForSineRadians +=this.speed ;
      //   if(this.age>this.angryToTurnAge){
      //    this.turnAngry();
      // }
    }
    display() {
        push();
        translate(this.x + this.offsetX, this.y);

        noStroke();
        fill(this.c);
        circle(0, 0, 2*this.radius);
        fill(0);
        circle(-10, -10, 5)
        circle(10, -10, 5)
        ellipse(0, 10, 8, 9)
// text(round(this.age),0,0)
        pop();
    }
    turnAngry(){
      this.c=this.angryColor
    }
    checkIfClicked(){
  let distanceMouseFace =dist(this.x,this.y,mouseX,mouseY)
  if(distanceMouseFace<this.radius){
    this.turnAngry()
  }
    }


}

function mousePressed(){
  for (let i = 0; i < faces.length; i++) {
   faces[i].checkIfClicked()
}

}











