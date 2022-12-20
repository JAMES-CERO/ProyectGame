//Game State Data
  // We need
  //https://boardgames.stackexchange.com/questions/57983/how-to-name-checkers-moves

const board = [
    null, 0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6, null, 7, null, 8, null, 9, null, 10, null, 11, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 12, null, 13, null, 14, null, 15, null, 16, null, 17, null, 18, null, 19, null, 20, null, 21, null, 22, null, 23, null
]


//array.prototype.indexof https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// This funtion find where the piece is located on the board 

//return the first index

function findpiece(pieceId){
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
}
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

//player properties

  let turn = true; //current player turn
  let redPieceScore = 12;
  let blackPieceScore = 12;
  let playerPieces;
  

  let selectedPiece = {
    pieceId: -1,
    indexPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eightteenthSpace: false,
    negativeSeventhSpace: false,
    negativeNinthSpace: false, 
    negativefourteenthSpace: false,
    negativeEighteenthSpace: false 
  }//with the board array I needed a var that hold the piece's properties & legal movements
function startgame(){
    alert("StartGame")
}
startgame()


  // Add an event listener to each piece
  function piecesEvent(){
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener('click',  getPiecescount);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener('click', getPiecescount);
        }
    }
  }

  //This is a funtion that hold the pieces count 

  function getPiecescount(){
    if (turn) {
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
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
  }

// we change the color of the piece that is choose & after thatr turn the piece  back to a normal piece 

function changeColorPiece() {
    for (let i = 0; i < playerPieces.length; i++) {
       playerPieces[i].style.border= "2px green";
    }
    resetPieceProperties();
    getSelectedPiece();
}

function resetPieceProperties(){
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eightteenthSpace = false;
    selectedPiece.negativeSeventhSpace = false;
    selectedPiece.negativeNinthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eightteenthSpace = false;
}


// parseInt from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt its gona make us return an integer (numbers)
//event.target from https://stackoverflow.com/questions/57489670/type-of-event-target-value-should-be-changed-to-integer-in-react

// this function gets the id piece & the cell of the index board ; the event.target return a string , we need to make it a number 

function getSelectedPiece(){
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexPiece = findpiece(selectedPiece.pieceId);
    ifPieceIsKing();
}



function getEmptySpaces(){
    if(board[selectedPiece.indexPiece + 7] === null && cells[selectedPiece.indexPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if(board[selectedPiece.indexPiece + 9] === null && cells[selectedPiece.indexPiece+ 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if(board[selectedPiece.indexPiece - 7] === null && cells[selectedPiece.indexPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.negativeSeventhSpace = true;
    }
    if(board[selectedPiece.indexPiece - 9] === null && cells[selectedPiece.indexPiece - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.negativeNinthSpace = true;
    }
    getJumpSpaces()
}

function getJumpSpaces(){
    if(turn){
        if(board[selectedPiece.indexPiece + 14] === null
        && cells[selectedPiece.indexPiece + 14].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if(board[selectedPiece.indexPiece + 18] === null
        && cells[selectedPiece.indexPiece + 18].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece + 9] >= 12) {
                selectedPiece.eightteenthSpace = true;
        }
        if(board[selectedPiece.indexPiece - 14] === null
        && cells[selectedPiece.indexPiece - 14].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece - 7] >= 12) {
                selectedPiece.negativefourteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece - 18] === null
        && cells[selectedPiece.indexPiece - 18].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece - 9] >= 12) {
            selectedPiece.negativeEighteenthSpace = true;
        }

    }else{
        if(board[selectedPiece.indexPiece + 14] === null
         && cells[selectedPiece.indexPiece + 14].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece + 7] < 12 && board[selectedPiece.indexPiece + 7] !== null ) {
                selectedPiece.fourteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece + 18] === null
        && cells[selectedPiece.indexPiece + 18].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece + 9] < 12 && board[selectedPiece.indexPiece + 9] !== null ) {
                selectedPiece.eightteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece - 14] === null
        && cells[selectedPiece.indexPiece - 14].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece - 7] < 12 && board[selectedPiece.indexPiece - 7] !== null ) {
                selectedPiece.negativefourteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece - 18] === null
        && cells[selectedPiece.indexPiece - 18].classList.contains("noPieceHere") !== true && board[selectedPiece.indexPiece - 9] < 12 && board[selectedPiece.indexPiece - 9] !== null ) {
                selectedPiece.negativeEighteenthSpace = true;
            }
    }
    kingMovesRestrictions();
}



// element. classlist.contains  from https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

function ifPieceIsKing(){
    if(document.getElementById(selectedPiece.pieceId).classList.contains("king")){
      selectedPiece.isKing = true;
    }else{
      selectedPiece.isKing = false;
    }
    getEmptySpaces()
}
 // restricts movement if the piece is a king
function kingMovesRestrictions(){
    if (selectedPiece.isKing) {
        choosePieceBorder();
    } else {
        if(turn) {
            selectedPiece.negativeSeventhSpace = false;
            selectedPiece.negativeNinthSpace = false;
            selectedPiece.negativefourteenthSpace = false;
            selectedPiece.negativeEighteenthSpace = false;
        } else{
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eightteenthSpace = false;
        }
        choosePieceBorder();
    }
}

function choosePieceBorder(){
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace ||  selectedPiece.fourteenthSpace || selectedPiece.eightteenthSpace || selectedPiece.negativeSeventhSpace || selectedPiece.negativeNinthSpace ||  selectedPiece.negativefourteenthSpace || selectedPiece.negativeEighteenthSpace){
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        onClickCells()
    } else {
        return;
    }
}

//TO DO: FUNCTION THAT VALIDATED LEGAL MOVES - 
         //TO DO : REMOVE PIECE THAT IS ELIMINATED
          // TO DO : MOVEMENT OF  PIECES 

// onClick event from https://www.w3schools.com/tags/att_onclick.asp
//  https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
function onClickCells(){
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(14)");
    }
    if (selectedPiece.eightteenthSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(18)");
    }
    if (selectedPiece.negativeSevenhSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(-7)");
    }
    if (selectedPiece.negativeNinthSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(-9)");
    }
    if (selectedPiece.negativefourteenthSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(-14)");
    }
    if (selectedPiece.negativeEighteenthSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(-18)");
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
            blackPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blackPieces = document.querySelectorAll("span");
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
function changeTheData(indexPiece, newIndex, removePiece){
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
    resetPieceProperties(); //line 66
    removeOnClick(); // line 53
    piecesEventRemove(); // line 218
}

 // remove an event listener to each piece
 function piecesEventRemove(){
    if(turn ){
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].removeEventListener("click", getPiecescount);
        }
    }else{
        for (let i = 0; i < redPieces.length; i++) {
            blackPieces[i].removeEventListener("click", getPiecescount);
        }
    }
    winGame();
}
// https://www.w3schools.com/jsref/met_win_alert.asp
function winGame(){
    if (blackPieceScore === 0) {
        alert('BlacksWins');
        
    } else if(redPieceScore === 0){
        alert('RedWins');
    }
    switchPlayer();
}


//Switch players 
// TO DO - set the style to green after to test the game ---------------------------------------
function switchPlayer(){
    // if (turn) {
    //   turn = false;
    //   for (let i = 0; i < redTurnText.length ; i++) {
    //       redTurnText[i].style.color = "lightGrey";
    //       blackTurnText[i].style.color = "black";
    //   }
    //  }else {
    //     turn = true;
    //     for (let i = 0; i < blackTurnText.length; i++) {
    //         blackTurnText[i].style.color = "lightGrey";
    //         redTurnText[i].style.color = "black";
    //     }
    //  }
    if(turn){
        turn = false;
        alert("blacks turn");
    }else{
        alert("reds turn");
    }
     piecesEvent();
  }
  piecesEvent();
