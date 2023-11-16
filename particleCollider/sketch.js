let atoms=[]
let numAtoms=30

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    for(let i=0; i<numAtoms;i++){
        atoms[i]=new Atom()
    }
   rectMode(CENTER)

}

function draw(){
    background(0);
    for(let i=0;i<atoms.length; i++){
        
        let currentAtom = atoms[i]
        currentAtom.fly()
        currentAtom.display()
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
}

class Atom{
    constructor(){
        // this.x=width/2s
        this.y=random(0,height)
        this.size=40
        this.speed=random(4,7)
        this.direction=random([-1,1])

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

rect(0,0,this.size,this.size)
// fill(0,255,0)
// circle(0,0,5)
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

}