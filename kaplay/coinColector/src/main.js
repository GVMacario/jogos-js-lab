import kaplay from "kaplay";

kaplay({
    background: "#d46eb3",
});

let coinsColected = 0;

function createCoin(){
    return [
        pos(rand(0, width()-20), rand(0, height()-20)), sprite("coin"),  area(), "coin"
    ]
}

loadRoot("./");
loadSprite("bean", "sprites/bean.png");
loadSprite("coin", "sprites/coin.png");
loadSprite("play", "sprites/play.png");

scene("start_screen", ()=>{
    add([
        text("CoinColector!"),
        pos((width()/2)-100, (height()/2)-120)
    ])
    add([
        text("Clique para Jogar!"),
        pos((width()/2)-150, (height()/2)-60)
    ])
    const play = add([
        sprite("play"),
        pos(width()/2, height()/2)
    ]);
    play.onMouseDown(() =>{
        go("game_screen")
    });
});

scene("game_screen", ()=>{
    debug.log(`Moedas coletadas: ${coinsColected}`);
    const player = add([pos(0, 0), sprite("bean"),  area(), "player"]);
    for (let i = 0; i < 5; i++){
        add(createCoin());
    };

    onKeyDown("d", ()=>{
        player.move(300,0);
    });

    onKeyDown("a", ()=>{
        player.move(-300,0);
    });

    onKeyDown("s", ()=>{
        player.move(0,300);
    });

    onKeyDown("w", ()=>{
        player.move(0, -300);
    });

    onCollide("player","coin",(player, coin)=>{
        coinsColected++
        debug.log(`Moedas coletadas: ${coinsColected}`);
        destroy(coin)
    });

    onUpdate(()=>{if(coinsColected == 5){
        coinsColected = 0
        go("finish_screen")
    }})
});

scene("finish_screen", ()=>{
    add([
        text("Jogar novamente?"),
        pos((width()/2)-120, (height()/2)-60)
    ])
    const play = add([
        sprite("play"),
        pos(width()/2, height()/2)
    ])
    play.onMouseDown(() =>{
        go("game_screen")
    })
});

go("start_screen");