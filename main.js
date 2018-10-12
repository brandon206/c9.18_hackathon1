$(document).ready(initializeApp);

function generateGameBoard(){
    var h1 = $('<h1>');
    h1.text('Reversi');
    var body = $('body');
    var currentPlayer = $("<div>").attr("id", "colorTurn").text('Player Turn: Black');
    var gridDiv = $("<div>").attr("id", "grid");
    body.append(h1, currentPlayer, gridDiv);

    for(var rowI = 1; rowI < 9; rowI++){
        var rowDiv = $('<div>').addClass('row');
        gridDiv.append(rowDiv);
        for(var colI = 1; colI < 9; colI++) {
            var cellDiv = $('<div>').addClass('cell');
            rowDiv.append(cellDiv);
            var discDiv = $('<div>').addClass('disc');
            var rowAndColAttributes = discDiv.attr({row: rowI, col: colI});
            cellDiv.append(discDiv, rowAndColAttributes);


        }}

    $("[row='4'][col='4']").removeClass('disc');
    $("[row='4'][col='4']").addClass('discWhite');
    $("[row='4'][col='5']").removeClass('disc');
    $("[row='4'][col='5']").addClass('discBlack');
    $("[row='5'][col='4']").removeClass('disc');
    $("[row='5'][col='4']").addClass('discBlack');
    $("[row='5'][col='5']").removeClass('disc');
    $("[row='5'][col='5']").addClass('discWhite');




    //eventually function on this button will be refreshGrid()?
    var resetButton = $('<input>').attr({id: 'resetButton', type: 'button', value: 'Reset'}).click();

    body.append(resetButton);

}

var boardCoordinateArray = [];
var currentPositionRow;
var currentPositionColumn;
var currentPlayerColor;
var oppositeColor;
var directionArray = [
    [-1,-1],
    [1,1],
    [1,0],
    [-1,0],
    [0,-1],
    [0,1],
    [-1,1],
    [1,-1]    
];

function initializeApp () {
    generateGameBoard();
    populateGameboard();
    addclickhandlers();
    findPossibleMoves("discBlack");
}

function populateGameboard () {
    var rows = $(".row");
    for(var rowI = 0; rowI < rows.length; rowI++){
        var cells = $(rows[rowI]).find(".cell");
        boardCoordinateArray.push(cells);
    }
}

function addclickhandlers () {
    $(".disc").on("click",flipGamePieces);
    $("#resetButton").on("click",resetGame);
}

function findPossibleMoves ( startingColor ) {
    if(startingColor==='discWhite'){
        oppositeColor = 'discBlack';
        currentPlayerColor = startingColor;
    } else {
        oppositeColor = 'discWhite';
        currentPlayerColor = startingColor;
    }
    for(var row = 0; row < boardCoordinateArray.length; row++){
        for(var column = 0; column < boardCoordinateArray[row].length; column++){
            findOppColor(row, column);
        }
    }
}

function findOppColor (row,column) {
    var targetCell = $(boardCoordinateArray[row][column]);
    var innerDiscElement = targetCell.find('div');
    if(innerDiscElement.hasClass( oppositeColor )){
        console.log('found color');
        currentPositionRow = innerDiscElement.attr("row");
        currentPositionColumn = innerDiscElement.attr("col");
        testPossibleMoves (targetCell,innerDiscElement);
    }
}

function testPossibleMoves (targetCell,innerDiscElement){
    for(var directionFirstArr = 0; directionFirstArr < directionArray.length; directionFirstArr ++){
        var checkRow = [parseInt(currentPositionRow) + parseInt(directionArray[directionFirstArr][0])];
        var checkOppRow = [parseInt(currentPositionRow) + parseInt(directionArray[directionFirstArr][0]*-1)];
        var checkColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1])];
        var checkOppColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1]*-1)];
        var possibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`);
        console.log("possible move " + possibleMove);
        var checkOppMove = $(`[row = ${(checkOppRow)}][col = ${(checkOppColumn)}]`);
        if(possibleMove.hasClass("disc")){
            while(checkOppMove.hasClass(oppositeColor)){
                checkOppRow = [parseInt(checkOppRow) + parseInt(directionArray[directionFirstArr][0]*-1)];
                checkOppColumn = [parseInt(checkOppColumn) + parseInt(directionArray[directionFirstArr][1]*-1)];
                checkOppMove = $(`[row = ${(checkOppRow)}][col = ${(checkOppColumn)}]`);
            }
            if(checkOppMove.hasClass(currentPlayerColor) && !possibleMove.hasClass(oppositeColor) && !possibleMove.hasClass(currentPlayerColor)){
                possibleMove.addClass("validMoveBorder");
            }
        }
    }
}

function flipGamePieces () {
    console.log("VALID EMPTY SPACE CLICKED");
    for (var row = 0; row < boardCoordinateArray.length; row++) {
        for (var column = 0; column < boardCoordinateArray[row].length; column++) {
            $(".disc").removeClass('validMoveBorder');
        }
    }
    var clickedPositionRow = $(event.currentTarget).attr("row");
    var clickedPositionColumn = $(event.currentTarget).attr("col");

    $(event.currentTarget).addClass(currentPlayerColor);

    for (var directionFirstArr = 0; directionFirstArr < directionArray.length; directionFirstArr++) {
        var checkRow = [parseInt(clickedPositionRow) + parseInt(directionArray[directionFirstArr][0])];
        var checkOppRow = [parseInt(clickedPositionRow) + parseInt(directionArray[directionFirstArr][0] * -1)];
        var checkColumn = [parseInt(clickedPositionColumn) + parseInt(directionArray[directionFirstArr][1])];
        var checkOppColumn = [parseInt(clickedPositionColumn) + parseInt(directionArray[directionFirstArr][1] * -1)];
        var possibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`);
        console.log("possible move " + possibleMove);
        var checkOppMove = $(`[row = ${(checkOppRow)}][col = ${(checkOppColumn)}]`);
 
        while(possibleMove.hasClass(oppositeColor)) {
            var savedArray = [];
            checkRow = [parseInt(checkRow) + parseInt(directionArray[directionFirstArr][0])];
            checkColumn = [parseInt(checkColumn) + parseInt(directionArray[directionFirstArr][1])];
            var multiplePossibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`);
            savedArray.push(multiplePossibleMove);
            while(multiplePossibleMove.hasClass(oppositeColor)){
                checkRow = [parseInt(checkRow) + parseInt(directionArray[directionFirstArr][0])];
                checkColumn = [parseInt(checkColumn) + parseInt(directionArray[directionFirstArr][1])];
                var multiplePossibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`);
                if (multiplePossibleMove.hasClass(currentPlayerColor)){
                    break;
                }
            }
            if(possibleMove.hasClass(oppositeColor) && multiplePossibleMove.hasClass(currentPlayerColor)){
                possibleMove.removeClass(oppositeColor);
                possibleMove.addClass(currentPlayerColor);
                for(var i = 0; i < savedArray.length; i++){
                    savedArray[i].removeClass(oppositeColor);
                    savedArray[i].addClass(currentPlayerColor);
                }
            }
            else{
                break;
            }
        }
    }
    for (var row = 0; row < boardCoordinateArray.length; row++) {
        for (var column = 0; column < boardCoordinateArray[row].length; column++) {
            $(".disc").removeClass('validMoveBorder');
            $(".discBlack").off("click");
            $(".discWhite").off("click");
        }
    }
    togglePlayers();
}

function togglePlayers(){
    if(currentPlayerColor==='discBlack'){
        currentPlayerColor = 'discWhite';
        $('#colorTurn').text('Player Turn: White');
        $('body').css('background-color', 'white');
        $('body').css('color', 'black');
        findPossibleMoves("discWhite");
    } else if(currentPlayerColor==='discWhite'){
        currentPlayerColor = 'discBlack';
        $('#colorTurn').text('Player Turn: Black');
        $('body').css('background-color', 'black');
        $('body').css('color', 'white');
        findPossibleMoves("discBlack");
    }
}

function displayCurrentWinner(){
    var whiteCell = $('.discWhite');
    var blackCell = $('.discBlack');
    if(whiteCell.length === blackCell.length){
        $('#currentWinner').text('Current Winner: It\'s a tie!');
    } else if(whiteCell.length > blackCell.length){
        $('#currentWinner').text('Current Winner: White');
    } else if(blackCell.length > whiteCell.length){
        $('#currentWinner').text('Current Winner: Black');
    }
    return currentWinner;
}

function displayCurrentScore(){
    var clearCell = [];
    var whiteCell = $('.discWhite');
    var blackCell = $('.discBlack');
    var whiteScore = whiteCell.length;
    var blackScore = blackCell.length;
    clearCell = $('.disc').not(".discBlack, .discWhite");
    console.log('*** CLEAR CELL LENGTH ***', clearCell.length);
    $('#scoreboard').text('White Score: ' + whiteScore + ' || ' + 'Black Score: ' + blackScore);
    if(clearCell.length===0){
        setTimeout(function(){
            if(whiteScore > blackScore){
                alert('White player has won!');
            }
            else if(blackScore > whiteScore){
                alert('Black player has won!');
            }
            else if(blackScore === whiteScore){
                alert('Game was a tie!');
            }
        }, 3000);

    }
}

function resetGame () {
    var rows = $(".row");
    for(var rowI = 0; rowI < rows.length; rowI++){
        var cells = $(rows[rowI]).find(".cell");
        $(".disc").removeClass('discBlack');
        $(".disc").removeClass('validMoveBorder');
        $(".disc").removeClass('discWhite');
        $(".disc").off("click");
    }
    $("[row='4'][col='4']").removeClass('disc');
    $("[row='4'][col='4']").removeClass('discBlack');
    $("[row='4'][col='4']").addClass('discWhite');
    $("[row='4'][col='5']").removeClass('disc');
    $("[row='4'][col='5']").removeClass('discWhite');
    $("[row='4'][col='5']").addClass('discBlack');
    $("[row='5'][col='4']").removeClass('disc');
    $("[row='5'][col='4']").removeClass('discWhite');
    $("[row='5'][col='4']").addClass('discBlack');
    $("[row='5'][col='5']").removeClass('disc');
    $("[row='5'][col='5']").removeClass('discBlack');
    $("[row='5'][col='5']").addClass('discWhite');
    var startingColor= "discBlack";
    if(startingColor==='discWhite'){
        oppositeColor = 'discBlack';
        currentPlayerColor = 'discBlack';
        $('#colorTurn').text('Player Turn: Black');
        $('body').css('background-color', 'black');
        $('body').css('color', 'white');
    } else {
        oppositeColor = 'discWhite';
        currentPlayerColor = 'discBlack';
        $('#colorTurn').text('Player Turn: Black');
        $('body').css('background-color', 'black');
        $('body').css('color', 'white');
    }
    addclickhandlers();
    findPossibleMoves("discBlack");