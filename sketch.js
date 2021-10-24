function make2dArray(cols, rows) {
  var tab = new Array(cols);
  for (var i = 0; i < cols; i++)
    tab[i] = new Array(rows);
  return tab;
}

function fillGrid(cols, rows, resolution) {
  var x, y;
  for (var i = 0; i < col; i++)
    for (var j = 0; j < row; j++) {
      x = i * resolution
      y = j * resolution
      if (tablica[i][j] === 0) {
        stroke(0)
        fill(255);
      }
      if (tablica[i][j] === 1) {
        stroke(255)
        fill(0);
      }
      rect(x, y, resolution, resolution);
    }
}


//button function
function changeBG() {
  if (loopIsActive) {
    loopIsActive = false;
    buttonName = "start"
    //noLoop()
  } else {
    loopIsActive = true;
    //loop()
    buttonName = "stop"
  }
}

function gameOfLife(old) {
  var neighbours = 0;
  var newOne = make2dArray(col, row);//old;

  for (var i = 0; i < col; i++)
    for (var j = 0; j < row; j++) {
      neighbours = numbersOfNeighbours(old, i, j)

      if ((neighbours < 2 || neighbours > 3) && old[i][j] == 1)
        newOne[i][j] = 0;
      else if (neighbours === 3 && old[i][j] == 0)
        newOne[i][j] = 1;
      else
        newOne[i][j] = old[i][j]; 
    }

  return newOne;
}

function numbersOfNeighbours(table, x, y) {
  var sum = 0;
  var cols, rows;
  for (var i = -1; i < 2; i++)
    for (var j = -1; j < 2; j++) {
      cols = (col + x + i) % col;
      rows = (row + y + j) % row;
      //if (table[cols][rows] === 1)
        sum+=table[cols][rows];
    }
  sum -= table[x][y];
  return sum;
}

function getColumn(x)
{
  for (var i = 0; i < col; i++)
    if(x >= i * res && x < (i+1) * res)
  return i;
  
  return "error"
}

function getRow(y)
{
  for (var i = 0; i < row; i++)
    if(y >= i * res && y < (i+1) * res)
  return i;
  
  return "error"
}

function mousePressed()
{
  swapColor(getColumn(mouseX),getRow(mouseY));
}

function mouseDragged()
{
  // var x = getColumn(mouseX);
  // var y = getRow(mouseY);
  swapColor(getColumn(mouseX),getRow(mouseY));
}

function swapColor(x,y)
{
  if(tablica[x][y] === 1)
    tablica[x][y] = 0;
  else if(tablica[x][y] === 0)
    tablica[x][y] = 1;
  
}
//////////////////////////////////////
//global variables
/////////////
var tablica;
var col;
var row;
var res = 10
let button, buttonName = "start";
var loopIsActive = false;

///////////////////////////////
//main program
///////////////
function setup() {
  createCanvas(1200, 1200);
  button = createButton(buttonName);
  button.mousePressed(changeBG);

  col = width / res;
  row = height / res;

  tablica = make2dArray(col, row);

  for (var i = 0; i < col; i++)
    for (var j = 0; j < row; j++)
      // if (i > 0 && i < col - 1 && j > 0 && j < row - 1) // warunki brzegowe
      tablica[i][j] = 0//floor(random(2));
  // else
  //   tablica[i][j] = 0;

}

function draw() {
  
  background(0); // zero to czarny
  frameRate(30);

  fillGrid(col, row, res);
  if(loopIsActive)
  tablica = gameOfLife(tablica)
}