//player one blue
var player1=prompt("Player one: Enter your name , you will be blue")
var player1Color='rgb(86 , 51 ,225)';
//player two red
var player2=prompt("Player two: Enter your name , you will be red")
var player2Color='rgb(237 , 45 , 73)';
//game on/off and table
var game_on= true;
var table=$('table tr')
//player won starting at position
function reportWin(rowNum,colNum){
    console.log("you wan at this starting poition")
    console.log(rowNum)
    console.log(colNum)
}
// create function to return color of selected rowindex and colindex
function returncolor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}
// create function to change color of selected rowindex and colindex
function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}
// suppose a user clicks on a certain row we will grab the bottom most col cell as we need to fill colors
function checkbottom(colIndex){
    var colorReport=returncolor(5,colIndex);
    //decrementing row as checking from bottom
    for (var row=5;row>-1;row--){
        colorReport=returncolor(row,colIndex);
        if (colorReport==='rgb(128, 128, 128)'){
            return row
        }
    }
}
//garb 4 buttons of a row and check weather they are of same color but not gray
function colorMatch(one,two,three,four){
    return  (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
}

//check for horizontal matches
    //check all rows
    //check for only 4 columns
    function horizontalWinCheck(){
        for (row=0;row<6;row++){
            for (col=0;col<4;col++){
                if(
                    colorMatch(returncolor(row,col),returncolor(row,col+1),returncolor(row,col+2),returncolor(row,col+3))
                ){
                    reportWin(row,col)
                    return true     
                }
                else{
                    continue
                }
            }
        }
    }
//check for vertical matches
    //check all column
    //check for only 4 rows
    function verticalWinCheck(){
        for (col=0;col<7;col++){
            for (row=0;row<3;row++)
            {
                if(
                    colorMatch(returncolor(row,col),returncolor(row+1,col),returncolor(row+2,col),returncolor(row+3,col))
                ){
                    reportWin(row,col)
                    return true
                }else{
                    continue
                }
            }
        }
    }
//check for diagonal matches
    //top diagonal
    //bottom diagonal
    //positives and negative checks
    function diagonalWinCheck(){
        // looping through only four columns
        for (col=0;col<5;col++){
            for (row=0;row<7;row++){
                if(colorMatch(returncolor(row,col),returncolor(row+1,col+1),returncolor(row+2,col+2),returncolor(row+3,col+3))){
                    reportWin(row,col)
                    return true
                }else if(colorMatch(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2),returncolor(row-3,col+3))){
                    reportWin(row,col)
                    return true
                }else{
                    continue
                }
        }
    }
}
// implementing actions
//start with player one
var currentPlayer=1;
var currentName=player1;
var currentcolor=player1Color;

//display player 1 chance
$('h3').text(player1+"it is your turn")

//click the button
$('.board button').on('click',function(){
    //check which column was clicked
    var col= $(this).closest('td').index();
    //check for bottom column
    var bottomavail = checkbottom(col)
    //changing color of bottom avialable col
    changeColor(bottomavail,col,currentcolor)
    //check all win conditions
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        //above line returns a boolean
        //now displaying winner based on above assertions
        $('h1').text(currentName+" you have won")
        $('h2').fadeOut('fast')
        $('h3').fadeOut('fast')
        $('h4').text("refresh to restart!!!")
    }

    currentPlayer=currentPlayer *- 1;
    
    if(currentPlayer===1){
        currentName=player1
        $('h3').text(currentName+' its your turn')
        currentcolor=player1Color 
    }else{
        currentName=player2
        $('h3').text(currentName+' its your turn')
        currentcolor=player2Color
    }
})