$(document).ready(initializeApp);
var boardCoordinateArray = [
    [0,0],[]
]
var directionArray = [
    [-1,-1],[1,1],
    [1,0],[-1,0],
    [0,-1],[0,1],
    [-1,1],[1,-1]    
];

function initializeApp () {
    addclickhandlers();
}
function addclickhandlers () {
    $(".number_button").on("click",findPossibleMoves);
}
function findPossibleMoves () {
    for(var counter = 0; counter < boardCoordinateArray.length; counter++){
        if(boardCoordinateArray[i].text() === "o" || "O"){
            var oppositeColor = boardCoordinateArray[i];
        }
        else{
            return;
        }
    }
    var pieceClick = $(event.currentTarget);
    for(var i = 0; i < directionArray.length; i++){
        for(var x = 0; x < directionArray[i].length; x++){

        }
    }
}