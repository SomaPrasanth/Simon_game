var buttonColour=["red","blue","green","yellow"];
gamePattern=[];
userClikedPattern=[]
var level=0;

$(document).on("keypress",function(){
    if(level===0) nextSequence();
});


$(".btn").on("click",function(){
    var clicked=this.getAttribute("id");
    userClikedPattern.push(clicked);
    
    animatePressed(clicked);
    playSound(clicked);
    check(gamePattern,userClikedPattern,clicked);
});

function nextSequence(name){
    userClikedPattern=[]
    $("h1").text("Level "+(++level));
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(buttonColour[randomNumber]);
    console.log("Game pattern-"+gamePattern)
    $("#"+buttonColour[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColour[randomNumber]);

   
    
}
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
    

}
function animatePressed(name){
    $("#"+name).addClass("pressed")
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100)
}

function check(a1,a2,name){
var flag=0;
for(var i=0;i<a2.length;i++){
    if(a1[i]===a2[i]) flag=1;
    else{
        flag=0;
        break;
    }
}
if(flag===0) gameover();
if(a1.length===a2.length && flag===1) {
    console.log("user cliked pattern-"+userClikedPattern);
    setTimeout(function(){nextSequence(name);},1000);}
}

function gameover(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    startOver();
}
function startOver(){
    level=0;
    gamePattern=[]
}
