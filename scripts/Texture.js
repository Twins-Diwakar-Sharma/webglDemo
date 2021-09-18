export default class Texture{
    textureId;
    constructor(gl,name){
        // Create a texture.
        this.textureId = gl.createTexture();
        console.log(this.textureId);
        gl.bindTexture(gl.TEXTURE_2D, this.textureId);
         
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                      new Uint8Array([0, 0, 255, 255]));
         
        // Asynchronously load an image
        let image = new Image();
        image.src = "../res/" + name + ".png";
        
        let myself = this;
        image.addEventListener('load', function() {
          // Now that the image has loaded make copy it to the texture.
          gl.bindTexture(gl.TEXTURE_2D, myself.textureId);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
          gl.generateMipmap(gl.TEXTURE_2D);
          console.log(image.src + " is loaded");
        });
    }

}
