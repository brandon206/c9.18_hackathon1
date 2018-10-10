$(document).ready(initializeApp);

$("<div>").attr











// <div id="grid">
//     <div class="row">
//     <div class="cell" ><div class="disc" row="1" col="1"></div></div>
// <div class="cell" ><div class="disc" row="1" col="2"></div></div>
// <div class="cell" ><div class="disc" row="1" col="3"></div></div>
// <div class="cell" ><div class="disc" row="1" col="4"></div></div>
// <div class="cell" ><div class="disc" row="1" col="5"></div></div>
// <div class="cell" ><div class="disc" row="1" col="6"></div></div>
// <div class="cell" ><div class="disc" row="1" col="7"></div></div>
// <div class="cell" ><div class="disc" row="1" col="8"></div></div>
// </div>
// </div>

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
                    var checkColumn = [parseInt(currentPositionColumn) + parseInt(directionArray[directionFirstArr][1])];
                    var possibleMove = $(`[row = ${(checkRow)}][col = ${(checkColumn)}]`)
                    if(possibleMove.hasClass("disc")){
                        possibleMove.addClass("highlight");
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