const newDiv = document.createElement("div");
newDiv.classList.add("field");
const body = document.body;
const my2DArray = [];
const rows = 9;
const columns = 9;
var num = 1;
var allowedIds = [];
var rectagle = document.createElement("div");

//check if string contains the same number twice
function isUnique(str) {
  return new Set(str).size == str.length;
}
//create array
for (let i = 0; i < rows; i++) {
  my2DArray[i] = [];
  for (let j = 0; j < columns; j++) {
    my2DArray[i][j] = 0;
  }
}

//random number
function rndnum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//create table
function tableCreate() {
  var myTableDiv = document.getElementById("myDynamicTable");
  var table = document.createElement("TABLE");
  var tableBody = document.createElement("TBODY");

  table.border = "1";
  table.appendChild(tableBody);
  table.setAttribute("id", "mytable");

  for (var i = 0; i < 9; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    tr.setAttribute("id", "tr" + i);

    for (var j = 0; j < 9; j++) {
      var g = document.createElement("button");
      if (j == 2) {
        g.border = "1";
      }
      g.setAttribute("id", "Div" + i + j);
      g.classList.add("field");
      g.textContent = "";
      g.onclick = (function(y, x) {
        return function() {
          reply_click(y, x);
        };
      })(i, j);

      var td = document.createElement("TD");
      td.appendChild(g);
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}

//changing numbers on click
function reply_click(y, x) {
  var current = document.getElementById("Div" + y + x);
  var entireString = "";
  var entireStringC = "";
  var entireStringBox = "";
  var forwards = true;

  current.textContent = num;
  my2DArray[y][x] = num;
  num++;

  if (num > 9) {
    num = "";
  }

  //horizontally checking
  for (var j = 0; j < 9; j++) {
    var xAsInt = parseInt(j);
    let entireRow = xAsInt.toString();
    var currentrow = document.getElementById("Div" + y + entireRow);
    var text = currentrow.textContent;
    entireString += text;

    if (isUnique(entireString) == false) {
      console.log("2 in a row ");
      forwards = false;
      current.style.backgroundColor = "#ffc4d2";
      for (var i = 0; i < 9; i++) {
        var xAsInt = parseInt(i);
        let entireRow = xAsInt.toString();
      }
    } else {
      current.style.backgroundColor = "#fafafa";
    }
  }

  //vertically checking
  if (forwards) {
    for (var k = 0; k < 9; k++) {
      var yAsInt = parseInt(k);
      let entireColumn = yAsInt.toString();
      var currentcolumn = document.getElementById("Div" + entireColumn + x);
      var text = currentcolumn.textContent;
      entireStringC += text;

      if (isUnique(entireStringC) == false) {
        console.log("2 in a row ");
        forwards = false;
        current.style.backgroundColor = "#ffc4d2";
        for (var l = 0; l < 9; l++) {
          var yAsInt = parseInt(l);
          let entireColumn = yAsInt.toString();
        }
      } else {
        current.style.backgroundColor = "#fafafa";
      }
    }
  }
  //checking for 3x3 fields
  if (forwards) {
    for (var bigField2 = 0; bigField2 < 9; bigField2 += 3) {
      for (var bigField = 0; bigField < 9; bigField += 3) {
        allowedIds = [];
        entireStringBox = "";

        for (var p = 0; p < 3; p++) {
          for (var p2 = 0; p2 < 3; p2++) {
            var pX = p2 + bigField;
            var pY = p + bigField2;
            var currentbox = "Div" + pX + pY;
            allowedIds.push(currentbox);
          }
        }
        var elements = document.getElementsByClassName('boxCurrent');
        allowedIds.forEach(function(id) {
          var element = document.getElementById(id);
          var text = element.textContent;
          entireStringBox += text;
          if (isUnique(entireStringBox) == false) {
            current.style.backgroundColor = "#ffc4d2";
            console.log("2 in a box");
            allowedIds = [];
          } else {
            current.style.backgroundColor = "#fafafa";
            for (var i = 0; i < elements.length; i++) {}
            allowedIds = [];
          }
        });
      }
    }
  }
}

//changes index of elements in an array
function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

//create random numbers on the board
function fillBoard() {
  var v = 0
  const rows = [
    rows1 = [
      row1 = [2, 4, 3, 9, 1, 8, 7, 5, 6],
      row2 = [1, 5, 6, 4, 3, 7, 9, 8, 2],
      row3 = [7, 8, 9, 6, 2, 5, 1, 3, 4],
    ],
    rows2 = [
      row4 = [3, 6, 2, 7, 4, 1, 8, 9, 5],
      row5 = [5, 9, 4, 8, 6, 3, 2, 1, 7],
      row6 = [8, 1, 7, 5, 9, 2, 4, 6, 3],
    ],
    rows3 = [
      row7 = [4, 7, 5, 1, 8, 6, 3, 2, 9],
      row8 = [6, 2, 8, 3, 7, 9, 5, 4, 1],
      row9 = [9, 3, 1, 2, 5, 4, 6, 7, 8],
    ],
  ];
  array_move(rows, rndnum(0, 2), 0)
  array_move(rows1, rndnum(0, 2), 0)
  array_move(rows2, rndnum(0, 2), 0)
  array_move(rows3, rndnum(0, 2), 0)

  for (var c = 0; c < 3; c++) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 9; j++) {
        var currentrow = rows[c];
        var currentrow2 = currentrow[i];
        var x = currentrow2.pop();
        var currentfield = document.getElementById("Div" + v + j);

        currentfield.textContent = x
      }
      v++
    }
  }
}

function clearboard(x) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var currentfield = document.getElementById("Div" + i + j);
      var num = rndnum(0, x)

      switch (true) {
        case (num > 3):
          currentfield.disabled = true;
          break;
        default:
          currentfield.textContent = "";
          break;
      }
    }
  }
}

function myFunction(x) {
  tableCreate()
  fillBoard()
  clearboard(x)

  var myDivs = document.getElementsByClassName("field2");
  for (var i = 0; i < myDivs.length; i++) {
    myDivs[i].style.border = "2px solid black";
  }

  var elems = document.getElementsByClassName('buttons');
  for (var i = 0; i < elems.length; i++) {
    elems[i].style.display = "none";
  }
}
