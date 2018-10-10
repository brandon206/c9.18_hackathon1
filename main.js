$(document).ready(initializeApp);

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
    // addclickhandlers();
    populateGameboard();
    // console.log(boardCoordinateArray);
    findPossibleMoves("discBlack");
}
// function addclickhandlers () {
//     $(".number_button").on("click",findPossibleMoves);
// }
function findPossibleMoves ( currentPlayerColor ) {
    if(currentPlayerColor==='discWhite'){
        var oppositeColor = 'discBlack';
    } else {
        oppositeColor = 'discWhite';
    }
    for(var row = 0; row < boardCoordinateArray.length; row++){
        for(var column = 0; column < boardCoordinateArray[row].length; column++){
            $(".selected").removeClass('selected');
            
            var targetCell = $(boardCoordinateArray[row][column]);
            targetCell.addClass('selected');
            var innerDiscElement = targetCell.find('div');
            if(innerDiscElement.hasClass( oppositeColor )){
                console.log('found color');
                var currentPositionRow = innerDiscElement.attr("row");
                console.log(currentPositionRow);
                var currentPositionColumn = innerDiscElement.attr("col");
                console.log(currentPositionColumn);
                for(var directionFirstArr = 0; directionFirstArr < directionArray.length; directionFirstArr ++){
                    var checkRow = [parseInt(currentPositionRow) + parseInt(directionArray[directionFirstArr][0])];
                    var checkOppRow = [parseInt(currentPositionRow) + parseInt(directionArray[directionFirstArr][0]*-1)];
                    var checkColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1])];
                    var checkOppColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1]*-1)];
                    console.log(checkOppRow,checkOppColumn);
                    var possibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`);
                    var checkOppMove = $(`[row = ${(checkOppRow)}][col = ${(checkOppColumn)}]`);
                    if(possibleMove.hasClass("disc")){
                        possibleMove.addClass("highlight");
                        if(checkOppMove.hasClass(currentPlayerColor)){
                            var validMove =  $(checkOppMove.hasClass(currentPlayerColor));
                            possibleMove.removeClass("highlight");
                            possibleMove.addClass("validMoveBorder");
                        }
                    }
                    //row, column, directionArray, directionFirstArr
                    //current position: [row, column]
                    //check position: [row + directionArray[directionFirstArr][0], column + directionArray[directionFirstArr][1]]
                }
            }
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
function highlightValidMoves () {
    // check if opp direction is class of opp color (has to be 1 or more)
    // after opp color, must have class same color
    // then this is a valid move
}