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

  let redPieceScore = 12;
  let blackPieceScore = 12;
  const turn = true; //current player turn

  let selectedPiece = {
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
  //This is a funtion that hold the pieces count 
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
// we change the color of the piece that is choose & after thatr turn the piece  back to a normal piece 
function changeColorPiece() {
    for (let i = 0; i < playerPieces.length; i++) {
       playerPieces[i].style.border= "1px solid rgb(255, 192, 203)";
    }
    resetPieceProperties()
}

function resetPieceProperties(){
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eightteenthSpace = false;
    selectedPiece.negativeSevenhSpace = false;
    selectedPiece.negativeNinthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eightteenthSpace = false;

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

// this function gets the id piece & the cell of the index board ; the event.target return a string , we need to make it a number 
function getSelectedPiece(){
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexPiece = findpiece(selectedPiece.pieceId);
    ifPieceIsKing();
}
//array.prototype.indexof https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// This funtion find where the piece is located on the board 

//return the first index
function findpiece(pieceId){
    let parse = parseInt(pieceId);
    return board.indexOf(parse)
};
// element. classlist.contains  from https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
function ifPieceIsKing(){
    if(document.getElementById(selectedPiece.pieceId).classList.contains("king")){
      selectedPiece.isKing = true;
    }else{
      selectedPiece.isKing = false;
    }
}

//TO DO: FUNCTION THAT VALIDATED LEGAL MOVES - 
         //TO DO : REMOVE PIECE THAT IS ELIMINATED
          // TO DO : MOVEMENT OF  PIECES 

// onClick event from https://www.w3schools.com/tags/att_onclick.asp
//  https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
function onClickCells(){
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", //"makeMove()")
    }
}
//this funciton will take a numbr as an argument 
// the number of cells the piece will move

function makeAMove(number){
    document.getElementById(selectedPiece.pieceId).remove(); 
    cells[selectedPiece.indexPiece].innerHTML = "";
    //get the id piece & remove it also change the cell to empty string  
    if(turn){
      if (selectedPiece.isKing) {
          cells[selectedPiece.indexPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
          redPieces = document.querySelectorAll("p");
      }else{
          cells[selectedPiece.indexPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
          redPieces = document.querySelectorAll("p");
      }
      //create a new element at the new cell that was clicked , then reset the red pieces variable so it can be save in the js memory , same with the black pieces  
    }else{
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            redPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexPiece + number].innerHTML = `<span class="red-piece king" id="${selectedPiece.pieceId}"></span>`;
            redPieces = document.querySelectorAll("span");
        }// this if statement is the same but with the black-pieces
    }
    // this variable is made to pass the object propert directly into the function's argument
    let boardPiece = selectedPiece.indexPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeTheData(boardPiece, boardPiece + number, boardPiece + number / 2);
    }else{
        changeTheData(boardPiece, boardPiece + number);
    }
}
    //this function change the board data on the back end 
function changeTheData(){
    board[indexPiece] = null;
    board[newIndex] = parseInt(selectedPiece.pieceId); //change the original position of the selected piece to null & move the data to the new position
    if(turn && selectedPiece.pieceId < 12 && newIndex >=57){
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if(turn === false && selectedPiece.pieceId >= 12 && newIndex <=7){
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    //if the position of the piece is >=51 (last row) then the iece become a king the same with the blacks using <+7

    // if a piece s removed change the data to null &  remove a point to the team score   
    if(removePiece){
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackPieceScore--
        }
        if (turn === false && seletedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = ""
            redPieceScore--
        }
    }
}