let x = document.querySelectorAll(".items")
let btnx = document.querySelector("#btnx")
let btno = document.querySelector("#btno")
let temp = 0
let won = document.querySelector("#won")
let play = document.querySelector(".play")

x.forEach(element => {

    element.addEventListener("click",function(){
    if(temp == 0){
        element.innerHTML = "X"
        btnx.style.backgroundColor = "transparent"
        btno.style.backgroundColor = "#e2e8f0"
        btno.style.color = "#1e293b"
        btnx.style.color = "white"
        // btnx.style.border = "2px solid #e2e8f0"
        temp = 1
        Gamelogic()
        play.addEventListener("click",function(){
            location.reload()
        })
    }
    else{
        element.innerHTML = "O"
        btnx.style.backgroundColor = "#e2e8f0"
        btno.style.backgroundColor = "transparent"
        btnx.style.color = "#1e293b"
        btno.style.color = "white"
        // btno.style.border = "2px solid #e2e8f0"
        temp = 0
        Gamelogic()
    }
    })

});

function Gamelogic(){
    let item1 = document.querySelector("#item1")
    let item2 = document.querySelector("#item2")
    let item3 = document.querySelector("#item3")
    let item4 = document.querySelector("#item4")
    let item5 = document.querySelector("#item5")
    let item6 = document.querySelector("#item6")
    let item7 = document.querySelector("#item7")
    let item8 = document.querySelector("#item8")
    let item9 = document.querySelector("#item9")

//X portion
// 3 conditions of item1
    if(item1.innerText == 'X' && item2.innerText == 'X' && item3.innerText == 'X'){
       won.innerHTML = "X Won"
       item1.style.backgroundColor = "#cbdaf1"
       item2.style.backgroundColor = "#cbdaf1"
       item3.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
    }
    if(item1.innerText == 'X' && item4.innerText == 'X' && item7.innerText == 'X'){
        won.innerHTML = "X Won"
        item1.style.backgroundColor = "#cbdaf1"
        item4.style.backgroundColor = "#cbdaf1"
        item7.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
    }
     if(item1.innerText == 'X' && item5.innerText == 'X' && item9.innerText == 'X'){
        won.innerHTML = "X Won"
        item1.style.backgroundColor = "#cbdaf1"
        item5.style.backgroundColor = "#cbdaf1"
        item9.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
    }

// 2 Conditions of item2

    if(item2.innerText == 'X' && item5.innerText == 'X' && item8.innerText == 'X'){
    won.innerHTML = "X Won"
       item2.style.backgroundColor = "#cbdaf1"
       item5.style.backgroundColor = "#cbdaf1"
       item8.style.backgroundColor = "#cbdaf1"
            play.style.display = "block"
    }
    // One condition is common

// 3 conditions of item3
    if(item3.innerText == 'X' && item6.innerText == 'X' && item9.innerText == 'X'){
    won.innerHTML = "X Won"
       item3.style.backgroundColor = "#cbdaf1"
       item6.style.backgroundColor = "#cbdaf1"
       item9.style.backgroundColor = "#cbdaf1"
            play.style.display = "block"
    }
    if(item3.innerText == 'X' && item5.innerText == 'X' && item7.innerText == 'X'){
        won.innerHTML = "X Won"
        item3.style.backgroundColor = "#cbdaf1"
        item5.style.backgroundColor = "#cbdaf1"
        item7.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
    }
    //One condition is common


// Conditions of 2nd row
    if(item4.innerText == 'X' && item5.innerText == 'X' && item6.innerText == 'X'){
        won.innerHTML = "X Won"
        item4.style.backgroundColor = "#cbdaf1"
        item5.style.backgroundColor = "#cbdaf1"
        item6.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
    }

// item5's conditions are common in others
// item6's conditions are common in others

   if(item7.innerText == 'X' && item8.innerText == 'X' && item9.innerText == 'X'){
    won.innerHTML = "X Won"
       item7.style.backgroundColor = "#cbdaf1"
       item8.style.backgroundColor = "#cbdaf1"
       item9.style.backgroundColor = "#cbdaf1"
            play.style.display = "block"
   }
// Remaining item's conditions are common in others



//O portion
if(item1.innerText == 'O' && item2.innerText == 'O' && item3.innerText == 'O'){
    won.innerHTML = "O Won"
    item1.style.backgroundColor = "#cbdaf1"
       item2.style.backgroundColor = "#cbdaf1"
       item3.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
 }
 if(item1.innerText == 'O' && item4.innerText == 'O' && item7.innerText == 'O'){
     won.innerHTML = "O Won"
     item1.style.backgroundColor = "#cbdaf1"
       item4.style.backgroundColor = "#cbdaf1"
       item7.style.backgroundColor = "#cbdaf1"

play.style.display = "block"    }
  if(item1.innerText == 'O' && item5.innerText == 'O' && item9.innerText == 'O'){
     won.innerHTML = "O Won"
     item1.style.backgroundColor = "#cbdaf1"
       item5.style.backgroundColor = "#cbdaf1"
       item9.style.backgroundColor = "#cbdaf1"

play.style.display = "block"    }

// 2 Conditions of item2

 if(item2.innerText == 'O' && item5.innerText == 'O' && item8.innerText == 'O'){
 won.innerHTML = "O Won"
 item2.style.backgroundColor = "#cbdaf1"
       item5.style.backgroundColor = "#cbdaf1"
       item8.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
 }
 // One condition is common

// 3 conditions of item3
if(item3.innerText == 'O' && item6.innerText == 'O' && item9.innerText == 'O'){
    won.innerHTML = "O Won"
    item3.style.backgroundColor = "#cbdaf1"
       item6.style.backgroundColor = "#cbdaf1"
       item9.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
    }
    if(item3.innerText == 'O' && item5.innerText == 'O' && item7.innerText == 'O'){
        won.innerHTML = "O Won"
        item3.style.backgroundColor = "#cbdaf1"
       item5.style.backgroundColor = "#cbdaf1"
       item7.style.backgroundColor = "#cbdaf1"
   
   play.style.display = "block" }
    //One condition is common
   
   
   // Conditions of 2nd row
    if(item4.innerText == 'O' && item5.innerText == 'O' && item6.innerText == 'O'){
        won.innerHTML = "O Won"
        item4.style.backgroundColor = "#cbdaf1"
       item5.style.backgroundColor = "#cbdaf1"
       item6.style.backgroundColor = "#cbdaf1"
   
   play.style.display = "block" }
   
   // item5's conditions are common in others
   // item6's conditions are common in others
   
   if(item7.innerText == 'O' && item8.innerText == 'O' && item9.innerText == 'O'){
    won.innerHTML = "O Won"
    item7.style.backgroundColor = "#cbdaf1"
       item8.style.backgroundColor = "#cbdaf1"
       item9.style.backgroundColor = "#cbdaf1"
       play.style.display = "block"
   }

   if(won.innerHTML == "X Won"){
        x.forEach(element => {
            if(element.innerHTML == "")
            {
                element.addEventListener("click",function(){
                    element.innerHTML = ""
                    btnx.style.backgroundColor = "transparent"
                    btno.style.backgroundColor = "#e2e8f0"
                    btno.style.color = "#1e293b"
                    btnx.style.color = "white"
                    location.reload()
                })
            }
        });
   }

   if(won.innerHTML == "O Won"){
    x.forEach(element => {
        if(element.innerHTML == "")
        {
            element.addEventListener("click",function(){
                element.innerHTML = ""
                btnx.style.backgroundColor = "#e2e8f0"
                btno.style.backgroundColor = "transparent"
                btnx.style.color = "#1e293b"
                btno.style.color = "white"
                location.reload()
            })
        }
    });
}
}




