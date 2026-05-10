import kaplay from "kaplay";

kaplay({
    background: "#5b83da",
});

loadRoot("./");
loadSprite("bean", "sprites/bean.png");
loadSprite("beantle", "sprites/beantle.png");
loadSprite("goldfly", "sprites/goldfly.png");
loadSprite("play", "sprites/play.png");


// Variaveis
let player_speed = 200;
let enemy_speed = 200;

function createEnemy(){
    const beantle = [
        sprite("beantle"),
        area(),
        pos(rand(20, width()-20),0),
        "enemy"
    ]
    const goldfly = [
        sprite("goldfly"),
        pos(rand(40, width()-40),0),
        area(),
        rotate(90),
        "enemy"
    ]
    const enemys = [beantle, goldfly]
    const randomEnemy = enemys[Math.floor(Math.random() * enemys.length)]
    return randomEnemy
}

scene("start", ()=>{
    const playbutton = add([
        sprite("play"),
        anchor("center"),
        pos(width()/2, height()/2), 
        area(),
        "play" 
    ])
    const title = playbutton.add([
        text("Dodge Game"),
        anchor("center"),
        pos(0, -80)
    ])
    onClick("play", (play) => go("game"))
})

scene("game",()=>{
    // Objetos
    const player = add([
        sprite("bean"),
        area(),
        pos(width()/2,height()-100)
    ])
    const score = add([
        text("Score: 0"),
        pos(0,0),
        {value: 0}
    ])

    loop(1, ()=>{
        score.value += 100;
        score.text = "Score:" + score.value;
    })
    loop(0.3, ()=>{
        add(createEnemy());
    })

    //Eventos
    onKeyDown("a", ()=>{
        player.move(-player_speed,0)
    })
    onKeyDown("d", ()=>{
        player.move(player_speed,0)
    })

    onUpdate("enemy", (enemy) => {
        enemy.move(0, 400);
        if (enemy.pos.y > height()) {
            destroy(enemy);
        }
    });

    player.onCollide("enemy", ()=>{
        destroy(player)
        go("gameOver", score.value)
    })
})

scene("gameOver", (score=0)=>{
    const playbutton = add([
        sprite("play"),
        pos(width()/2, height()/2), 
        anchor("center"),
        area(),
        "play" 
    ])
    const finalScore = add([
        text("Sua pontuação foi de: " + score),
        anchor("center"),
        pos(width()/2, height()/4),
    ])
    const title = playbutton.add([
        text("Fim de jogo"),
        anchor("center"),
        pos(0,-110)
    ])
    const subTitle = playbutton.add([
        text("Quer jogar novamente?"),
        anchor("center"),
        pos(0,-60)
    ])
    onClick("play", (play) => go("game"))
})


go("start")