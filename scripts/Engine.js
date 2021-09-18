import Renderer from './Renderer.js'
import Mesh from './Mesh.js'
import {objvs,objfs} from './shaderCode.js'
import GameObject from './GameObject.js'
import Texture from './Texture.js'
import {glMatrix,mat2, mat2d, mat3, mat4,quat, quat2,vec2, vec3, vec4} from './math/index.js'



export default class Engine{
     renderer;
     objects;
     ticks;      
     lightColor;
     lightPos;

    init(gl) {
        this.renderer = new Renderer(gl,objvs,objfs);
        gl.clearColor(0.1,0.1,0.1,1.0);
        this.ticks = 1000/60; // 1000/60

        this.lightColor = vec3.create();
        this.lightColor[0] = 1; this.lightColor[1] = 1; this.lightColor[2] = 1;
        this.lightPos = vec3.create();
        this.lightPos[0] = -1; this.lightPos[1] = 1; this.lightPos[2] = 0;

        let mesh = new Mesh(gl); 
        let texture = new Texture(gl,"woodBox");
        console.log("textureId " + texture.textureId);
        let go = new GameObject(mesh,texture);
        go.pos[2] = -5;
        this.objects = [];
        this.objects.push(go);

        gl.enable(gl.DEPTH_TEST);
    }



    loop(gl) {
        var self = this;
        setInterval(function(){
            self.input(gl);
            self.update(gl);
            self.render(gl);
        },self.ticks);
    }


    input(gl){
    }

    update(gl){
         this.objects[0].rotate(1,1,1);
    }

    render(gl){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.renderer.render(gl,this.objects,this.lightPos,this.lightColor);
    }


}
