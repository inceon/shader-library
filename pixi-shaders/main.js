let width = window.innerWidth;
let height = window.innerHeight;

let app = new PIXI.Application(width, height, {backgroundColor : 0x19eedb});
document.body.appendChild(app.view);

let imageBG = PIXI.Sprite.fromImage('images/image1.jpg');

imageBG.anchor.set(0.5);

imageBG.x = width / 2;
imageBG.y = height / 2;

app.stage.addChild(imageBG);

app.stop();

PIXI.loader.add('shader', 'shaders/shader.frag')
            .load(onLoaded);
let filter;
function onLoaded(loader, res) {
    let uniforms = {
        time: {
            type:"f",
            value:0
        },
        currentimage: {
            type: "sampler2D",
            value: imageBG._texture
        }
    };

    filter = new PIXI.Filter(null, res.shader.data, uniforms);

    imageBG.filters = [filter];

    app.start();
}

let time = 0;
app.ticker.add(() => {
    time ++;
    filter.uniforms.time = time;
});