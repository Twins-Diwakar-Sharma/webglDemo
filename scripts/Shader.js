export default class Shader
{
    program;
    uniformMap;


    constructor(gl,vcode,fcode){
        let vs = this.loadShader(gl,gl.VERTEX_SHADER,vcode);
        let fs = this.loadShader(gl,gl.FRAGMENT_SHADER,fcode);

        this.program = gl.createProgram(); 
        gl.attachShader(this.program,vs);
        gl.attachShader(this.program,fs);
        gl.linkProgram(this.program);

           if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                 alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.program));
          
          }

        this.uniformMap = new Map();
    }

     loadShader(gl,type,source){
          const shader = gl.createShader(type);
          gl.shaderSource(shader,source);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
          }

          return shader;
     }
    // map uniforms
    mapUniform(gl,name){
        let uni = gl.getUniformLocation(this.program,name);
        this.uniformMap.set(name,uni);
    }
    
    setUniformIn1(gl,name,val){
        let uni = this.uniformMap.get(name);
        gl.uniform1i(uni,val);
    }

    setUniformFl1(gl,name,val){
        let uni = this.uniformMap.get(name);
        gl.uniform1f(uni,val);
    }
    setUniformVec3(gl,name,vec){
        let uni=this.uniformMap.get(name);
        gl.uniform3f(uni,vec[0],vec[1],vec[2]);
    }
    setUniformMat4(gl,name,mat){
        let uni = this.uniformMap.get(name);
        gl.uniformMatrix4fv(uni,false,mat);
    }


    use(gl) {
        gl.useProgram(this.program);
    }

    unuse(gl) {
        gl.useProgram(null);
    }
}
