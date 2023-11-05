// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 3; // Decide the initial number of particles.


let particles = [];


function preload(){
  
  clickSound = loadSound("Bubble.m4a")
}


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");
  
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(mouseX, mouseY-40);
  }
  
}

function draw() {

  
  background(20,30,50);
  noFill()
  stroke(250,250,200)
  strokeWeight(3)
  ellipse(mouseX,mouseY-60,20,40)
  stroke(255,80)
    strokeWeight(3)
    noFill()
    arc(mouseX,mouseY-60,10,30,PI+2*QUARTER_PI,2*PI)

  noStroke()
  fill(20,40,30)
  rect(0,580,600,20)
  stroke(250,250,200)
  strokeWeight(3)
  line(mouseX,mouseY-40,mouseX,mouseY)


  if(mouseIsPressed == true){
    textSize(30)
    text("💨",mouseX-40,mouseY-50)
       particles.push(new Particle(mouseX+20, mouseY-60))  

}

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.checkOutOfRange()
    p.display();
  }

  for (let i = particles.length-1; i >= 0; i--) {
        
    if(particles[i].inRange == false){
      clickSound.play()
        particles.splice(i, 1);
    }

}




}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia1 = random(20,60);
    this.dia2=this.dia1
    this.speedX=random(0.5,1)
    this.speedY=random(-0.5,0.5)
    this.red=random(100,255)
    this.green=random(100,255)
    this.blue=random(100,255)
    this.inRange = true;
    
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x+=this.speedX
    this.y+=this.speedY
    this.dia1+=random(-0.5,0.5)
    this.dia2+=random(-0.5,0.5)
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(this.red,this.green,this.blue,50)
stroke(255,200)
strokeWeight(random(1,1.5))
    ellipse(0, 0, this.dia1,this.dia2);

    stroke(255,100)
    strokeWeight(3)
    noFill()
    arc(0,0,this.dia1-10,this.dia2-10,PI+3*QUARTER_PI,2*PI)

    pop();

    
    fill(this.red,this.green,this.blue,10)
    // ellipse(mouseX,mouseY-60,20,40)
  }
  checkOutOfRange(){
 
      if (this.y > height|| this.x > width||this.y< 0) {
          this.inRange = false;
      }
      if (this.dia1*this.dia2*this.x>1000000) {
        this.inRange = false;
    }   
    if (abs(this.dia1-this.dia2)>10) {
      this.inRange = false;
  } 
  }
}
