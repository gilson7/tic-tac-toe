let ROOM  = "123456"
let profile = 0
let permIssion = 0
let playerCount = 0
const firebaseConfig = {
    apiKey: "AIzaSyCFuzL6RLdog_JAb2FVRkeIRp85tPSQD7U",
    authDomain: "notes-5aa5e.firebaseapp.com",
    databaseURL: "https://notes-5aa5e-default-rtdb.firebaseio.com",
    projectId: "notes-5aa5e",
    storageBucket: "notes-5aa5e.appspot.com",
    messagingSenderId: "218798141415",
    appId: "1:218798141415:web:7f08e255d75e879fcf9742"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.database()
  console.log(storage)

  let htmlObject=[]
  const myApp =  document.getElementById("root")
  let render = function () {

    let playerHtml = `
    <div id="player1" class="player">
        <div class="wall" id="p1"></div>
        <div class="name">${gameInfo.player1.name}</div>
        <div id="pointsP1" class="points">${gameInfo.player1.points}</div>
    </div>
    <div class = "sala">sala<br>${ROOM}</div>
    <div id="player1" class="player">
        <div class="wall" id="p2"></div>
        <div class="name">${gameInfo.player2.name}</div>
        <div id="pointsP1" class="points">${gameInfo.player2.points}</div>
    </div>
    
  `
  let topBar =
  (`
  <div id ="topbar">
    ${playerHtml}
  </div>`
  )
  myApp.innerHTML=topBar
  }

  let gameInfo = {
    player1:{
        name:"player-1",
        points:0,
    },
    player2:{
        name:"player-2",
        points:0,
    }
  }


  let x = "x.svg"
  let o = "o.svg"
  




//   html e others


  player =  0 
  let pos = [[7], [7], [7], [7], [7], [7], [7], [7], [7]];
  let object = document.getElementsByClassName("itt");
  
  for (let ind = 0; ind < object.length; ind++) {
      object[ind].addEventListener("mousedown", () => {
    if (permIssion==profile) {
        inn(document.getElementById(object[ind].id)); 
    }else{ppp("S","wait your turn to play")}
      });
  }
  
  function inn(ele) {
      if (permIssion == 0) {
          if (pos[ele.id][0]!=1&&pos[ele.id][0]!=0) {
              pos[ele.id][0] = permIssion;
              check(permIssion);
              permIssion = 1;
          }
      } else if (permIssion == 1) {
          if (pos[ele.id][0]!=1&&pos[ele.id][0]!=0) {
              pos[ele.id][0] = permIssion;
              check(permIssion);
              permIssion = 0;
          }
      }
      draw() 
      reloadData(pos,gameInfo,permIssion)

  }
  
  function check(permIssion) {
      if (
          //  horizontal check
          ((pos[0][0] == 0 && pos[1][0] == 0 && pos[2][0] == 0) ||
          (pos[3][0] == 0 && pos[4][0] == 0 && pos[5][0] == 0) ||
          (pos[6][0] == 0 && pos[7][0] == 0 && pos[8][0] == 0) ||
          //  vertical check
          (pos[0][0] == 0 && pos[3][0] == 0 && pos[6][0] == 0) ||
          (pos[1][0] == 0 && pos[4][0] == 0 && pos[7][0] == 0) ||
          (pos[2][0] == 0 && pos[5][0] == 0 && pos[8][0] == 0) ||
          //diagonal check
          (pos[0][0] == 0 && pos[4][0] == 0 && pos[8][0] == 0) ||
          (pos[6][0] == 0 && pos[4][0] == 0 && pos[2][0] == 0))
          
          ||
          
          ((pos[0][0] == 1 && pos[1][0] == 1 && pos[2][0] == 1) ||
          (pos[3][0] == 1 && pos[4][0] == 1 && pos[5][0] == 1) ||
          (pos[6][0] == 1 && pos[7][0] == 1 && pos[8][0] == 1) ||
          //  vertical check
          (pos[0][0] == 1 && pos[3][0] == 1 && pos[6][0] == 1) ||
          (pos[1][0] == 1 && pos[4][0] == 1 && pos[7][0] == 1) ||
          (pos[2][0] == 1 && pos[5][0] == 1 && pos[8][0] == 1) ||
          //diagonal check
          (pos[0][0] == 1 && pos[4][0] == 1 && pos[8][0] == 1) ||
          (pos[6][0] == 1 && pos[4][0] == 1 && pos[2][0] == 1))

      ) {
          draw()
          setTimeout(() => {
              winer(permIssion);
          }, 100);
          pos =  [[7], [7], [7], [7], [7], [7], [7], [7], [7]];
          draw()
      } else {
          let pets = 0;
          for (let ind = 0; ind < object.length; ind++) {
              if (document.getElementById(ind).style.backgroundImage == "") {
                  pets += 1;
              }
          }
          if (pets == 0) {

              setTimeout(() => {
                  tie();
              }, 100);
              pos =  [[7], [7], [7], [7], [7], [7], [7], [7], [7]];
              draw()
          }
      }
  }
  function winer(wi) {
        if(wi==1){
          ppp("x.svg",`${gameInfo.player2.name}win`)
          gameInfo.player2.points +=1

        }
        else if(wi == 0){
          gameInfo.player1.points +=1
          ppp("o.svg",`${gameInfo.player1.name}win`)
        }
        setTimeout(()=>{closePOP()},4000)
        reloadData(pos,gameInfo,permIssion)
        render()
  }
  function tie(){
    ppp("fds","tie")
  }
  render()
  

  function draw() {
    for (let index = 0; index < pos.length; index++) {
      const element = pos[index][0];
      switch(element)
      {
        case 0:
          document.getElementById(index).style.backgroundImage= `url(${o})`
        break
        case 1:
          document.getElementById(index).style.backgroundImage= `url(${x})`
        break
        case 7:
          document.getElementById(index).style.backgroundImage= ``
        break;
      }
    }
  }

function reloadData(game,players,vez) {
    storage.ref('users/' + ROOM).set({
      game: game,
      players: players,
      perm : vez,
      nop:playerCount
    });
   console.log(pos)

}

 async  function listener() {
  var starCountRef = storage.ref('users/' + ROOM);
  starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  permIssion = data.perm
  gameInfo = data.players
  pos = data.game
  playerCount = data.nop
  let ni = document.getElementById("nameId")
  if(profile == 1&&data.players.player2.name=="player-2"){
    gameInfo.player2.name = ni.value
  }
  render()
  draw()
  check(0)
  check(1)
});
}
let inputText = document.getElementById("roomId")
function enterRoom(){
  let ni = document.getElementById("nameId")
  let ri = document.getElementById("roomId")
  if(ri.value!=""){
    if (ni.value!="") {
      if(ri.value.length==5){
        ROOM = inputText.value
        profile = 1
        listener().then(()=>{
          console.log(gameInfo)
        })
        playerCount +=1
        closePPP()
        render()
      
      }else{
        ppp("","invalid room id")
      }
    }else{
      ppp("","insert your name")
    }
    

  }else{
    ppp("","insert a room id")
  }
}

function createRoom(){
  let ni = document.getElementById("nameId")
  if(ni.value!=""){
    profile = 0
    gameInfo.player1.name = ni.value
    ROOM = idgnr()
    reloadData(pos,gameInfo,player)
    listener()
    closePPP()
    render()
  }
  else{
    ppp("","insert your name")
  }
}
function idgnr() {
  let letters = ["a","b","c","d","e","f"]
  let i = Math.floor(Math.random() * 5)
  let = max = 9000
  let = min = 1000
  let letter = letters[i]
  let number = Math.floor(Math.random() *  (max - min) + min)
  return number+letter
}
function closePPP(){
    document.getElementById("pop").style.display="none"
}


//popup
  var im = document.getElementById("ppimg")
  var pptext = document.getElementById("pptext")
  var ppy = document.getElementById("popup")
  function ppp(img,text) {
    ppy.style.transform="scale(1)"
    pptext.innerHTML = text
    Image.src = img
  }
  function closePOP(){
    ppy.style.transform="scale(0)"
  }
//ppp//
draw()
