import Engine from './Engine.js'

const canvas = document.getElementById("window");
canvas.width = 512;
canvas.height = 512;
const gl = canvas.getContext("webgl2");


function main()
{
    if(gl === null){
        alert("unable to initialize");
    }

    gl.viewport(0,0,gl.canvas.width,gl.canvas.height); 
    let engine = new Engine();
    engine.init(gl);

    engine.loop(gl);
}
window.onload = main;


