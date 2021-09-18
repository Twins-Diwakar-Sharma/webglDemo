export const objvs=`#version 300 es
    layout (location=0) in vec3 pos;
    layout (location=1) in vec2 tex;
    layout (location=2) in vec3 nor;

    out vec3 fragNor;
    out vec2 fragTex;
    out vec3 fragPos;
    
    uniform mat4 tra;
    uniform mat4 pro;

    void main()
    {
        fragNor = (tra * vec4(nor,0)).xyz;
        fragNor = normalize(fragNor);
        fragPos = (tra * vec4(pos,1)).xyz;
        
        fragTex = tex;
        gl_Position = pro * tra * vec4(pos,1);
    }
`;

export const objfs=`#version 300 es
   precision highp float;
   out vec4 color;
   in vec3 fragNor;   
   in vec2 fragTex;
   in vec3 fragPos;

   uniform vec3 lightPos;
   uniform vec3 lightColor;

   uniform sampler2D albedoSampler;

   void main()
   {
        vec3 toLight = normalize(lightPos-fragPos);
        float diff = max(dot(fragNor,toLight),0.0); 
        vec3 diffuse = diff * lightColor;
       
        vec4 albedo =texture(albedoSampler,fragTex);

        vec3 ambient = vec3(0.01);
        vec3 result = (ambient + diffuse)*albedo.rgb;
        color = vec4(result,albedo.a);
   }
`;


