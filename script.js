//Game State Data
  // We need
  //https://boardgames.stackexchange.com/questions/57983/how-to-name-checkers-moves

const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]


//array.prototype.indexof https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// This funtion find where the piece is located on the board 
// cached data
//return the first index

function findpiece(pieceId){
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};
//DOM REFERENCES
  //Documentation from:
    //https://www.w3schools.com/jsref/dom_obj_var.asp
    //https://www.w3schools.com/jsref/met_document_queryselector.asp

const cells = document.querySelectorAll("td");
let redPieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span")
const redTurnText = document.querySelectorAll(".redTurn");
const blackTurnText = document.querySelectorAll(".blackTurn");

//player properties

  let turn = true; //current player turn
  let redPieceScore = 12;
  let blackPieceScore = 12;
  let playerPieces;
  
  //with the board array I needed a variable  that hold the piece's properties  
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
  }
 
// Every time that the page loads is gonna show the message StartGame 
function startgame(){
    alert("Hey, welcome to checkers!. This game is my new Model Project, i hope you can enjoy this classic. Note: You can review the whole experience & how the game is building in my GitHub Account -- https://github.com/JAMES-CERO -- ")
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

  // function that removes Onclick on pieces, src https://forum.boardgamearena.com/viewtopic.php?t=17885&start=10
// Element.removeAttribute() from https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute

function removeOnClick(){
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
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



// we change the color of the piece that is choose & after thatr turn the piece  back to a normal piece 

function changeColorPiece() {
    for (let i = 0; i < playerPieces.length; i++) {
       playerPieces[i].style.border= "2px solid white";
    }
    resetPieceProperties();
    getSelectedPiece();
}
 // resset all the properties this is importante because this has to happen every cell click
 // we have all the possibles moves 
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

// element. classlist.contains  from https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

function ifPieceIsKing(){
    if(document.getElementById(selectedPiece.pieceId).classList.contains("king")){
      selectedPiece.isKing = true;
    }else{
      selectedPiece.isKing = false;
    }
    getEmptySpaces();
}

// VALIDATED LEGAL MOVES & empty spaces 
// possibles moves 
// how to manipulate table cells from https://stackoverflow.com/questions/8508262/how-to-select-td-of-the-table-with-javascript

function getEmptySpaces(){
    if(board[selectedPiece.indexPiece + 7] === null && 
       cells[selectedPiece.indexPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if(board[selectedPiece.indexPiece + 9] === null && 
       cells[selectedPiece.indexPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if(board[selectedPiece.indexPiece - 7] === null && 
       cells[selectedPiece.indexPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.negativeSeventhSpace = true;
    }
    if(board[selectedPiece.indexPiece - 9] === null && 
       cells[selectedPiece.indexPiece - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.negativeNinthSpace = true;
    }
    getJumpSpaces();
}

function getJumpSpaces(){
    
    if(turn){
        if(board[selectedPiece.indexPiece + 14] === null
        && cells[selectedPiece.indexPiece + 14].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if(board[selectedPiece.indexPiece + 18] === null
        && cells[selectedPiece.indexPiece + 18].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece + 9] >= 12) {
                selectedPiece.eightteenthSpace = true;
        }
        if(board[selectedPiece.indexPiece - 14] === null
        && cells[selectedPiece.indexPiece - 14].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece - 7] >= 12) {
                selectedPiece.negativefourteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece - 18] === null
        && cells[selectedPiece.indexPiece - 18].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece - 9] >= 12) {
            selectedPiece.negativeEighteenthSpace = true;
        }

    }else{
        if(board[selectedPiece.indexPiece + 14] === null
         && cells[selectedPiece.indexPiece + 14].classList.contains("noPieceHere") !== true 
         && board[selectedPiece.indexPiece + 7] < 12 && board[selectedPiece.indexPiece + 7] !== null ) {
                selectedPiece.fourteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece + 18] === null
        && cells[selectedPiece.indexPiece + 18].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece + 9] < 12 && board[selectedPiece.indexPiece + 9] !== null ) {
                selectedPiece.eightteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece - 14] === null
        && cells[selectedPiece.indexPiece - 14].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece - 7] < 12 && board[selectedPiece.indexPiece - 7] !== null ) {
                selectedPiece.negativefourteenthSpace = true;
            }
        if(board[selectedPiece.indexPiece - 18] === null
        && cells[selectedPiece.indexPiece - 18].classList.contains("noPieceHere") !== true 
        && board[selectedPiece.indexPiece - 9] < 12 && board[selectedPiece.indexPiece - 9] !== null ) {
                selectedPiece.negativeEighteenthSpace = true;
            }
    }
    kingMovesRestrictions();
}

 // erase restricts movement if the piece is a king so this piece can go back n forth
 
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
// gives the choose piece a green color when clicks 

function choosePieceBorder(){
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace ||  selectedPiece.fourteenthSpace || selectedPiece.eightteenthSpace || selectedPiece.negativeSeventhSpace || selectedPiece.negativeNinthSpace ||  selectedPiece.negativefourteenthSpace || selectedPiece.negativeEighteenthSpace){
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        onClickCells()
    } else {
        return;
    }
}
         
          
 
// onClick event from https://www.w3schools.com/tags/att_onclick.asp
//  on clcik vs add event listener https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
//note : using anonymous function so we can remove it after , not a good idea use event listener cuz are unremovables 

function onClickCells(){
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexPiece + 7].setAttribute("onclick", "makeAMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexPiece + 9].setAttribute("onclick", "makeAMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexPiece + 14].setAttribute("onclick", "makeAMove(14)");
    }
    if (selectedPiece.eightteenthSpace) {
        cells[selectedPiece.indexPiece + 18].setAttribute("onclick", "makeAMove(18)");
    }
    if (selectedPiece.negativeSeventhSpace) {
        cells[selectedPiece.indexPiece - 7].setAttribute("onclick", "makeAMove(-7)");
    }
    if (selectedPiece.negativeNinthSpace) {
        cells[selectedPiece.indexPiece - 9].setAttribute("onclick", "makeAMove(-9)");
    }
    if (selectedPiece.negativefourteenthSpace) {
        cells[selectedPiece.indexPiece - 14].setAttribute("onclick", "makeAMove(-14)");
    }
    if (selectedPiece.negativeEighteenthSpace) {
        cells[selectedPiece.indexPiece - 18].setAttribute("onclick", "makeAMove(-18)");
    }
}
// TO DO : MOVEMENT OF  PIECES  - DONE
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
    if (number === 14 || number === -14 || number === 18 || number === -18) { // if the number of the move if a jump move 
        changeTheData(boardPiece, boardPiece + number, boardPiece + number / 2);
    }else{
        changeTheData(boardPiece, boardPiece + number);
    }
}
    //this function change the board data on the back end 
    // the parameter are the position , the new posititon & also the removepiece that got jumped
function changeTheData(indexPiece, newIndex, removePiece){
    board[indexPiece] = null;
    board[newIndex] = parseInt(selectedPiece.pieceId); //change the original position of the selected piece to null & move the data to the new position
    if(turn && selectedPiece.pieceId < 12 && newIndex >=57){  // 57 is the first cell of the last row . 12 is the last number of pieces 
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if(turn === false && selectedPiece.pieceId >= 12 && newIndex <= 7){ // 7 is the las cell in the first row this works for the black pieces 
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
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = ""
            redPieceScore--
        }
    }
    resetPieceProperties(); //line 113
    removeOnClick(); // line 82
    piecesEventRemove(); // line 350
}

 // remove an event listener to each piece , NOTE: in my plain english code , this was after the piecesEvent /lina 66 , but i though it was better so my code woouldnt be confused with the function remmove "Onclick" / ine 81
 function piecesEventRemove(){
    if(turn){
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].removeEventListener("click", getPiecescount);
        }
    }else{
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].removeEventListener("click", getPiecescount);
        }
    }
    winGame();
}
// if the score  hit the 0 then show other team name as winner 
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
// tthis function would show whos turn is, itiration of each letter changing the size & color
function switchPlayer(){
    if (turn) {
      turn = false;
      for (let i = 0; i < redTurnText.length ; i++) {
          redTurnText[i].style.color = "lightGrey";
          blackTurnText[i].style.color = "black";
          blackTurnText[i].style = "font-size: 40px";
          redTurnText[i].style = "font-size: 20px";
      }
     }else {
        turn = true;
        for (let i = 0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = "lightGrey";
            redTurnText[i].style.color = "black";
            redTurnText[i].style = "font-size: 40px";
            blackTurnText[i].style = "font-size: 20px";
        }
     }
     piecesEvent();
}



piecesEvent();
//     if(turn){
//         turn = false;
//         alert("blacks turn");
//     }else{
//         alert("reds turn");
//     }
//      piecesEvent();
//   }
//   piecesEvent();


// note : if else stataement so it can show an alert when switch the turn (recommended by the teacher), however, it was annying so i just made  the itiration so it can show wih turn is it 
