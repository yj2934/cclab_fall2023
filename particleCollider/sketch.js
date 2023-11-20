let atoms=[]
let numAtoms=20
let fruitImages=[]

function preload(){
  for(let i=0; i<3;i++){
    let path= "images/fruit"+i+".png"
    console.log(path)
    fruitImages[i]=loadImage(path)
  }

  }

function setup(){   
    let cnv = createCanvas(800, 400);
    cnv.parent("canvasWrapper");
    for(let i=0; i<numAtoms;i++){
        let ran=random([0,1,2])
        atoms[i]=new Atom(fruitImages[ran])
    }
   rectMode(CENTER)

}

function draw(){
    background(0);

if(random()<0.02){
    atoms.push(new Atom(fruitImages[0]))
}

    

    for(let i=0;i<atoms.length; i++){
       
        let currentAtom = atoms[i]
        currentAtom.fly()
        currentAtom.display()
        currentAtom.checkIfOnCanvas()
        currentAtom.isTouched=false


        //for each atom, check 
        for(let j=0;j<atoms.length; j++){
            if(i!=j&&currentAtom.isTouched==false){
 let otherAtom = atoms[j]
       let otherX=otherAtom.x
       let otherY=otherAtom.y

       currentAtom.checkIfTouched(otherX,otherY)

            }
           
        }
    }
    
    for(let i= atoms.length-1;i>=0;i-=1){
       if(atoms[i].isOnCanvas==false){
            atoms.splice(i,1)
        }
    }
    
}

class Atom{
    constructor(fruitImage){
this.img=fruitImage
        // this.x=width/2s
        this.y=random(0,height)
        this.size=40
        this.speed=random(4,7)
        this.direction=random([-1,1])
        this.isOnCanvas=true

        this.isTouched=false

        if(this.direction==-1){
            this.x=width+100
        }
        if(this.direction==1){
            this.x=-100
        }
    }
    display(){
push()
translate(this.x,this.y)

if(this.isTouched==false){
    fill(255)
}
else if(this.isTouched==true){
    fill(0,0,255)
}

// rect(0,0,this.size,this.size)
push()
scale(0.15)
image(this.img,-this.img.width/2,-this.img.height/2)
pop()

pop()

    }

    fly(){
this.x+=this.speed*this.direction
    }

    checkIfTouched(otherX,otherY){
        let leftEdge=this.x-this.size/2
        let rightEdge=this.x+this.size/2
        let upperEdge=this.y-this.size/2
        let lowerEdge=this.y+this.size/2
        if(otherX>leftEdge&&otherX<rightEdge&&otherY>upperEdge&&otherY<lowerEdge){
            this.isTouched=true
        }else{
            this.isTouched=false
        }
    }
    checkIfOnCanvas(){
if(this.x<-100||this.x>width+100){
    this.isOnCanvas=false 
}
    }

}