//Game State Data
  // We need
  //https://boardgames.stackexchange.com/questions/57983/how-to-name-checkers-moves

const board = [
    null, 0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6, null, 7, null, 8, null, 9, null, 10, null, 11, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 12, null, 13, null, 14, null, 15, null, 16, null, 17, null, 18, null, 19, null, 20, null, 21, null, 22, null, 23, null
]
//DOM REFERENCES
  //Documentation from:
    //https://www.w3schools.com/jsref/dom_obj_var.asp
    //https://www.w3schools.com/jsref/met_document_queryselector.asp

const cells = document.querySelectorAll("td");
let redPieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span")
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider")

//TO DO: FUNCTION THAT VALIDATED LEGAL MOVES
  //REMOVE PIECE THAT IS ELIMINATED
  //MOVEMENT OF THE PIECES