$(document).ready(initializeApp);

function generateGameBoard(){
    var h1 = $('<h1>');
    h1.text('Reversi');
    var body = $('body');
    var currentPlayer = $("<div>").attr("id", "colorTurn").text('Black Turn');
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
    findPossibleMoves("discBlack");

}

function findPossibleMoves ( currentPlayerColor ) {
    if(currentPlayerColor==='discWhite'){
        var oppositeColor = 'discBlack';
    } else {
        oppositeColor = 'discWhite';
    }
    for(var row = 0; row < boardCoordinateArray.length; row++){
        for(var column = 0; column < boardCoordinateArray[row].length; column++){
            findOppColor(row, column, currentPlayerColor, oppositeColor);
            $(".selected").removeClass('selected');
        }
    }
}

function populateGameboard () {
    var rows = $(".row");
    for(var rowI = 0; rowI < rows.length; rowI++){
        var cells = $(rows[rowI]).find(".cell");
        boardCoordinateArray.push(cells);
    }
}

function findOppColor (row,column,currentPlayerColor,oppositeColor) {
    var targetCell = $(boardCoordinateArray[row][column]);
    targetCell.addClass('selected');
    var innerDiscElement = targetCell.find('div');
    if(innerDiscElement.hasClass( oppositeColor )){
        console.log('found color');
        var currentPositionRow = innerDiscElement.attr("row");
        var currentPositionColumn = innerDiscElement.attr("col");
        testPossibleMoves (targetCell,innerDiscElement,currentPositionRow,currentPositionColumn,oppositeColor,currentPlayerColor);
    }
}

function testPossibleMoves (targetCell,innerDiscElement,currentPositionRow,currentPositionColumn,oppositeColor,currentPlayerColor){
    for(var directionFirstArr = 0; directionFirstArr < directionArray.length; directionFirstArr ++){
        var checkRow = [parseInt(currentPositionRow) + parseInt(directionArray[directionFirstArr][0])];
        var checkOppRow = [parseInt(currentPositionRow) + parseInt(directionArray[directionFirstArr][0]*-1)];
        var checkColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1])];
        var checkOppColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1]*-1)];
        var possibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`);
        var checkOppMove = $(`[row = ${(checkOppRow)}][col = ${(checkOppColumn)}]`);
        if(possibleMove.hasClass("disc")){
            possibleMove.addClass("highlight");
            while(checkOppMove.hasClass(oppositeColor)){
                checkOppRow = [parseInt(checkOppRow) + parseInt(directionArray[directionFirstArr][0]*-1)];
                checkOppColumn = [parseInt(checkOppColumn) + parseInt(directionArray[directionFirstArr][1]*-1)];
                checkOppMove = $(`[row = ${(checkOppRow)}][col = ${(checkOppColumn)}]`);
            }
            if(checkOppMove.hasClass(currentPlayerColor)){
                possibleMove.removeClass("highlight");
                possibleMove.addClass("validMoveBorder");
            }
        }
    }
}