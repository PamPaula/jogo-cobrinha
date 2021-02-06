let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
//array para a cobrar andar
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
//array para comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//criação de backgroung para inicializar o canvas
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//criando a cobra
function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//criar comidinha
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//detecta o valor da tela para andar na direção onde queremos
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//iniciando o jogo
function iniciarJogo() {
    //permitir atravessar paredes
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //finalizando o jogo quando a cobra bate a cabeça no corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over! =/");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //posições da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //cordenadas da cobra pra ela andar
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //aumentando a cobra quando ela come
    if(snakeX != food.x || snakeY != food.y){
        //função pop retira ultimo elemento do array
        snake.pop();
    }
    else{ food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //cabeça da cobra
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

//função de tempo para o jogo não travar
let jogo = setInterval(iniciarJogo, 100);

