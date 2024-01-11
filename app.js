let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(!started) {
        console.log("game started!");
        started = true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 150);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 150);
}

// Level Up
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random color
    let rndmIdx = Math.floor(Math.random() * (btns.length));
    let rndmColor = btns[rndmIdx];
    let rndmBtn = document.querySelector(`.${rndmColor}`);

    gameSeq.push(rndmColor);
    console.log(gameSeq);
    
    gameFlash(rndmBtn);
}

// Checking answer
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    } else {
        let curScore = level;
        highScore(curScore);

        h2.innerHTML = `Game Over! your score was <b>${level}</b> <br> Press any key to start.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=> {
        document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        
        gameReset();
    }
}

// user turn
function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn); 

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

// Game Reset
function gameReset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

// High Score 
let topScore = 0;
function highScore(curScore) {
    if(topScore < curScore) {
        topScore = curScore;
        document.querySelector("#highScore").innerHTML = `High Score: ${topScore}`;
    }
}