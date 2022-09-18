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
let title = document.getElementById("title")
let reset = document.getElementById("reset");
let hidennWord = document.getElementById("hidennWord");
let img = document.getElementById("img");

imageContainer.style.backgroundImage = "url('../assets/01.PNG')";
/* img.src = "../assets/01.png"; */

for (let i = 0; i < word.length; i++) {
    let space = document.createElement("div");
    space.innerHTML = "";
    space.className = "hiddenLetter";
    space.id = i;
    hidennWord.appendChild(space);
}

let teclasPresionadas = {};

for (let i = 65; i < (65 + 26); i++) {
    let newButton = document.createElement("button");
    let letter = String.fromCharCode(i);

    newButton.innerText = letter;
    newButton.id = letter;
    newButton.className = "button";

    teclasPresionadas[letter] = false;
    
    letterContainer.appendChild(newButton);

}

const callbackKeyEvent = (event) => {
    // Para conisderar solo teclas de 1 solo caracter (excluir el Enter principalmente);
    if (event.key.length === 1) {

        let keyLetter = event.key.toUpperCase(); // UperCase a la letra presionada;
        let codeLetter = keyLetter.charCodeAt(); // Valor Unicode del caracter de índice 0 del string;

        // Si es una letra de la A a la Z y aún no fue presionada se ejecuta la funcion listener();
        if (codeLetter > 64 && codeLetter < (64 + 28) && !teclasPresionadas[keyLetter]) {
            listener(keyLetter, true);
        }
    }
    
}

// eventListener al document para escuchar un keyUp y ejecutar el callbackKeyEvent;
document.addEventListener('keyup', callbackKeyEvent)


// Funcion de reseto del juego a través del teclado, presionando Enter;
const resetKeyEvent = (event) => {
    if(event.key === 'Enter') {
        resetFunction();
    }
}

// eventListener para escuchar un keyUp y ejecutar el resetKeyEvent,
// agrego uno independiente porque el callbackKeyEvent se remueve en determinadas circunstancias;
document.addEventListener('keyup', resetKeyEvent)

function listener(event, keyEvent) {
    let letter;
    
    keyEvent ? letter = event : letter = event.target.innerHTML;
    
    let flag = true;

    for (let i = 0; i < word.length; i++) {

        if (word[i] === letter) {

            let space = document.getElementById(i);
            let letterButton = document.getElementById(letter);

            space.innerHTML = letter;
            space.className = "hiddenLetterGuessed";

            letterButton.disabled = true;
            letterButton.className = "buttonDisabled";

            teclasPresionadas[letter] = true;
            flag = false;
            aciertos++;
        }
    }

    if (flag) {

        oportunidades++

        if (oportunidades === 7) {

            title.innerHTML = "PERDISTE !!!";
                
            for (let i = 65; i < (65 + 26); i++) {
                document.getElementById(
                    String.fromCharCode(i)
                    ).onclick = null;
            }
            
            imageContainer.style.backgroundImage = `url('../assets/0${oportunidades}.PNG')`;
            // imageContainer.style.backgroundImage = "url('../assets/gifAhorcado.gif')";
            // imageContainer.style.backgroundSize = "cover";

            document.removeEventListener('keyup', callbackKeyEvent)

            return 
        }

        imageContainer.style.backgroundImage = `url('../assets/0${oportunidades}.PNG')`;
        
    }
    

    if (aciertos === word.length) {
        imageContainer.style.backgroundImage = `url('../assets/rumba-fiesta.gif')`
        imageContainer.style.backgroundSize = "cover";

        title.innerHTML = "ADIVINASTE !!!"

        for (let i = 65; i < (65 + 26); i++) {
            let button = document.getElementById(String.fromCharCode(i))
            button.onclick = null;
        }

        document.removeEventListener('keyup', callbackKeyEvent)
    }    
    
    // console.log("Aciertos: ", aciertos, "oportunidades: ", oportunidades , "letras", word.length)
}


const resetFunction = () => {

    teclasPresionadas = {};
    title.innerHTML = "El Ahorcado"
    imageContainer.style.backgroundSize = "contain";
    oportunidades = 1;
    aciertos = 0;
    imageContainer.style.backgroundImage = "url('../assets/01.PNG')";

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

    document.addEventListener('keyup', callbackKeyEvent)
    console.log(word)
    
}

for (let i = 65; i < (65 + 26); i++) { 
    
    document.getElementById(
        String.fromCharCode(i)
        ).onclick = listener;
}

reset.onclick = resetFunction;
console.log(word)

