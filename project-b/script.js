function setup() {
  createCanvas(400, 400);
  myfish = new MyFish(100, 100);
 
}

function draw() {
  background(7,53,84);
  myfish.update();
  myfish.display(); 
}

class MyFish{
  constructor(startX,startY){
    this.sinInPut=0
    this.x=startX
    this.y=startY
    this.dia1=80
    this.dia2=70
    this.eye1x=23
    this.eye1y=-10
    this.eye2x=23
    this.eye2y=-10
    this.mouthstart=2*PI
    this.mouthstop=0
    this.taildia1=30
    this.taildia2=30
    this.findia1=20
    this.findia2=20
    this.mode=1
    this.turnaround=false
  }
  update(){
    if(this.turnaround==false){
      
    this.sinInPut+=0.2
    this.taildia1=map(sin(this.sinInPut),-1,1,1,20)
      this.findia1=map(sin(this.sinInPut),-1,1,1,20)
      
    if(mouseIsPressed==true){
    this.mouthstart=2*PI-0.1
      this.mouthstop=0.1
      this.eyey=-11
      fill(255,213,3)
      noStroke()
      circle(this.x,this.y,40)
    }
    else if(mouseIsPressed==false){
    this.mouthstart=2*PI
      this.mouthstop=0
      
    }
    if(keyIsPressed==true&&key=="ArrowRight"){
      text("moving right",20,20)
      textSize(20)
      fill(255,255,0)
      this.x+=2
    }
    else if(keyIsPressed==true&&key=="ArrowUp"){
      text("moving up",20,20)
      textSize(20)
      fill(255,255,0)
      this.y-=2
    }
    else if(keyIsPressed==true&&key=="ArrowDown"){
      this.y+=2
      text("moving down",20,20)
      textSize(20)
      fill(255,255,0)
    }
    else if(keyIsPressed==true&&key=="ArrowLeft"){
      fill(255,255,0)
      text("moving left",20,20)
      textSize(20)
      
      this.taildia1=map(sin(this.sinInPut),-1,1,-20,20)
   this.eye1x-=0.9
      this.eye2x-=0.5
     this.dia1-=2
      if(0<this.dia1&&this.dia1<=20){
        noStroke()
        this.dia1=-20
         fill(255,167,3,200)
      ellipse(this.x+this.findia1,this.y,this.findia1,this.findia2)
      }
      else if(-80<this.dia1&&this.dia1<=-20){
      this.eye2x-=0.8
        fill(255,167,3,200)
      ellipse(this.x+this.findia1,this.y,this.findia1,this.findia2)
      }
      else if(this.dia1==-80){
        this.turnaround=true
        this.eye1x=this.eye2x=-23
      }
    }
    }
    
    if(this.turnaround==true){
    this.sinInPut+=0.2
    this.taildia1=map(sin(this.sinInPut),-1,1,-20,1)
      this.findia1=map(sin(this.sinInPut),-1,1,-20,1)
    if(mouseIsPressed==true){
    this.mouthstart=PI-0.1
      this.mouthstop=PI+0.1
      this.eyey=-11
      noStroke()
      fill(255,213,3)
      circle(this.x,this.y,40)
    }
    else if(mouseIsPressed==false){
    this.mouthstart=3*PI
      this.mouthstop=PI
      
    }
    if(keyIsPressed==true&&key=="ArrowLeft"){
      text("moving left",20,20)
      textSize(20)
      fill(255,255,0)
      this.x-=2
    }
    else if(keyIsPressed==true&&key=="ArrowUp"){
      text("moving up",20,20)
      textSize(20)
      fill(255,255,0)
      this.y-=2
    }
    else if(keyIsPressed==true&&key=="ArrowDown"){
      text("moving down",20,20)
      textSize(20)
      fill(255,255,0)
      this.y+=2
    }
    else if(keyIsPressed==true&&key=="ArrowRight"){
      text("moving right",20,20)
      textSize(20)
      fill(255,255,0)
      this.taildia1=map(sin(this.sinInPut),-1,1,-20,20)
   this.eye2x+=0.9
      this.eye1x+=0.5
     this.dia1+=2
      if(-20<this.dia1&&this.dia1<=0){
        this.dia1=20
        fill(255,167,3,200)
      ellipse(this.x+this.findia1,this.y,this.findia1,this.findia2)
      }
       else if(20<=this.dia1&&this.dia1<80){
      this.eye1x+=0.8
         fill(255,167,3,200)
      ellipse(this.x+this.findia1,this.y,this.findia1,this.findia2)
       }
      if(this.dia1==80){
        this.turnaround=false
        this.eye1x=this.eye2x=23
      }
    }
    }
  }
  display(){
    push()
    translate(this.x,this.y)
    

    
    //body
    noStroke()
    fill(255,213,3)
    // ellipse(0,0,this.dia1,this.dia2)
    arc(0,0,this.dia1,this.dia2,this.mouthstop,this.mouthstart)
    
    //eye
    fill(0)
    circle(this.eye1x,this.eye1y,7)
    circle(this.eye2x,this.eye2y,7)
    
    //tail
    fill(255,167,3,200)
    ellipse(-this.dia1/2-this.taildia1/2,0,this.taildia1,this.taildia2)
    
    
    //fin1
    ellipse(-this.findia1,0,this.findia1,this.findia2)
    
    
    
    pop()
  }
  
}