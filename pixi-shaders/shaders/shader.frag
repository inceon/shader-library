precision mediump float;
varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D currentimage;



void main(void) {
    vec2 pos = vTextureCoord;


	pos.x += sin(pos.y*2. + time/20.)/30.;
	pos.y += sin(pos.x*3. + time/23.)/33.;
	gl_FragColor = texture2D(uSampler, pos);

}