<script setup>
import * as THREE from 'three'
// import { onMounted } from 'vue';

let camera, scene, renderer, clock
let uniforms

let vertex = `
  void main() { gl_Position = vec4(position, 1.0); }
`

let fragment = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float fr = u_resolution.x/1.0;	
	vec3 x = vec3(st.x);
	vec3 y = vec3(st.y);

	vec3 colorA = vec3(0, 0.2784, 0.7333);
	vec3 colorB = vec3(0, 0.2784, 0.7333);
	vec3 colorC = vec3(0.0, 1.0, 1.0);

	vec3 color1 = mix(colorA, colorB, fract(x*fr));
	vec3 color2 = mix(colorB, colorC, (y-sin(u_time))*0.5);
	vec3 color3 = mix(color1, color2, x*cos(u_time+2.));

	gl_FragColor = vec4(color3, 1);
}
`

// onMounted(()=>{
//   init()
//   animate()
// })

function init() {
	const container = document.getElementById("container");

	clock = new THREE.Clock();
	camera = new THREE.Camera();
	camera.position.z = 1;

	scene = new THREE.Scene();

	const geometry = new THREE.PlaneGeometry(2, 2);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
	};

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: vertex,
		fragmentShader: fragment
	})

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	uniforms.u_resolution.value.x = renderer.domElement.width
	uniforms.u_resolution.value.y = renderer.domElement.height
}

function render() {
	uniforms.u_time.value = clock.getElapsedTime()
	renderer.render(scene, camera)
}

function animate() {
	render()
	// requestAnimationFrame(animate)
}

</script>

<template lang="pug">
div(
  id='container'
)
</template>

<style scope lang="sass">

#container
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  height: 100vh

</style>