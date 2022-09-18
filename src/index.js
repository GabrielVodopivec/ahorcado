const listaDePalabras = [
    "CAMAROGRAFO",
    "GALAXIA",
    "MINOTAURO",
    "HOMOSAPIENS",
    "PROGRAMADOR",
    "ENTRETENIMIENTO",
    "REACCIONAR",
    "AEROPLANO",
    "DESAYUNAR",
    "EMBARCACION",
    "Electrocardiograma",
    "monumental",
    "terrestres",
    "paciencia",
    "fundamento",
    "reemplazo",
    "coronado",
    "pantalones",
    "Termoestable",
    "ordenadores"
];

const randomWord = (max) => {
    let randomNumber = Math.floor(Math.random()*max); 
    let randomWord = listaDePalabras[randomNumber].toUpperCase();
    return randomWord;
} 
    
let word = randomWord(listaDePalabras.length);

let oportunidades = 1;
let aciertos = 0;

let imageContainer = document.getElementById("imgContainer")
let letterContainer = document.getElementById("letterContainer");
let reset = document.getElementById("reset");
let hidennWord = document.getElementById("hidennWord");
let img = document.getElementById("img");

imageContainer.style.backgroundImage = "url('../assets/01.png')";
/* img.src = "../assets/01.png"; */
// modificacion del nombre


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

    let letter = event.target.innerHTML;
    let flag = true;

    for (let i = 0; i < word.length; i++) {

        if (word[i] === letter) {

            let space = document.getElementById(i);

            space.innerHTML = letter;
            space.className = "hiddenLetterGuessed";

            event.path[0].disabled = true;
            event.path[0].className = "buttonDisabled";

            flag = false;
            aciertos++;
        }
    }

    if (flag) {
        oportunidades++

        if (oportunidades === 7) {

            let message = document.createElement("h1");
    
            message.textContent = "PERDISTE!!!!";
            message.className = "message";
            message.id = "message";
            
            document.body.appendChild(message);
            
            for (let i = 65; i < (65 + 26); i++) {
                document.getElementById(
                    String.fromCharCode(i)
                    ).onclick = null;
                }

            return imageContainer.style.backgroundImage = "url('../assets/gifAhorcado.gif')"
        }

        imageContainer.style.backgroundImage = `url('../assets/0${oportunidades}.PNG')`
    }
    

    if (aciertos === word.length) {
        imageContainer.style.backgroundImage = `url('../assets/rumba-fiesta.gif')`
        let message = document.createElement("h1");

        message.textContent = "ADIVINASTE!!!!";
        message.className = "message";
        message.id = "message";

        document.body.appendChild(message);

        for (let i = 65; i < (65 + 26); i++) {
            let button = document.getElementById(String.fromCharCode(i))
            button.onclick = null;
        }
    }    
    

}



const resetFunction = () => {

    oportunidades = 1;
    aciertos = 0;
    imageContainer.style.backgroundImage = "url('../assets/01.png')";

    for (let i = 0; i < word.length; i++) {
        hidennWord.removeChild(
            document.getElementById(i)
        );
    }

    word = randomWord(listaDePalabras.length);

    for (let i = 0; i < word.length; i++) {
        let space = document.createElement("div");
        space.innerHTML = "";
        space.className = "hiddenLetter";
        space.id = i;
        hidennWord.appendChild(space);
    }

    for (let i = 65; i < (65 + 26); i++) {
        let button = document.getElementById(String.fromCharCode(i))
        button.disabled = false;
        button.onclick = listener;
        button.className = "button"
    }

    let message = document.getElementById("message")
    
    if(message) {
        document.body.removeChild(message)
    }

    console.log(word)
    
}

for (let i = 65; i < (65 + 26); i++) { 
    document.getElementById(
        String.fromCharCode(i)
        ).onclick = listener;
}

reset.onclick = resetFunction;
console.log(word)

