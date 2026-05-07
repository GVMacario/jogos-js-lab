import kaplay from "kaplay";

//Configuração do canvas
kaplay({
    background: "#d46eb3",
    scale: 2,
    canvas: document.getElementById("canvas")
});
loadSprite("bean", "sprites/bean.png");

function createCoins(num1, num2){
        return [
            circle(10),
            pos(num1, num2),
            color(YELLOW),
        ]
    }

function createCoins2(spr){
    const posX = rand(0, width());
    const posY = rand(0, height());

    const obj = add([
        pos(posX,posY),
    ]);

    if(spr){
        obj.use(sprite(spr));
        obj.use(color(GREEN))
    }else{
        obj.use(rect(15,15));
        obj.use(color(YELLOW))
    }

    return obj;
}

loadRoot("./"); //Não sei ainda

//Criação de uma cena
scene("red_bean", ()=>{
    
    //Todo objeto, que pertence a cena, precisa ser adicionado a ela
    const player = add([
        rect(30,30),
        pos(50,20),
        "player",
        color(RED)
    ]);

    // Objeto com sprite e redimensionamento
    const baner = add([
        sprite("bean"),
        pos(50,50),
    ])

    //Criando objetos de forma dinamica
    const coin1 = add(createCoins(100,100));
    const coin2 = add(createCoins(250,250));
    const coin3 = add(createCoins(400,400));

    // Obj children, ele serve para seguir o parent em posição tamanho e escala
    const pet = player.add([
        circle(8),
        color(BLUE),
        pos(-10,22), //Essa posição é relativa a posição do parent e não do root
    ])

    //Filho de um filho
    const petizinho = pet.add([
        circle(4),
        color(BLUE),
        pos(-15,4), //Essa posição é relativa a posição do parent e não do root
    ])

    //Aqui eu removi um filho de outro objeto mas não entendi a questão
    pet.remove(petizinho);
    
    //Evento de segurar o botão para movimentação do objeto
    onKeyDown("right", () => {
        player.move(200,0)
    });
    onKeyDown("left", () => {
        player.move(-200,0)
    });
    onKeyDown("up", () => {
        player.move(0,-200)
    });
    onKeyDown("down", () => {
        player.move(0,200)
    });

    const cancelalo = onKeyPress((key)=>{
        debug.log(key)
    })
    
    //Evento de clique unico
    onKeyPress("d", ()=>{
        go("blue_bean");
    });
    onKeyPress("w", ()=>{
        go("green_bean");
    });

    //Evento de clique no mouse
    onClick(() => addKaboom(mousePos()));

    //Evento de checagem por update, todo frame 60 vezes por segundo
    onUpdate(()=>{
        if(isKeyDown("h")){
        cancelalo.cancel();
    }
    })

    onLoad(()=>{
        debug.log("Tudo carregado");
    })
 
})

//Troca de cena
scene("blue_bean", ()=>{

    //Evento de checagem de criação de objeto
    onAdd("player", () => {
        debug.log("shaped");
    });

    const player = add([
        rect(20,30),
        pos(10,20),
        "player",
        color(BLUE)
    ]);

    //Evento de segurar o botão para movimentação do objeto
    onKeyDown("right", () => {
    player.move(200,0)
    });
    onKeyDown("left", () => {
        player.move(-200,0)
    });
    onKeyDown("up", () => {
        player.move(0,-200)
    });
    onKeyDown("down", () => {
        player.move(0,200)
    });

    // Objeto com sprite e redimensionamento
    const baner0 = add([
        sprite("bean"),
        pos(50,50),
        "baner"
    ])
    const baner1 = add([
        sprite("bean"),
        pos(50,50),
        "baner"
    ])
    const baner2 = add([
        sprite("bean"),
        pos(50,50),
        "baner"
    ])

    //Como destruir um obj
    onKeyPress("space", () => {
        destroy(baner0);
    })

    baner0.onDestroy(() => {
        debug.log("Morreu");
    });

    //Buscando objetos
    const allObj = get("baner");
    debug.log(allObj.length);

    //Evento de clique unico
    onKeyPress("a", ()=>{
        go("red_bean");
    });

    
})
scene("green_bean", ()=>{

    const quadrado = add([
        sprite("bean"),
        pos(10,10),
    ])

    onUpdate(()=>{
        quadrado.moveBy(1,1)
    });
    
    onDraw(()=>{
        drawLine({
            p1: vec2(50),
            p2: mousePos(),
            width: 4,
            color: rgb(rand(0, 255),rand(0, 255),rand(0, 255))
        });
    })

    const moeda = createCoins2("bean");
    const outracoisa = createCoins2();
    // outracoisa.unuse("sprite");

    onUpdate

    moeda.move(100,0);
    debug.log(moeda.height);
    //Evento de clique unico
    onKeyPress("a", ()=>{
        go("red_bean");
    });

    
})

//Instanciando a primeira cena
go("red_bean")