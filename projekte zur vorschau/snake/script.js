var player = document.getElementById("player");
var x = 10;
var y = 10;
var points = 0
var directionX = ''
var directionY = ''
var lastfield = ''
var lastkey = ''
var lastFields = []
document.getElementById("highscore").textContent =
  "hs: " + sessionStorage.getItem("highscore");
//create table
function tableCreate() {
  var table = document.getElementById("mytable");
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  for (var i = 0; i < 20; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    tr.setAttribute("id", "tr" + i);

    for (var j = 0; j < 20; j++) {
      var g = document.createElement("div");
      if (j == 2) {
        g.border = "1";
      }
      g.setAttribute("id", "Div_" + i + "_" + j);
      g.classList.add("field");
      g.style.backgroundColor = "#7abf71";
      var num = i + j
      if (num % 2 === 0) {
        g.style.backgroundColor = "#a8eba0";
      }

      var td = document.createElement("TD");
      td.appendChild(g);
      tr.appendChild(td);
    }
  }
  var start = document.getElementById("Div_10_10")
  start.appendChild(player)
}
//random number
function rndnum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//lost the game
function gameover() {
  if (sessionStorage.getItem("highscore") < points) {
    sessionStorage.setItem("highscore", points);
  }
  alert("you lost")
  location.reload();
}
//creates balls
function spawnpoint() {
  num1 = rndnum(0, 19)
  num2 = rndnum(0, 19)

  var getcurrent = "Div_" + num1 + "_" + num2
  var currentfield = document.getElementById(getcurrent)
  if (currentfield.querySelector(".segment")) {
    spawnpoint()
  }
  currentfield.appendChild(point)
  return currentfield;
}
//moves the snake
function move() {
  y = parseInt(y);
  y += directionY;

  x = parseInt(x);
  x += directionX;
  if (y > 19 || y < 0 || x > 19 || x < 0) {
    gameover()
  }
  var getcurrent = "Div_" + y + "_" + x
  var currentfield = document.getElementById(getcurrent)
  currentfield.appendChild(player)
  if (currentfield.querySelector(".segment")) {
    gameover()
  }
  if (currentfield.contains(point) == true) {
    points++;
    document.getElementById("pointcounter").textContent = "score: " + points;
    for (var k = 0; k < points; k++) {}
    CreateSegment(lastFields[lastFields.length - k])
    console.log(lastFields.length);
    spawnpoint()
  }

  for (var j = 1; j < points + 1; j++) {
    var segment = document.getElementById("segment_" + j);
    lastFields[lastFields.length - j].appendChild(segment);
  }

  //get user input
  document.addEventListener("keydown", function(event) {
    document.getElementById("movementkeys").style.display = "none";
    if (event.key === "w") {
      if (lastkey != 2) {
        lastkey = 1
        directionY = -1;
        directionX = 0;
      }
    }
    if (event.key === "s") {
      if (lastkey != 1) {
        lastkey = 2
        directionY = 1;
        directionX = 0;
      }
    }
    if (event.key === "a") {
      if (lastkey != 3) {
        lastkey = 4
        directionX = -1;
        directionY = 0;
      }
    }
    if (event.key === "d") {
      if (lastkey != 4) {
        lastkey = 3
        directionX = 1;
        directionY = 0;
      }
    }
  });
  lastFields.push(currentfield);
};
//creates part of the snake
function CreateSegment(x) {
  var segment = document.createElement("div");
  segment.classList.add("segment");
  x.appendChild(segment);
  segment.setAttribute("id", "segment_" + points);

}

tableCreate()
spawnpoint()
setInterval(move, 150);
