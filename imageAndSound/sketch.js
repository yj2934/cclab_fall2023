console.log("js is linked!");
let readyToChop=true
let karateChop
let backgroundImage
let fruit1
let cherriesImage
this.onCanvas=true

function preload(){
    karateChop = loadSound("sounds/karateChop.m4a")
    backgroundImage=loadImage("images/gradient-bkg.png")
    cherriesImage=loadImage("images/cherries.png")
}

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
   fruit1=new Fruit(width/2,height/2,cherriesImage) 
}

function draw(){
    background(0,50);
    image(backgroundImage,0,0,400,400)
stroke(255)
line(pmouseX,pmouseY,mouseX,mouseY)
    let distance = dist(pmouseX,pmouseY,mouseX,mouseY)
    if(mouseIsPressed==true){
        if (distance>30&&readyToChop==true){
            karateChop.play()
            readyToChop=false
        }
        else if(distance<10){
            readyToChop=true
        }

    }
fruit1.update()
    fruit1.display()
    
}

class Fruit{
    constructor(startX,startY,fruitImg){
        this.x=startX
        this.y=startY
        this.img=fruitImg
        this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    
        this.speedY=this.speedY+0.1
        this.speedX=this.speedX*0.99
     
    } 
    display(){
        push()
        translate(this.x,this.y)
        circle(0,0,30)
        image(this.img,-25,-25,50,70)
        pop()
    }
    checkOutOfCanvas(){
        if(this.y>height){
          this.onCanvas=false
        }
      }
    
}