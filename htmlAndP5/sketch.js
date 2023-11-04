let posx = 100;
let posy = 100;

let mred = 30;
let mgreen = 50;
let mblue = 90;
let colorincrease = 1;
let mdo = 30;
let mdos = 0.3;

let rmdo = 10;
let rmdos = 0.2;

let mode = 0;

let xArray1 = [];
let yArray1 = [];
let initalSizeOfArray1 = 5;

let xArray2 = [];
let yArray2 = [];
let initalSizeOfArray2 = 7;

let xArray3 = [];
let yArray3 = [];
let initalSizeOfArray3 = 7;

function setup() {
  let cnv = createCanvas(800, 800);
  cnv.parent("canvasWrapper");
}

function draw() {
  textSize(20)
  text("try to move the mouse/click the mouse",450,20)
  text("click c to clear the petri dishes",450,40)
  
  
  
  background(50, 20);

  //clear the background
  if(keyIsPressed==true&&key=="c"){
    fill(50)
    rect(0,0,800,800)
  }

  
  //subject body size change
  mdo = mdo + mdos;
  if (mdo > 40 || mdo < 20) {
    mdos = -mdos;
  }
  if (mdo > 42) {
    mdo = 30;
  }
  
  //reproduction body size change
  rmdo = rmdo + rmdos;
  if (rmdo <= 20) {
  }
  if (rmdo > 40 || rmdo < 20) {
    rmdos = -rmdos;
  }
  if (rmdo > 42) {
    rmdo = 30;
  }

  //subjects color change
  mred = mred + colorincrease;
  mgreen = mgreen + colorincrease;
  mblue = mblue + colorincrease;
  if (mblue > 230 || mblue < 60) {
    colorincrease = -colorincrease;
  }

  //subject 
  drawCreature(
    posx,
    posy,
    mdo,
    mdos,
    random(0, 2 * PI),
    random(50, 70),
    mred,
    mgreen,
    mblue,
    colorincrease
  );
  
  
  
//reproduction
  if (xArray3.length > 13) {
    drawCreatureReproduction(
      rposx,
      rposy,
      rmdo,
      rmdos,
      random(0, 2 * PI),
      random(30, 50),
      mred,
      mgreen,
      mblue,
      colorincrease
    );
  }

  //subject interaction: mouse is too far away
  if (dist(mouseX, mouseY, posx, posy) > 300) {
    posx += random(-1, 1);
    posy += random(-1, 1);
  }
  
  //interaction: mouse within subject's sensing range
  if (dist(mouseX, mouseY, posx, posy) <= 300) {
    if (mouseX > posx && mouseY > posy) {
      posy += random(0, 1);
      posx += random(0, 1);
    } else if (mouseX < posx && mouseY < posy) {
      posx -= random(0, 1);
      posy -= random(0, 1);
    } else if (mouseX > posx && mouseY < posy) {
      posx += random(0, 1);
      posy -= random(0, 1);
    } else if (mouseX < posx && mouseY > posy) {
      posx -= random(0, 1);
      posy += random(0, 1);
    } else if (mouseX == posx && mouseY == posy) {
      posx += random(-1, 1);
      posy += random(-1, 1);
    }
  }

  //reproduction interaction similar to the subject
  if (mode == 0) {
    rposx = posx + random(-50, 50);
    rposy = posy + random(-50, 50);
  } else if ((mode = 1)) {
    if (dist(mouseX, mouseY, rposx, rposy) <= 200) {
      if (mouseX > rposx && mouseY > rposy) {
        rposy += random(0, 0.5);
        rposx += random(0, 0.5);
      } else if (mouseX < rposx && mouseY < rposy) {
        rposx -= random(0, 0.5);
        rposy -= random(0, 0.5);
      } else if (mouseX > rposx && mouseY < rposy) {
        rposx += random(0, 0.5);
        rposy -= random(0, 0.5);
      } else if (mouseX < rposx && mouseY > rposy) {
        rposx -= random(0, 0.5);
        rposy += random(0, 0.5);
      } else if (mouseX == rposx && mouseY == rposy) {
        rposx += random(-1, 0.5);
        rposy += random(-1, 0.5);
      }
    }
  }

  
  //mouse position with light (interaction)
  noStroke();
  fill(255, 255, 204, 50);
  circle(mouseX, mouseY, 5);
  fill(255, 255, 204, 50);
  circle(mouseX, mouseY, 10);
}



function drawCreature(
  posx,
  posy,
  mdo,
  mdos,
  ranAngle,
  ranAmp,
  mred,
  mgreen,
  mblue,
  colorincrease
) {
  for (let j = 0; j < initalSizeOfArray2; j++) {
    xArray2[j] = posx;
    yArray2[j] = posy;
  }
  for (let k = 0; k < initalSizeOfArray3; k++) {
    xArray3[k] = posx;
    yArray3[k] = posy;
  }

    
    
    //putting cells out of subject's sensing range 
  for (let j = 0; j < xArray2.length; j++) {
    fill(mred, mgreen, mblue);
    circle(xArray2[j], yArray2[j], random(5, 10));
    
    //if the subject move closer to the cells, build connection
    if (dist(posx, posy, xArray2[j], yArray2[j]) < 200) {
      stroke(mred, mgreen, mblue);
      line(posx, posy, xArray2[j], yArray2[j]);
      
    }
  }

    //putting cells within subject's sensing range
  for (let k = 0; k < xArray3.length; k++) {
    fill(mred, mgreen, mblue);
    stroke(mred, mgreen, mblue);
    circle(
      xArray3[k],
      yArray3[k],
      map(sin(k + frameCount * 0.05), -1, 1, 5, 13)
    );
    line(posx, posy, xArray3[k], yArray3[k]);
    
    //if cells within range are close enough, they make connections with each other
    if (dist(xArray3[k], yArray3[k], xArray3[k - 1], yArray3[k - 1]) < 50) {
      line(xArray3[k - 1], yArray3[k - 1], xArray3[k], yArray3[k]);
      }
  }

    
    //body of the subject
  push();
  translate(posx, posy);
  for (let n = 0; n < 4; n++) {
    noStroke();
    fill(mred, mgreen, mblue);
    circle(0 + random(-8, 8), 0 + random(-8, 8), mdo);
  }

    //tentacles and cells generated by the subject itself to sense
  for (let i = 0; i < initalSizeOfArray1; i++) {
    xArray1[i] = sin(ranAngle) * ranAmp;
    yArray1[i] = cos(ranAngle) * ranAmp;
  }

  for (let i = 0; i < xArray1.length; i++) {
    let x = xArray1[i];
    let y = yArray1[i];
    fill(mred, mgreen, mblue);
    stroke(mred, mgreen, mblue);
    strokeWeight(2);
    circle(x, y, random(3, 8));
    line(0, 0, x, y);
  }

  pop();
}



function drawCreatureReproduction(
  rposx,
  rposy,
  rmdo,
  mdos,
  ranAngle,
  ranAmp,
  mred,
  mgreen,
  mblue,
  colorincrease
) {
    
  //reproduction body
  push();
  translate(rposx, rposy);
  for (let n = 0; n < 4; n++) {
    noStroke();
    fill(mred, mgreen, mblue);
    circle(0 + random(-8, 8), 0 + random(-8, 8), rmdo);
  }

  pop();
}


//interaction base
function mousePressed() {
 mode=1
  if (dist(mouseX, mouseY, posx, posy) > 300) {
    xArray2.push(mouseX);
    yArray2.push(mouseY);
  } else if (dist(mouseX, mouseY, posx, posy) < 300) {
    xArray3.push(mouseX);
    yArray3.push(mouseY);
  }
}
