let backgroundW = 2000;
let backgroundH = 2000;
let centerX;
let centerY;
let canmoveleft = true;
let canmoveright = true;
let canmoveup = true;
let canmovedown = true;
let seaweeds = [];
let numBubbles = 3;
let bubbles = [];

let bigFishes=[]
let numBigFish=1

let fishOpenMouth=false




let score = 0;

let smallFishes = [];
let numSmallFish = 30;

let myfish;

let confettis = [];
let numConfetti = 1;

function preload(){
  clickSound = loadSound("lib/Bubble.m4a")
  eatSound= loadSound("lib/eat.wav")
}

function setup() {
  createCanvas(800, 800);
  
  centerX = -backgroundW/2 + width/2;
  centerY = -backgroundH/2 + height/2;
  
  
  myfish = new MyFish(backgroundW/2, backgroundH/2);
  
  for (let i = 70; i < backgroundW-70; i += random(70, 200)) {
    seaweeds.push(
      new Seaweed(i, backgroundH, random(10, 30), random(60, backgroundH/2), random(0, PI))
    );
  }
  for (let i = 70; i < backgroundW-70; i += random(70, 200)) {
    seaweeds.push(
      new Seaweed(i, backgroundH, random(10, 30), random(60, 800), random(0, PI))
    );
  }
  
  
  
  for (let i = 0; i < numBubbles; i++) {
    bubbles[i] = new Bubble(random(50, backgroundW-50), backgroundH);
  }

  for (let i = 0; i < numSmallFish; i++) {
    smallFishes[i] = new smallFish(random(0, backgroundW), random(0, backgroundH));
  }
  
  for(let i=0;i<numBigFish;i++){
    bigFishes[i]=new bigFish(backgroundW/2, backgroundH/2);
  }
 
  for(let i=0;i<numConfetti;i++){
  confettis.push(new Confetti(width/2,height/2)) 
}
  
}

function draw() {
  

  background(255);
  

  push();
  translate(centerX, centerY);
  fill(255, 0, 0);
  circle(0, 0, 5);
  fill(50, 80, 100);
  rect(0, 0, backgroundW, backgroundH); //baclground

 

  for (let i = 0; i < smallFishes.length; i++) {
    smallFishes[i].update();
    smallFishes[i].checkIfEaten();
    smallFishes[i].display();
  }

  for (let i = 0; i < seaweeds.length; i++) {
    seaweeds[i].update();
    seaweeds[i].display();
  }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].checkOutOfRange();
    bubbles[i].display();
  }
  
  for(let i=0;i<bigFishes.length;i++){
    bigFishes[i].update()
    bigFishes[i].display()
  }
  
  
  

  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].inRange == false) {
      bubbles.splice(i, 1);
      
    }
    // if (bubbles[i].isTouched == true) {
    //   bubbles.splice(i, 1);
    //   clickSound.play()
    // }
    
  }

  for (let i = smallFishes.length - 1; i >= 0; i--) {
    if (smallFishes[i].isEaten == true) {
      smallFishes.splice(i, 1);
      eatSound.play()
    }
  }

  if (random(0, 100) > 99) {
    bubbles.push(new Bubble(random(50, backgroundW-50), backgroundH));
  }
  if (random(0, 100) > 99) {
    smallFishes.push = new smallFish(random([0, backgroundW]), random([0, backgroundH]));
  }
  

  if (canmoveleft == true && myfish.x <= backgroundW-width/2) {
    if (keyIsPressed == true && key == "ArrowLeft") {
      centerX += myfish.speed;    
    }
  }
  if (keyIsPressed == true && key == "ArrowLeft"&&myfish.x>=0 ) {
      myfish.x -= myfish.speed;    
  }
  if(myfish.x<=0){
    myfish.x=30
  }
  if(myfish.x>=backgroundW-30){
    myfish.x=backgroundW-30
  }
  
  
  if (canmoveright == true && myfish.x >= width/2) {
    if (keyIsPressed == true && key == "ArrowRight") {
      centerX -= myfish.speed;
    }
  }
  if (keyIsPressed == true && key == "ArrowRight"&&myfish.x<backgroundW-30) {
      myfish.x += myfish.speed;
  }
  
  
  
  
  if (canmoveup == true&& myfish.y <= backgroundH-height/2) {
    if (keyIsPressed == true && key == "ArrowUp") {
     centerY += myfish.speed;
    }
  }
   if (keyIsPressed == true && key == "ArrowUp"&&myfish.y>10) {
      myfish.y -= myfish.speed;
  } 
    
    
  
  if (canmovedown == true&& myfish.y >= height/2) {
    if (keyIsPressed == true && key == "ArrowDown") {
      centerY -= myfish.speed;
      
    }
  }
  if (keyIsPressed == true && key == "ArrowDown"&&myfish.y<backgroundH-10) {
      myfish.y += myfish.speed;
  }

  // console.log(centerX, centerY)
  if (centerY >= 0) {
    canmoveup = false;
  } else if (centerY < 0) {
    canmoveup = true;
  }
  if (centerY <= -backgroundH+height) {
    canmovedown = false;
  } else if (centerY > -backgroundH+height) {
    canmovedown = true;
  }
  if (centerX <= -backgroundW+width) {
    canmoveright = false;
  } else if (centerX > -backgroundW+width) {
    canmoveright = true;
  }
  if (centerX >= 0) {
    canmoveleft = false;
  } else if (centerX < 0) {
    canmoveleft = true;
  }
  
  myfish.update();
  myfish.display();

  pop();

  
  
  
  textSize(50)
  if(myfish.stage==1){
    fill(255,255,0)
  }
  else if(myfish.stage==2){
    fill(255,200,100)
  }
  else if(this.stage==3){
     fill(179, 153, 255)
    }
  
  text(score,20,50)
  text("stage"+myfish.stage,20,100)
  
  
  
  
  
}

class MyFish {
  constructor(startX, startY) {
    this.sinInPut = 0;
    this.x = startX;
    this.y = startY;
    this.dia1 = 80;
    this.dia2 = 70;
    this.eye1x = 23;
    this.eye1y = -10;
    this.eye2x = 23;
    this.eye2y = -10;
    this.mouthstart = 2 * PI;
    this.mouthstop = 0;
    this.taildia1 = 30;
    this.taildia2 = 30;
    this.findia1 = 20;
    this.findia2 = 20;
    this.mode = 1;
    this.turnaround = false;
    
    
    this.stage=1
    
    this.speed = 20;
  }
  update() {
    if(score>=120){
    this.stage=2
  }
    
    if(score>=200){
    this.stage=3
  }
    
    if (this.turnaround == false) {
      this.sinInPut += 0.2;
      this.taildia1 = map(sin(this.sinInPut), -1, 1, 1, 20);
      this.findia1 = map(sin(this.sinInPut), -1, 1, 1, 20);

      if (fishOpenMouth==true) {
        this.mouthstart = 2 * PI - 0.1;
        this.mouthstop = 0.1;
        this.eyey = -11;
        
      if(this.stage==1){
          fill(255, 213, 3);
        }
        else if(this.stage==2){
          fill(255, 179, 203)
        }
        else if(this.stage==3){
          fill(179, 153, 255)
        }
        
        noStroke();
        circle(this.x, this.y, 40);
      } else if (fishOpenMouth==false) {
        this.mouthstart = 2 * PI;
        this.mouthstop = 0;
      }

      if (keyIsPressed == true && key == "ArrowLeft") {
        this.taildia1 = map(sin(this.sinInPut), -1, 1, -20, 20);
        this.eye1x -= 0.9;
        this.eye2x -= 0.5;
        this.dia1 -= 2;
        if (0 < this.dia1 && this.dia1 <= 20) {
          this.dia1 = -20;
          fill(255, 167, 3, 200);
          ellipse(this.x + this.findia1, this.y, this.findia1, this.findia2);
        } else if (-80 < this.dia1 && this.dia1 <= -20) {
          this.eye2x -= 0.8;
          fill(255, 167, 3, 200);
          ellipse(this.x + this.findia1, this.y, this.findia1, this.findia2);
        } else if (this.dia1 == -80) {
          this.turnaround = true;
          this.eye1x = this.eye2x = -23;
        }
      }
    }

    if (this.turnaround == true) {
      this.sinInPut += 0.2;
      this.taildia1 = map(sin(this.sinInPut), -1, 1, -20, 1);
      this.findia1 = map(sin(this.sinInPut), -1, 1, -20, 1);
      if (fishOpenMouth==true) {
        this.mouthstart = PI - 0.1;
        this.mouthstop = PI + 0.1;
        this.eyey = -11;
        noStroke();
        if(this.stage==1){
          fill(255, 213, 3);
        }
        else if(this.stage==2){
          fill(255, 179, 203)
        }
        
        circle(this.x, this.y, 40);
      } else if (fishOpenMouth==false) {
        this.mouthstart = 3 * PI;
        this.mouthstop = PI;
      }

      if (keyIsPressed == true && key == "ArrowRight") {
        this.taildia1 = map(sin(this.sinInPut), -1, 1, -20, 20);
        this.eye2x += 0.9;
        this.eye1x += 0.5;
        this.dia1 += 2;
        if (-20 < this.dia1 && this.dia1 <= 0) {
          this.dia1 = 20;
          fill(255, 167, 3, 200);
          ellipse(this.x + this.findia1, this.y, this.findia1, this.findia2);
        } else if (20 <= this.dia1 && this.dia1 < 80) {
          this.eye1x += 0.8;
          fill(255, 167, 3, 200);
          ellipse(this.x + this.findia1, this.y, this.findia1, this.findia2);
        }
        if (this.dia1 == 80) {
          this.turnaround = false;
          this.eye1x = this.eye2x = 23;
        }
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    //body
    noStroke();
    if(this.stage==1){
      fill(255, 213, 3);
    }
    else if(this.stage==2){
      fill(255, 179, 203)
    }
    else if(this.stage==3){
     fill(179, 153, 255)
    }
    
    // fill(255, 213, 3);
    // ellipse(0,0,this.dia1,this.dia2)
    arc(0, 0, this.dia1, this.dia2, this.mouthstop, this.mouthstart);

    //eye
    fill(0);
    circle(this.eye1x, this.eye1y, 7);
    circle(this.eye2x, this.eye2y, 7);

    //tail
    
    if(this.stage==1){
      fill(255, 167, 3, 200);
    }
    else if(this.stage==2){
      fill(241, 108, 179);
    }
     else if(this.stage==3){
      fill(136, 96, 255);
    }
    
    ellipse(
      -this.dia1 / 2 - this.taildia1 / 2,
      0,
      this.taildia1,
      this.taildia2
    );

    //fin1
    ellipse(-this.findia1, 0, this.findia1, this.findia2);
    
    
    
    // fill("red");
    // circle(0,0,5)
    pop();
  }
}

class Seaweed {
  constructor(startX, startY, w, h, a) {
    this.x = startX;
    this.rootY = startY;
    this.angle = a;
    this.swidth = w;
    this.sheight = h;
    this.r=random(100,120)
    this.g=random(130,150)
    this.b=random(70,90)
  }
  update() {
    this.angle += 0.1;
    this.x1 = this.x + map(sin(this.angle), -1, 1, -8, 8);
    this.x2 = this.x + map(sin(this.angle + 0.3 * PI), -1, 1, -8, 8);
    this.topchange =
      this.sheight + map(sin(this.angle + 0.7 * PI), -1, 1, 0, 8);
  }
  display() {
    
    fill(this.r, this.g,this.b);
    beginShape();
    curveVertex(this.x, this.rootY);
    curveVertex(this.x, this.rootY);
    curveVertex(this.x1, this.rootY - this.sheight / 3);
    curveVertex(this.x2, this.rootY - (this.sheight * 2) / 3);
    curveVertex(this.x + this.swidth / 2, this.rootY - this.topchange);
    curveVertex(this.x2 + this.swidth, this.rootY - (this.sheight * 2) / 3);
    curveVertex(this.x1 + this.swidth, this.rootY - this.sheight / 3);
    curveVertex(this.x + this.swidth / 2, this.rootY);
    curveVertex(this.x + this.swidth / 2, this.rootY);
    endShape();
  }
}

class Bubble {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.sinInPut = random(0, PI);
    this.dia1 = random(60, 80);
    this.dia2 = this.dia1;
    this.speedX = 0;
    this.speedY = random(-10, -5);
    this.inRange = true;
    this.isTouched=false
    this.type = random([-2, -1, 0, 1, 2]);
  }
  // methods (functions): particle's behaviors
  update() {
    // (add)
    this.sinInPut += 0.1;
    this.x += map(sin(this.sinInPut), -1, 1, -3, 3);
    this.y += this.speedY;
    this.dia1 += random(-0.5, 0.5);
    this.dia2 += random(-0.5, 0.5);
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(255, 50);
    stroke(255, 200);
    strokeWeight(random(1, 1.5));
    ellipse(0, 0, this.dia1, this.dia2);

    stroke(255, 100);
    strokeWeight(3);
    noFill();
    arc(0, 0, this.dia1 - 10, this.dia2 - 10, PI + 3 * QUARTER_PI, 2 * PI);

    if (this.type == -1) {
      
       textSize(20);
      text("+20", 0, 0);
     
    }

    pop();
  }
  checkOutOfRange() {
    if (this.y < 0) {
      this.inRange = false;
    }
    if (
      myfish.y<= this.y + this.dia1 &&
      this.y - this.dia1 <= myfish.y &&
      myfish.x <= this.x + this.dia2 &&
      this.x - this.dia2 <= myfish.x
    ) {
      this.inRange = false
      // this.isTouched=true
       if (this.type == -1) {
      score+=20
    }
      else{
        score+=5
      }
    }
  }
}

class smallFish {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speedX = random([-1.5, -1, 1, 1.5]);
    this.speedY = random([-1, 1]);
    this.bodySize = random(10, 20);
    this.escapeSpeedx = 2;
    this.escapeSpeedy = 2;
    this.groupExtent = 180;
    this.isEaten = false;
    this.movement = 0;
    this.sinInPut = 0;

    this.inDanger = false;
  }
  display() {
    if (this.speedX > 0) {
      push();
      translate(this.x, this.y);

      // if mouse is close
      //    if mouseX is bigger than this.x scale(1, 1)
      //    else scale(-1, 1)
      // scale(1, 1);
      // if (this.inDanger == true) {
      //   if (myfish.x >= this.x) {
      //     scale(-1, 1);
      //   } else if(myfish.x< this.x){
      //     scale(1, 1);
      //   }
      // } 

      fill(60, 180, 160);
      noStroke();
      triangle(
        0,
        0,
        -this.bodySize * 0.5,
        -this.bodySize * 0.5 - this.movement,
        -this.bodySize * 0.5 + this.movement,
        this.bodySize * 0.5
      );

      triangle(
        this.bodySize * 1.7,
        0 + this.movement,
        0,
        this.bodySize,
        0,
        -this.bodySize
      );
      fill(170, 250, 120);
      ellipse(
        this.bodySize,
        -this.bodySize * 0.1 + this.movement,
        this.bodySize * 0.08,
        this.bodySize * 0.2
      );
      pop();
    }

    if (this.speedX < 0) {
      push();
      translate(this.x, this.y);

      // if (this.inDanger == true) {
      //   if (myfish.x >= this.x) {
      //     scale(1, 1);
      //   } else if(myfish.x< this.x) {
      //     scale(-1, 1);
      //   }
      // }

      fill(60, 180, 160);
      noStroke();
      triangle(
        0,
        0,
        this.bodySize * 0.5,
        this.bodySize * 0.5 + this.movement,
        this.bodySize * 0.5 + this.movement,
        -this.bodySize * 0.5
      );

      triangle(
        -this.bodySize * 1.7,
        0 + this.movement,
        0,
        -this.bodySize,
        0,
        this.bodySize
      );
      fill(170, 250, 120);
      ellipse(
        -this.bodySize,
        -this.bodySize * 0.1 + this.movement,
        this.bodySize * 0.08,
        this.bodySize * 0.2
      );
    //   fill("red");
    // circle(0,0,5)
      pop();
    }
  }
  update() {
    
     this.x += this.speedX;
    this.y += this.speedY; 
    
    
    
    this.sinInPut += 0.1;
    this.movement = map(sin(this.sinInPut), -1, 1, -3, 3);
    
    if (dist(myfish.x, myfish.y, this.x, this.y) < 180) {
      this.inDanger = true; } else {
      this.inDanger = false;
    }

      if (myfish.x < this.x-5 &&this.inDanger == true) {
     
        this.x -= this.escapeSpeedx;
      } else if (myfish.x>this.x+5 &&this.inDanger == true) {
       
        this.x += this.escapeSpeedx;
      }
      if (myfish.y < this.y &&this.inDanger == true) {
        this.y += this.escapeSpeedy;
      } else if (myfish.y>this.y &&this.inDanger == true) {
        this.y -= this.escapeSpeedx;
      }
     
        
        
        
       
        
        
        
   

    if (this.x <= 0){
      this.x=10
      this.speedX = -this.speedX;
    }
    else if (this.x >= backgroundW){
      this.x=backgroundW-10
      this.speedX = -this.speedX;
      }
    
    if (this.y <= 0) {
      this.speedY = -this.speedY;
      }
    else if (this.y >= backgroundH) {
      this.speedY = -this.speedY;
    }
    
    
    
    
    
  }
  checkIfEaten() {
    if (dist(myfish.x, myfish.y, this.x, this.y) < 50 ) {
      this.isEaten = true;
      fishOpenMouth=true
      score += 10;

    }
    else{
      fishOpenMouth=false
    }
  }
}


window.addEventListener("keydown", function(event){
  event.preventDefault();
})


class bigFish{
  constructor(startX,startY){
    this.x=startX
    this.y=startY
    this.w=200
    this.h=160
    this.startChasing=false
    this.eyePosition=-20
    this.finSize=50
    this.finPosition=-30
    
    this.turnAround=false
    
    this.sinInPut=0
    this.movement=0
    
    this.speed=5
    
    this.shouldTurn=false
    
    this.fightArc=0
    
    this.lose=false
    this.losePoints=false
    
  }
  display(){
    push()
    translate(this.x,this.y)
    
     noStroke()
     fill(164, 84, 110)
    rect(-this.w/2-this.finSize+this.movement,-this.finSize/2+this.movement/2,this.finSize,this.finSize+this.movement,10)
    
     
    
    fill(200, 117, 143)
    rect(-this.w/2+this.movement,-this.h/2+this.movement,this.w,this.h,50)
    
    fill(164, 84, 110)
   rect(this.finPosition+this.movement,0-this.movement/2,this.finSize-this.movement,this.finSize,10)
    
    
    if(this.startChasing==false){
      if(this.lose==false){
        fill(0)
      circle(this.w/2+this.eyePosition+this.movement,-this.h/2+this.h/3+this.movement,10)
      }
      
     else if(this.lose==true){
        fill(0)
      textSize(20) 
     text("x",this.w/2+this.eyePosition+this.movement,-this.h/2+this.h/3+this.movement)
      }
      
      
      
    }
    
    else if(this.startChasing==true){
     
      if(this.turnAround==false){
        fill(0)
      triangle(this.w/2-25+this.movement,-this.h/2+this.h/3+this.movement,this.w/2-40+this.movement,-this.h/2+this.h/4+this.movement,this.w/2-20+this.movement,-this.h/2+this.h/3.5+this.movement)
      textSize(50)
      text("💢",10,-this.h/2)
      }
      
      if(this.turnAround==true){
        fill(0)
      triangle(this.w/2+25+this.movement,-this.h/2+this.h/3+this.movement,this.w/2+40+this.movement,-this.h/2+this.h/4+this.movement,this.w/2+20+this.movement,-this.h/2+this.h/3.5+this.movement)
      textSize(50)
      text("💢",-10,-this.h/2)
      }
      
      
      
     
    }
    
    
    
    // fill(0,255,255)
    // circle(0,0,5)
    pop()
    
    
    
  }
  
  update(){
    this.x+=this.speed
    this.sinInPut+=0.1
    this.movement=map(sin(this.sinInPut),-1,1,0,10)
    
    // fill(0,255,0)
    // circle(this.x+this.w/2,this.y,100)
    // fill(0,0,255)
    // circle(myfish.x,myfish.y,100)
    
    if(myfish.stage==1){
      
      if(dist(myfish.x,myfish.y,this.x,this.y)<500&&myfish.x>this.x+this.w/2&&this.turnAround==false){
        
         this.startChasing=true
          this.x+=10
        
        if(myfish.y<this.y){
          this.y-=5
        }
        else if(myfish.y>this.y){
          this.y+=5
        }
      
        
      }
   else{
        this.startChasing=false
      }    
       
    
        if(dist(myfish.x,myfish.y,this.x,this.y)<500&&myfish.x<this.x-this.w/2&&this.turnAround==true){
         this.startChasing=true
          this.x-=10
          
          if(myfish.y<this.y){
          this.y-=5
        }
        else if(myfish.y>this.y){
          this.y+=5
        }
        
          
      }

  
      
    }
    

  
    if(this.startChasing==true&&myfish.stage==1){
     if(this.turnAround==false&&myfish.x<this.x+this.w/2&&myfish.y<this.y+this.h/2&&myfish.y>this.y-this.h/2) {
       score=0
       this.losePoints=true
       console.log("chase1")
     }
    if(this.turnAround==true&&myfish.x>this.x+this.w/2&&myfish.y<this.y+this.h/2&&myfish.y>this.y-this.h/2) {
       score=0
      this.losePoints=true
      console.log("chase2")
     } 
      
      
      
      
    }
    
    
      
if(myfish.stage==3){
  
   if(dist(myfish.x,myfish.y,this.x,this.y)<300&&myfish.x<this.x-this.w/2&&this.turnAround==true){
     this.startChasing=true
     this.speed=0
     // textSize(50)
     // fill(0,255,255)
     //     text("start Fighting!",width/2,height/2)
     fill(255)
     
      if(this.fightArc<2*PI){
      arc(this.x,this.y,600,600,this.fightArc,2*PI)
    
    textSize(30)
    fill(0,255,255)
    
     //    text("start Fighting!", this.x+this.w/2,this.y-200)
     // text("click the mouse!", this.x+this.w/2,this.y-100)
        text("start Fighting!", myfish.x,myfish.y-100)
     text("click the mouse!", myfish.x,myfish.y-50)
    
    if(mouseIsPressed==true){
      this.fightArc+=0.01*PI
    }
    }
    
    
    if(this.fightArc>=2*PI){
      createCanvas(800,800)
      background(0)
      textSize(100)
      fill(255,255,0)
      text("congratulations!",50,300)
      text("you win!!",200,400)
      
      for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(mouseX,
mouseY)) }
  // }
  console.log(confettis.length)

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].checkOutOfCanvas()
    confettis[i].display();
} 
for(let i = 0; i < confettis.length; i++){
  if(confettis[i].onCanvas==false){
    confettis.splice(i,1)
  }
}
      
      this.startChasing=false
      this.lose=true
    }
    
     
     
     
     
     
     
     
     
      }
  
  if(dist(myfish.x,myfish.y,this.x,this.y)<300&&myfish.x>this.x+this.w/2&&this.turnAround==false){
    this.startChasing=true
    this.speed=0
    fill(255)
    
    if(this.fightArc<2*PI){
      arc(this.x,this.y,600,600,this.fightArc,2*PI)
    
    textSize(30)
    fill(0,255,255)
    // text("start Fighting!", this.x-this.w/2,this.y-200)
    //  text("click the mouse!", this.x-this.w/2,this.y-100)
      text("start Fighting!", myfish.x,myfish.y-100)
     text("click the mouse!", myfish.x,myfish.y-50)
      
    if(mouseIsPressed==true){
      this.fightArc+=0.01*PI
    }
    }
    
    
    if(this.fightArc>=2*PI){
      createCanvas(800,800)
      background(0)
      textSize(100)
      fill(255,255,0)
      text("congratulations!",50,300)
      text("you win!!",200,400)
      for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(mouseX,
mouseY)) }
  // }
  console.log(confettis.length)

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].checkOutOfCanvas()
    confettis[i].display();
} 
for(let i = 0; i < confettis.length; i++){
  if(confettis[i].onCanvas==false){
    confettis.splice(i,1)
  }
}

      this.startChasing=false
      this.lose=true
    }
    
    
    
    
      }
  
  
}
    
 
    
    
    
    
    
    
    
    if(this.x<0||this.x>backgroundW){
      this.shouldTurn=true
    }
    
    
    
    if(this.shouldTurn==true){
      
      if(this.turnAround==true){
        this.turnAround=false
      }
      else if(this.turnAround==false){
        this.turnAround=true
      }
      
      this.speed=-this.speed
      this.eyePosition=-this.eyePosition
      this.w=-this.w
      this.finPosition=-this.finPosition
      
      this.finSize=-this.finSize
      this.shouldTurn=false
      }
 
  
 }
    
  
  
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.r=random(50,255)
    this.g=random(50,255)
    this.b=random(50,255)

    this.onCanvas=true
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    this.speedY=this.speedY+0.1
    this.speedX=this.speedX*0.99
 
} 

checkOutOfCanvas(){
  if(this.y>height){
    this.onCanvas=false
  }
}

display(){
    push();
    translate(this.x, this.y);
      fill(this.r,this.g,this.b);
      noStroke();
      circle(0, 0, this.size);
pop(); }
}
