import Shader from './Shader.js'
import Mesh from './Mesh.js'
import GameObject from './GameObject.js'
import {glMatrix,mat2, mat2d, mat3, mat4,quat, quat2,vec2, vec3, vec4} from './math/index.js'



export default class Renderer{
    projection;

    constructor(gl,vcode,fcode){
        this.shader = new Shader(gl,vcode,fcode);
        this.shader.mapUniform(gl,'tra');
        this.shader.mapUniform(gl,'pro');
        this.shader.mapUniform(gl,'lightPos');
        this.shader.mapUniform(gl,'lightColor');
        this.shader.mapUniform(gl,'albedoSampler');
        let fov = 60.0 * Math.PI/180;
        let aspect = gl.canvas.width/gl.canvas.height;
        let near = 0.1;
        let far = 1000.0;
        this.projection = mat4.create();
        mat4.perspective(this.projection,fov,aspect,near,far);
        console.log(this.projection);
    }

    render(gl,arr,lightPos,lightColor){
        this.shader.use(gl);
        this.shader.setUniformMat4(gl,'pro',this.projection);
        this.shader.setUniformVec3(gl,'lightPos',lightPos);
        this.shader.setUniformVec3(gl,'lightColor',lightColor);
        this.shader.setUniformIn1(gl,'albedoSampler',0);

        for(let i=0; i<arr.length; i++){
           this.shader.setUniformMat4(gl,'tra',arr[i].transform);
           arr[i].mesh.bind(gl);
           gl.activeTexture(gl.TEXTURE0);
           gl.bindTexture(gl.TEXTURE_2D,arr[i].texture.textureId);
           gl.enableVertexAttribArray(0);
           gl.enableVertexAttribArray(1);
           gl.enableVertexAttribArray(2);
           gl.drawElements(gl.TRIANGLES,arr[i].mesh.size(),gl.UNSIGNED_BYTE,0);
           gl.disableVertexAttribArray(2);
           gl.disableVertexAttribArray(1);
           gl.disableVertexAttribArray(0);
           arr[i].mesh.unbind(gl);
        } 
        this.shader.unuse(gl);
    }

}
