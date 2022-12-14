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
const redTurnText = document.querySelectorAll(".redTurn");
const blackTurnText = document.querySelectorAll(".blackTurn");
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
  function piecesEvent(){
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
    changeColorPiece();
  }
// function that removes Onclick on pieces, src https://forum.boardgamearena.com/viewtopic.php?t=17885&start=10
// Element.removeAttribute() from https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
  function removeOnClick(){
    for (let i = 0; i < tableaCells.length; i++) {
        tableCells[i].removeAttribute("onclick");
    }
  }
//TO DO: a function that change the color of the piece that is choose & after thatr turn the piece  back to a normal piece 
function changeColorPiece() {
    for (let i = 0; i < playerPieces.length; i++) {
       playerPieces[i].style.border= "1px solid rgb(255, 192, 203)";
    }
}
//Switch players 
// TO DO - set the style to green after to test the game ---------------------------------------
function switchPlayer(){
  if (turn) {
    turn = false;
    for (let i = 0; i < redTurnText.length ; i++) {
        redTurnText[i].style.color = "lightGrey";
        blackTurnText[i].style.color = "black"
    }
   }else {
      turn = true;
      for (let i = 0; i < blackTurnText.length; i++) {
          blackTurnText[i].style.color = "lightGrey"
          redTurnText[i].style.color = "black"
      }
   }
   piecesEvent();
}
piecesEvent();

// parseInt from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt its gona make us return an integer (numbers)
//event.target from https://stackoverflow.com/questions/57489670/type-of-event-target-value-should-be-changed-to-integer-in-react
function selectedPiece(){
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexPiece = findpiece(selectedPiece.pieceId);
}
//array.prototype.indexof https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
//return the first index
function findpiece(pieceId){
    let parse = parseInt(pieceId);
    return board.indexOf(parse)
}
