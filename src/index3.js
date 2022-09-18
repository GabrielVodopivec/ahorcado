

const word = "ESTEREOTIPO";

let oportunidades = 1;
let aciertos = [];

let letterContainer = document.getElementById("letterContainer");
let reset = document.getElementById("reset");
let hidennWord = document.getElementById("hidennWord");
let img = document.getElementById("img");
img.src = "../assests/01.PNG";


for (let i = 0; i < word.length; i++) {
    let space = document.createElement("div");
    space.innerHTML = "";
    space.className = "hiddenLetter";
    space.id = i;
    hidennWord.appendChild(space);
}

for (let i = 65; i < (65 + 26); i++) {
    let newButton = document.createElement("button");
    let letter = String.fromCharCode(i);

    newButton.innerText = letter;
    newButton.id = letter;
    newButton.className = "button";
    
    letterContainer.appendChild(newButton);

}
function listener(event) {

    if (
        (event.path[0].id != "reset") && 
        (event.path[0].id != "img") && 
        isNaN(event.path[0].id) && 
        (oportunidades < 7) && 
        (aciertos.length != word.length)
        ) {

            let letter = event.target.innerHTML;
            let flag = true;

            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    let space = document.getElementById(i);
                    space.innerHTML = letter;
                    event.path[0].disabled = true
                    flag = false;
                    aciertos.push(letter)
                }
            }

        if (flag) {
            oportunidades++
            img.src = `./assests/0${oportunidades}.PNG`
        }
    }

    if (aciertos.length === word.length) {
        let message = document.createElement("h1");
        message.textContent = "ADIVINASTE!!!!";
        message.className = "message";
        message.id = "message";
        document.body.appendChild(message);
        document.removeEventListener("click", listener)
    }    
    
    if (oportunidades === 7) {
        let message = document.createElement("h1");
        message.textContent = "PERDISTE!!!!";
        message.className = "message";
        message.id = "message";
        document.body.appendChild(message)
        document.removeEventListener("click", listener)
    }
    console.log(oportunidades)
    console.log(isNaN(event.path[0].id))
    console.log(event.path[0].id)
}


const resetFunction = () => {

    oportunidades = 1;
    img.src = "./assests/01.PNG";
    aciertos = [];
    
    for (let i = 0; i < word.length; i++) {
        document.getElementById(i).innerHTML = "";
    }

    for (let i = 65; i < (65 + 26); i++) {
        document.getElementById(
            String.fromCharCode(i)
            ).disabled = false;
    }

    let message = document.getElementById("message")
    
    if(message) {
        document.body.removeChild(message)
    }
    
    document.addEventListener('click', listener);
    
}

document.addEventListener('click', listener )
reset.onclick = resetFunction;


