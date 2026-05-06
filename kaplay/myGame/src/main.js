import kaplay from "kaplay";

//Configuração do canvas
kaplay({
    background: "#d46eb3",
    scale: 2,
    canvas: document.getElementById("canvas")
});

loadRoot("./"); //Não sei ainda

//Criação de uma cena
scene("red_bean", ()=>{

    //Todo objeto, que pertence a cena, precisa ser adicionado a ela
    const obj = add([
        rect(20,30),
        pos(10,20),
        "shape",
        color(RED)
    ]);

    //Evento de segurar o botão para movimentação do objeto
    onKeyDown("right", () => {
        obj.move(200,0)
    });
    onKeyDown("left", () => {
        obj.move(-200,0)
    });
    onKeyDown("up", () => {
        obj.move(0,-200)
    });
    onKeyDown("down", () => {
        obj.move(0,200)
    });

    //Evento de clique unico
    onKeyPress("d", ()=>{
        go("blue_bean");
    });

    //Evento de clique no mouse
    onClick(() => addKaboom(mousePos()));

    //Evento de checagem por update, todo frame 60 vezes por segundo
    onUpdate(()=>{
        if(isKeyDown("h")){
        debug.log("hi")
    }
    })
})

//Troca de cena
scene("blue_bean", ()=>{

    //Evento de checagem de criação de objeto
    onAdd("shape", () => {
        debug.log("shaped");
    });

    const obj = add([
        rect(20,30),
        pos(10,20),
        "shape",
        color(BLUE)
    ]);

    //Evento de segurar o botão para movimentação do objeto
    onKeyDown("right", () => {
    obj.move(200,0)
    });
    onKeyDown("left", () => {
        obj.move(-200,0)
    });
    onKeyDown("up", () => {
        obj.move(0,-200)
    });
    onKeyDown("down", () => {
        obj.move(0,200)
    });

    //Evento de clique unico
    onKeyPress("a", ()=>{
        go("red_bean");
    });

    
})

//Instanciando a primeira cena
go("red_bean")