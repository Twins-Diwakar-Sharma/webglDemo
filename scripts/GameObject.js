import Mesh from './Mesh.js'
import Texture from './Texture.js'
import {glMatrix,mat2, mat2d, mat3, mat4,quat, quat2,vec2, vec3, vec4} from './math/index.js'

export default class GameObject{
    texture;
    mesh;
    pos;
    rot;
    transform;

    constructor(mesh,texture){
        this.texture = texture;
        this.mesh = mesh;
        this.pos = vec3.create();
        this.rot = vec3.create();
        this.transform = mat4.create();
    }

    resetMat(){
        let fr = Math.PI/180; 

        let rad = [];
        for(var it=0; it<3; it++)
            rad[it] = fr*this.rot[it];

        mat4.identity(this.transform);
        mat4.rotateZ(this.transform,this.transform,rad[2]);
        mat4.rotateY(this.transform,this.transform,rad[1]);
        mat4.rotateX(this.transform,this.transform,rad[0]); 
            for(let i=0; i<3; i++)
            this.transform[12+i] = this.pos[i];
    

    }

    move(x,y,z){
        this.pos[0] = this.pos[0] + x;
        this.pos[1] = this.pos[1] + y;
        this.pos[2] = this.pos[2] + z;
        for(let i=0; i<3; i++)
            this.transform[12+i] = this.pos[i];
    }

    rotate(x,y,z){
        this.rot[0] = this.rot[0] + x;
        this.rot[1] = this.rot[1] + y;
        this.rot[2] = this.rot[2] + z;
        
        let it;
        let rad = [0,0,0];
        for(it=0; it<3; it++)
        {
            if(this.rot[it] > 360.0)
                 this.rot[it] = 360.0-this.rot[it];
        }
        this.resetMat();
    }

}
