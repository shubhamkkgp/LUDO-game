const generate = document.querySelector('.generate');  
generate.addEventListener("click",main);

var num;
function generateRandomNum() {
  var randomNum = Math.ceil(Math.random()*6);
  var randomNumEl = document.querySelector('.randomNumEl');
  randomNumEl.innerHTML = randomNum;
  num=randomNum;
}
function poi(){
  console.log('Number:',num);
}

function main(){         //ONCLICKING ROLL DICE BUTTON EXECUTES OTHER FUNCTION 
  generateRandomNum();   //GENERATE RANDOM NUMBER FROM 1-6
  poi();
  turnof();              //SHOWS WHICH PLAYER ROLLED DICE
  locker();              //INITIALLY STORES TOKENS AND RELEASE WHEN 6 IS RANDOM NUMBER
  pn_red();              //POSITION OF RED TOKEN
  pn_green();            //POSITION OF GREEN TOKEN
  pn_red_board();        //INDICATES POSITION OF TOKEN ON BOARD BY CHANGING COLOUR
  pn_green_board();      //INDICATES POSITION OF TOKEN ON BOARD BY CHANGING COLOUR
  cutr1();               //CUTS RED ON ARRIVAL OF GREEN TO SAME BOX
  cutg1();               //CUTS GREEN ON ARRIVAL OF RED TO SAME BOX
}

let turns=['Red Player Obtained','Green Player Obtained'];
if(num==null){
  turnw= turns[0]; 
  turno = document.querySelector('.turno');
  turno.innerHTML = turnw; 
}
let i=0;
let j=0;
function turnof(){
   if(num!=6){
    
    turnw= turns[i++];
    turno = document.querySelector('.turno');
    turno.innerHTML = turnw;
    if(i>1){
      i=0;
    }
    j=i;
  }
  else{
    turnw = turns[j]; 
    turno = document.querySelector('.turno');
    turno.innerHTML = turnw; 
  }
}

let r = true;
let g = true;
var p_red = -6;
var p_green = 9;

function locker(){
  if(num === 6 && turno.innerHTML ==='Red Player Obtained'){
    r=false;
  }
  else if(num === 6 && turno.innerHTML ==='Green Player Obtained'){
    g=false;
  }
}


function pn_red(){
  if(!r && turno.innerHTML ==='Red Player Obtained'){
      if(p_red + num < 27) {
          p_red += num;
        }
      else if(p_red + num == 27){
          pn_lastr();     //CHANGE OF COLOUR AND ALERT MESSAGE OF WON
          const overw = document.querySelector('.turno');
          overw.innerHTML = '!! Game over !!';
      }
      else{
        p_red = p_red;
      }
  }
  // console.log('R:',p_red);
}

function pn_green(){
  if(!g && turno.innerHTML ==='Green Player Obtained'){
      if(p_green + num < 42) {
          p_green = p_green+num;
        }
      else if(p_green + num == 42){
         pn_lastg();          //CHANGE OF COLOUR AND ALERT MESSAGE OF WON  
         const overw = document.querySelector('.turno');
         overw.innerHTML = '!! Game over !!';
      }
      else{
        p_green = p_green;
      }
  }
  // console.log('G:',p_green);
}
var kr=-1,kg=0;
var cr=-1,cg=-1;

function pn_red_board(){
  if(!r && turno.innerHTML === 'Red Player Obtained'){
    document.querySelector(`#b${p_red+1}`).style.backgroundColor = 'red';
    kr = `#b${p_red+1}`;
    // console.log('kr:',kr);
    ncleanr();                  //SAVES FROM DISAPPEARING OF COLOUR
    //cleanr1();
    cleanr();                   //CLEAN THE PREVIOUS BOXES WHEN TOKEN MOVED FORWARD
    cr=p_red+1;
  }
}

function pn_green_board(){
  if(!g && turno.innerHTML === 'Green Player Obtained' && p_green <= 28){
    document.querySelector(`#b${p_green}`).style.backgroundColor = 'green';
    kg = `#b${p_green}`;
    // console.log('kg:',kg); 
    cleang();                  //CLEAN THE PREVIOUS BOXES WHEN TOKEN MOVED FORWARD
    cg=p_green;
  }
  else if(!g && turno.innerHTML === 'Green Player Obtained' && p_green > 28){
    document.querySelector(`#b${p_green-28}`).style.backgroundColor = 'green';
    kg = `#b${p_green-28}`;
    // console.log('kg:',kg);
    ncleang();                  //SAVES FROM DISAPPEARING OF COLOUR
    //cleang1();                
    cleang();                   //CLEAN THE PREVIOUS BOXES WHEN TOKEN MOVED FORWARD
    cg=p_green-28;
  }
}
function ncleanr(){
  if(((cr == 23 || cr == 24 || cr == 25 || cr==26 || cr==27) && num == 6)|| ((cr == 24 || cr == 25 || cr==26 || cr==27) && num == 5) || ((cr == 25 || cr==26 || cr==27) && num == 4) || ((cr==26 || cr==27) && num == 3)||((cr==27) && num == 2)) {
    cr = -1;
  }
}

function cleanr(){
  // console.log('clean:', cr);
  if(cr!= -1){
    document.querySelector(`#b${cr}`).style.backgroundColor = '#eaf0a6';
  }
}
function ncleang(){
  if(((cg == 9 ||cg == 10 || cg == 11 || cg==12 || cg==13) && num == 6)|| ((cg == 10 ||cg == 11 || cg==12 || cg==13) && num == 5) || ((cg == 11 || cg==12 || cg==13) && num == 4) || ((cg==12 || cg==13) && num == 3)||((cg==13) && num == 2)){
    cg = -1;
  }
}
function cleang(){
  // console.log('clean:', cr);
  if(cg!= -1){
    document.querySelector(`#b${cg}`).style.backgroundColor = '#eaf0a6';
  } 
}
// function cleanr1(){
//   if((cr == 22 && num == 6)||(cr == 23 && num == 5)||(cr == 24 && num == 4)||(cr == 25 && num == 3)||(cr == 26 && num == 2)||(cr == 27 && num == 1)){ 
    
//     console.log('cr_c1',cr);
//   }
// }
// function cleang1(){
//   if((cg == 8 && num == 6)||(cg == 9 && num == 5)||(cg == 10 && num == 4)||(cg == 11 && num == 3)||(cg == 12 && num == 2)||(cg == 13 && num == 1)){ 
    
//     console.log('cg_c1',cg);
//   }
// }
function pn_lastg(){
  document.querySelector('#b14').style.backgroundColor = 'green';
  alert('Green won, Congrats');
  alert('Refresh to start new game!');
}

function pn_lastr(){
  document.querySelector('#b28').style.backgroundColor = 'red';
  alert('Red Won, Congrats');
  alert('Refresh to start new game!');
}

const resetg = document.querySelector('.resetg');  
resetg.addEventListener("click",resetgg);

function resetgg(){          //RESET FUNCTION, START AGAIN FROM BEGINNING
  r = true;
  g = true;
  p_red = -6;
  p_green = 9;
  cleanr();
  cleang();
  document.querySelector('#b1').style.backgroundColor = 'rgb(221, 24, 24)';
  document.querySelector('#b15').style.backgroundColor = 'rgb(11, 237, 64)';
  document.querySelector('#b28').style.backgroundColor = '#eaf0a6';
  document.querySelector('#b14').style.backgroundColor = '#eaf0a6';
  // document.querySelector('.randomNumEl').style.fontsize = 0px;
  alert('Game is reseted, it will start from beginning');
  const overw = document.querySelector('.turno');
  overw.innerHTML = '!! New Game !!';
}

function cutr1(){
  if(turno.innerHTML === 'Green Player Obtained' && kr === kg && kr!=1 && kg!=15){
    r = true;
    p_red = -6;
    cleanr();
    document.querySelector('#b1').style.backgroundColor = 'rgb(221, 24, 24)';
    alert('oops! Red token moved to locker');
    kr=1;
  }
}

function cutg1(){
  if(turno.innerHTML === 'Red Player Obtained' && kr === kg && kr!=1 && kg!=15){
    g = true;
    p_green = 9;
    cleang();
    document.querySelector('#b15').style.backgroundColor = 'rgb(11, 237, 64)';
    alert('oops! Green token moved to locker');
    kg=15;
  } 
}

