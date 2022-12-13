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

//TO DO: FUNCTION THAT VALIDATED LEGAL MOVES - 
  //REMOVE PIECE THAT IS ELIMINATED
  //MOVEMENT OF THE PIECES  -done


  let redPieceScore = 12;
  let blackPieceScore = 12;
  const turn = true; //current player turn

  let SelectedPiece = {
    pieceId: -1, indexPiece: -1, isKing: false, seventhSpace: false, ninthSpace: false, fourteenthSpace: false, eightteenthSpace: false, negativeSevenhSpace: false, negativeNinthSpace: false,  negativefourteenthSpace: false, negativeEighteenthSpace: false 
  }//with the board array I needed a var that hold the piece's properties & legal movements


  // Add an event listener to each piece
  function piecesMovement(){
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener('click',  getPiecescount)
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener('click', getPiecescount)
        }
    }
  }
  //This is a funtion that get the pieces count 
  function getPiecescount(){
    if (turn === true ) {
        playerPieces = redPieces; // line 14
    } else {
        playerPieces = blackPieces;// line 15
    }
    removeOnClick();
  }
// function that removes Onclick on pieces, src https://forum.boardgamearena.com/viewtopic.php?t=17885&start=10
// Element.removeAttribute() from https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
  function removeOnClick(){
    for (let i = 0; i < tableaCells.length; i++) {
        tableCells[i].removeAttribute("onclick");
    }
  }
