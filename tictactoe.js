let matrix= null;
let Xturn= true;
let gameOver= false;

function stopTheGame(){
   let board= document.getElementById('tictactoe');
   board.innerHTML="";
   board.classList="";
   document.getElementsByClassName('current')[0].innerHTML="";
   document.getElementById('restart').style.display= 'block';
   document.getElementsByClassName('game_over')[0].style.display= 'block';
}

function drawStrikeLine(value){
      document.getElementById('tictactoe').classList.add(value);
}

function checkMatchOver(){
    for(let i=0; i<matrix.length; i++){
        if(matrix[i][0] && matrix[i][1] && matrix[i][2] && (matrix[i][0]===matrix[i][1] && matrix[i][1]===matrix[i][2])){
            if(i===0){
                drawStrikeLine(`top_strike_${matrix[i][0]}`);
            }
            if(i===1){
                drawStrikeLine(`middle_strike_${matrix[i][0]}`);
            }
            if(i===2){
                drawStrikeLine(`bottom_strike_${matrix[i][0]}`);
            }
            return matrix[i][1] + ' won!';
        }
    }
        let arr0=[];
        let arr1=[];
        let arr2=[];
        for(let i=0; i<matrix.length; i++){
            arr0.push(matrix[i][0]);
            arr1.push(matrix[i][1]);
            arr2.push(matrix[i][2]);
        }
        if(arr0.every(el => el==='X') || arr0.every(el => el==='O')){
            drawStrikeLine(`left_v_strike_${arr0[0]}`);
            return arr0[0] + ' won!';
        }
        if(arr1.every(el => el==='X') || arr1.every(el => el==='O')){
            drawStrikeLine(`middle_v_strike_${arr1[0]}`);
            return arr1[0] + ' won!';
        }
        if(arr2.every(el => el==='X') || arr2.every(el => el==='O')){
            drawStrikeLine(`right_v_strike_${arr2[0]}`);
            return arr2[0] + ' won!';
        }

        let arrCrossX= [];
        for(let i=0; i<matrix.length; i++){
            arrCrossX.push(matrix[i][i]);
        }
        if(arrCrossX.every(el => el==='X') || arrCrossX.every(el => el==='O')){
            drawStrikeLine(`x_cross_strike_${arrCrossX[0]}`);
            return arrCrossX[0] + ' won!';
        }

        let index=2;
        let arrCrossY= [];
        for(let i=0; i<matrix.length; i++){
            arrCrossY.push(matrix[i][index]);
            index--;
        }
        if(arrCrossY.every(el => el==='X') || arrCrossY.every(el => el==='O')){
            drawStrikeLine(`y_cross_strike_${arrCrossY[0]}`);
            return arrCrossY[0] + ' won!';
        }
}
function checkMatchActive(){
    const isGameDone= checkMatchOver();
    if(isGameDone){
        let game_over_el=  document.getElementsByClassName('game_over')[0];
        game_over_el.innerHTML= isGameDone;
        gameOver= true;
        setTimeout(()=>{
            stopTheGame();
        }, 2000);
    }
}

function handleBoxClick(i,j){
   checkMatchActive();
   if(!gameOver){
      let data=matrix;
      if(Xturn){
        if(!data[i][j]){
            data[i][j]='X';
            document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML= 'X';
            document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('x_class');
            Xturn= false;
            loadCurrentPlayer();
            setTimeout(()=>{
                checkMatchActive();
            }, 100);
        }
      }
      else{
        if(!data[i][j]){
            data[i][j]='O';
            document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML= 'O';
            document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('o_class');
            Xturn= true;
            loadCurrentPlayer();
            setTimeout(()=>{
                checkMatchActive();
            }, 100);
        }
      }
   }
}
function loadTheGame(){
    matrix=[
        ['','',''],
        ['','',''],
        ['','',''],
    ];
    Xturn= true;
    gameOver= false;
    document.getElementById('restart').style.display= 'none';
    document.getElementsByClassName('game_over')[0].style.display= 'none';

    const tic=document.getElementById("tictactoe");
    for(let i=0; i<matrix.length; i++){
        let temp= matrix[i];
        let outerBox= document.createElement('div');
        outerBox.setAttribute('class', 'box-outer');
        for(let j=0; j<temp.length; j++){
            let box=document.createElement('div');
            box.innerHTML= temp[j];
            box.setAttribute('class',`box box_${i}_${j}`);
            box.addEventListener("click",() =>{
                handleBoxClick(i,j);
            });
            outerBox.appendChild(box);
        }
        tic.appendChild(outerBox);
    }
    loadCurrentPlayer();
}

function loadCurrentPlayer(){
    let ele=document.getElementsByClassName('current')[0];
    ele.innerHTML= Xturn? 'X':'O';
}
