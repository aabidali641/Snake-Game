//game constants and variable
let inputdir={x:0,y:0};
let foodSound=new Audio('music/food.mp3');
let gameSound=new Audio('music/gameover.mp3');
let moveSound=new Audio('music/move.mp3');
let musicSound=new Audio('music/music4.mp3');
let speed=5;
let score=0;
let soundEnable=true;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]
let food={x:6,y:7};
document.getElementById('easy').style.backgroundColor="lightgreen";
document.getElementById('on').style.backgroundColor="lightgreen";
//Game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }else{
       lastPaintTime=ctime;
       gameEngine();
    }       
}
function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
            return true;
        }
    }
    //if bump to wall
    if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
            return true;
    }
    return false;
}
function gameEngine(){
    //part1:Updating the snake array
    if(isCollide(snakeArr)){
        gameSound.play();
        musicSound.pause();
        inputdir={x:0,y:0};
        alert("Gameover.Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        score=0;
        scoreBox.innerHTML="Score : "+score;
        if(soundEnable) musicSound.play();

    }
    //if you have eaten the food,increment the score and regenerate the food
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML="Score : "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputdir.x,y:snakeArr[0].y + inputdir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for(let i=snakeArr.length - 2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputdir.x;
    snakeArr[0].y+=inputdir.y;
    //part2:render/display  the snake and food
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
             snakeElement.classList.add('head') 
        }
        else{
             snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    //display the food element
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}

//logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0,y:1}//start the game
    moveSound.play();
    if(soundEnable){
        musicSound.play();
    }
    switch(e.key){
        case "ArrowUp":
        //  console.log("ArrowUp")
         inputdir.x=0;
         inputdir.y=-1;
         break;
        case "ArrowDown":
        //   console.log("ArrowDown")
          inputdir.x=0;
          inputdir.y=1;
          break;
        case "ArrowLeft":
        //  console.log("ArrowLeft")
         inputdir.x=-1;
         inputdir.y=0;
         break;
        case "ArrowRight":
        //   console.log("ArrowRight")
          inputdir.x=1;
          inputdir.y=0;
          break;
        default:
          break;
    }
});
document.getElementById('on').addEventListener('click', e=>{
    soundEnable=true;
    musicSound.play();
    document.getElementById('on').style.backgroundColor="lightgreen";
    document.getElementById('off').style.backgroundColor="";
});
document.getElementById('off').addEventListener('click', e=>{
    soundEnable=false;
    musicSound.pause();
    document.getElementById('off').style.backgroundColor="lightgreen";
    document.getElementById('on').style.backgroundColor="";
});
document.getElementById('easy').addEventListener('click', e=>{
    document.getElementById('medium').style.backgroundColor="";
    document.getElementById('hard').style.backgroundColor="";
    document.getElementById('easy').style.backgroundColor="lightgreen";
    speed=5;
});
document.getElementById('medium').addEventListener('click', e=>{
    document.getElementById('medium').style.backgroundColor="lightgreen";
    document.getElementById('hard').style.backgroundColor="";
    document.getElementById('easy').style.backgroundColor="";
    speed=8;
});
document.getElementById('hard').addEventListener('click', e=>{
    document.getElementById('medium').style.backgroundColor="";
    document.getElementById('hard').style.backgroundColor="lightgreen";
    document.getElementById('easy').style.backgroundColor="";
    speed=12;
});