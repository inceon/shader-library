let width = window.innerWidth;
let height = window.innerHeight;
let textures, material, plane, currentImage = 1;
let imageList = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );

let renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

let camera = new THREE.PerspectiveCamera( 70, width/height, 0.01, 1000 );
camera.position.set( 0, 0, 10 );

// let controls = new THREE.OrbitControls( camera, renderer.domElement);
// controls.update();

function loadImages() {
    textures = [];

    imageList.forEach((image, index) => {
        textures.push(new THREE.TextureLoader().load('images/' + image));
    })
}

function init() {
    loadImages();

    material = new THREE.ShaderMaterial({
        uniforms: {
            time:       { type: 'f',  value: 1.0 },
            uvRate1: {
                value: new THREE.Vector2(1,1)
            },
            resolution: { type: 'v2', value: new THREE.Vector2(width, height) },
            u_mouse:    { type: 'v2', value: new THREE.Vector2() },
            texture:    { type: 't',  value: textures[currentImage]}
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    plane = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 2.1), material);
    scene.add(plane);

    resize();
}

window.addEventListener('resize', resize);
function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize( w, h );
    camera.aspect = w / h;
    plane.scale.x = w/h;

    material.uniforms.uvRate1.value.y = h / w;

    // calculate scene
    let dist  = camera.position.z - plane.position.z;
    let height = 1;
    camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));


    camera.updateProjectionMatrix();
}

window.addEventListener('mousemove', mousemove);
function mousemove(ev) {
    material.uniforms.u_mouse.value = new THREE.Vector2(
        ev.pageX/width - 0.5,
        ev.pageY/height - 0.5
    );
}

let time = 0;
function animate() {
    requestAnimationFrame( animate );

    material.uniforms.time.value = time++;
    camera.position.z += time/1000;

    // controls.update();
    renderer.render( scene, camera );
}

init();
animate();