const Swal = require('sweetalert2')

let order = []
let clickedOrder = [];
let score = 0;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aleatoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); // 0, 1, 2, 3 
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        setTimeout(() => { lightColor(elementColor, Number(i) + 1); }, (Number(i) + 1) * 750)
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;

    element.classList.add('selected')

    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 250)
}

//checa se os botoes clicados sao os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontação:${score}\nVocê acertou! Iniciando próximo nível!`);

        setTimeout(() => {
            nextLevel();
        }, 1000)

    }
}

//função para clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if (color == 0)
        return green;
    else if (color == 1)
        return red;
    else if (color == 2)
        return yellow;
    else if (color == 3)
        return blue;
}

// Deixando o jogo mais dificil
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//função game over
let gameOver = () => {
    alert(`Pontuação : ${score}!\nVocê perdeu o jogo!\nClique em iniciar um novo jogo`);
    order = [];
    score = 0;
    clickedOrder = [];
    playGame();
}

//inicia o jogo
let playGame = () => {
    Swal('Bem vindo ao Gênesis! Iniciando novo jogo!')
    setTimeout(() => { nextLevel() }, 1000)
}

// Eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
