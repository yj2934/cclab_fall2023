let sinInPut=0
function setup() {
  let cnv = createCanvas(180, 180);
    cnv.parent("canvasWrapper");
    
}

function draw() {
  background(7,53,84);
  sinInPut+=0.1
  push()
  translate(width/2,height/2+10)
  rotate(map(sin(sinInPut),-1,1,-PI/5,PI/5))
  fill(255, 106, 20)
  noStroke()
  ellipse(0,0,105,70)
  beginShape()
  curveVertex(0,-20)
  curveVertex(0,-20)
  curveVertex(-50,0)
  curveVertex(-38,35)
  curveVertex(-20,40)
  curveVertex(0,38)
  curveVertex(20,40)
  curveVertex(38,35)
  curveVertex(50,0)
   curveVertex(0,-20)
  curveVertex(0,-20)
  endShape()
  
  arc(-40,-70,30,40,-PI/3,3*PI/2)
  arc(40,-70,30,40,-PI/2,6*PI/5)
  
  stroke(255, 106, 20)
  strokeWeight(5)
  line(40,-50,30,-20)
  line(-40,-50,-30,-20)
  line(40,-20,70,-30)
  line(-40,-20,-70,-30)
  line(70,-30,80,-15)
  line(-70,-30,-80,-15)
  line(40,0,75,10)
  line(-40,0,-75,10)
  line(75,10,80,15)
  line(-75,10,-80,15)
  line(40,20,70,30)
  line(-40,20,-70,30)
  line(70,30,80,40)
  line(-70,30,-80,40)
  
  
  
  
  
  
  
  
  
  fill(0)
  noStroke()
  circle(15,-40,10)
  circle(-15,-40,10)
  pop()
}


