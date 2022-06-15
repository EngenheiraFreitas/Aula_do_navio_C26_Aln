//Módulos da Biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//Variáveis do código
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];


//carregando imagens para uma variável
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");





}


//Função que é executada quando o programa é iniciado
function setup() {
  canvas = createCanvas(1200, 600); //Dimensões da tela de nosso jogo
  engine = Engine.create(); //criando um mecanismo de Fisíca
  world = engine.world; //criando um mundo e adicionando o Mecanismo de Fisíca ao mundo
  angleMode(DEGREES); //Definindo o tipo de ângulo usado, em nosso caso é graus
  angle = 15;

  //Criando um body de ground e adicionandop ao mundo com Mecanismo de Fisíca
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  //Criando um body de tower e adicionandop ao mundo com Mecanismo de Fisíca
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
}


//Tudo dentro de draw é excutado o tempo todo como um loop
function draw() {
  background(189);//alterando cor no fundo
  image(backgroundImg, 0, 0, width, height); //Inserindo imagem no fundo

  //Atualizando o mecanismo de Fisíca no function draw
  Engine.update(engine);

  //Criando um rect para torre e inserindo imagem de torre ao rect 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  
  showBoats();
  //Percorrendo a matriz balls e mostrando as balas de canhão dentro da matriz
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }


  //Mostrando o canhão
  cannon.display();
}

//keyPressed é chamada sempre que precisar manter uma tecla pressionada
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

//Função definida pelo usuário, mostrar a bala de canhão
function showCannonBalls(ball,index) {
  if (ball) {
    ball.display();
  }
}

//Mostrar vários navios na tela
function showBoats() {
  if (boats.length > 0) { //Nossa matriz de navios tem navio
    if (
      boats[boats.length - 1] === undefined || boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
      } 
    }
  } else { //se não houver nenhum naviona matriz, cria o 1º navio
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}

//keyReleased é chamada uma vez toda vez que uma tecla é liberada.
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
