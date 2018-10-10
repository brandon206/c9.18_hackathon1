$(document).ready(initializeApp);

function initializeApp(){
    handleGameBoardClick();
}

function handleGameBoardClick(){
    $('.cell').click(function() {
        console.log('cell was clicked');
        // need to make it so that ones that have game pieces on them already CANNOT be clicked
        // remove click handlers from everything
        // then re-add to valid spots to click?
        //using .off method in jQuery


        // we will be highlighting valid spots to click for moves (in another function)
        // it will highlight those valid spaces (turn them yellow or something)
        // THIS function will ONLY allow clicks on those highlighted spots
        // once a highlighted spot is clicked, it will remove that highlighted class from all pieces
        // depending on which game piece was actually clicked, it will then "flip" all applicable pieces to the current player's color
    })
}