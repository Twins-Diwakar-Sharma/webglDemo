export default class Mesh{
     vertexData;
     indices;
     vao;
     vbo;
     ebo;

    constructor(gl){
        this.square(gl);
        this.generate(gl);
    }

    tri(gl){
        this.vertexData = [
           -0.5, -0.5, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0,
           0.5, -0.5, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
           0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0
        ];
        this.indices = [
            0,1,2
        ];
    }
    
    square(gl){ 

        this.vertexData = [ -1, 1, -1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, -1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, -1, -1, 1, 0, 0, 0, 0, 1, 1, -1, 1, 1, 0, 0, 0, 1, -1, 1, 1, 0, 1, -1, 0, 0, -1, -1, -1, 1, 0, -1, 0, 0, -1, -1, 1, 0, 0, -1, 0, 0, 1, -1, -1, 1, 1, 0, -1, 0, -1, -1, 1, 0, 0, 0, -1, 0, -1, -1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, 1, 1, 0, 0, 1, -1, 1, 0, 0, 1, 0, 0, 1, -1, -1, 1, 0, 1, 0, 0, -1, 1, -1, 0, 1, 0, 0, -1, 1, -1, -1, 1, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0, 1, 0, -1, 1, 1, 0, 1, 0, 0, 1, -1, 1, -1, 1, 1, -1, 0, 0, 1, -1, 1, 1, 0, 0, -1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, -1, 1, 1, 0, 0, -1,  ];
        this.indices = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 18, 1, 3, 19, 4, 6, 20, 7, 9, 21, 10, 12, 22, 13, 15, 23, 16,  ];

   }

    generate(gl){
        	this.vao = gl.createVertexArray();
            gl.bindVertexArray(this.vao);
            
            this.vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8*4, 0*4);
            gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 8*4, 3*4);
            gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 8*4, 5*4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.ebo = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(this.indices),gl.STATIC_DRAW);
            gl.bindVertexArray(null);
  } 


      bind(gl){
        gl.bindVertexArray(this.vao);
    }

      unbind(gl){
        gl.bindVertexArray(null);
    }

      size(){
       return this.indices.length; 
    }

}
