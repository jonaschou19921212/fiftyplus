<script setup>
import p5 from 'p5'
import { computed, onMounted, watch } from 'vue'
import {
  useWindowSize,
  useWindowScroll,
  useBreakpoints
} from '@vueuse/core'

const { x, y } = useWindowScroll()
const { width, height } = useWindowSize()
const vh = computed(() => Math.round(y.value / height.value * 100) )

const breakpoints = useBreakpoints({
  xs: 0,
  sm: 450,
  md: 768,
  lg: 1028,
  xl: 1280,
  xxl: 1440,
  xxxl: 1600
})
const isMobile = breakpoints.smallerOrEqual('sm')

var seed = Math.random() * 15283;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];

let colors = [];
let colors0 = "281914-1a1a1a-202020-242e30".split("-").map((a) => "#" + a);
let colors22 = "070A0D-171F26-4A5259-7B848C-AEB7BF".split("-").map((a) => "#" + a);
let colors23 = "D94389-4D578C-3791A6-3DF2D1-F28080".split("-").map((a) => "#" + a);
let colors21 = "5ECAFF-039DE9".split("-").map((a) => "#" + a);
let colors24 = "F28D35-D96A29-A66641-D9B0A7-F2DAD8".split("-").map((a) => "#" + a);
let colors25 = "F2A7D8-473959-655A8C-9F8FD9-5979D9".split("-").map((a) => "#" + a);
let colors26 = "025951-012623-21BF92-73D9BC-0D0D0D".split("-").map((a) => "#" + a);
let colors7 = "fefefe-fffffb-fafdff-fef9fb-f7fcfe".split("-").map((a) => "#" + a);
let colors8 = "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016".split("-").map((a) => "#" + a);
let colors11 = "025159-3E848C-7AB8BF-C4EEF2-A67458".split("-").map((a) => "#" + a);
let colors12 = "10454F-506266-818274-A3AB78-BDE038".split("-").map((a) => "#" + a);
let colors13 = "D96690-F28DB2-F2C9E0-89C2D9-88E8F2".split("-").map((a) => "#" + a);
let color_setup1, color_setup2;
let color_bg;
let v_planet = []

let sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(width.value, height.value, p5.WEBGL)
    p5.randomSeed(seed);
    // pixelDensity(5);
    color_setup1 = colors7;
    color_setup2 = colors21;
    // color_setup2 = p5.random([colors8, colors22, colors23, colors24, colors25, colors26, colors11, colors12, colors13]);
    color_bg = "#0047BB";
    p5.background(color_bg);
    // num = 50;
    num = p5.int(p5.random(15, 30));
    // num = 8
    isMobile ? mySize = p5.max(width.value, height.value) : mySize = p5.min(width.value, height.value)
    radius = mySize * 0.9;
    for (let a = 0; a < p5.TAU; a += p5.TAU / num) {
      sizes.push(p5.random(0.1, 0.5))
    }
    t = 0;
  }
  p5.draw = () => {
    // console.log('draw')
    p5.randomSeed(seed);
    p5.background(color_bg);

    for (let i = 0; i < num; i++) {
      let a = (p5.TAU / num) * i;
      let x = radius * p5.sin(a + t) / p5.random(5, 3) / 1.0;
      let y = radius * p5.cos(a + t) / p5.random(3, 5) / 1.0;
      v_planet[i] = p5.createVector(x, y);
    }

    p5.push()

    for (let q = 0; q < 1 / 5; q += 2 * p5.random(0.01, 0.02)) {
      for (let j = 0; j < 2; j++) {
        let n = p5.noise(q*t, j*t,p5.frameCount*0.01)
        p5.rotateX(p5.random(p5.TAU) + t / 10*j + q / p5.random(75, 100) / 10)
        p5.rotateY(p5.random(p5.PI) - t / 10*j - q / p5.random(75, 100) / 10)
        p5.rotateZ(p5.random(p5.PI / 2) - t / 10*j + q / p5.random(75, 100) / 10)
        p5.noFill()
        p5.strokeWeight(n * 5.5 * p5.random(0.2, 0.6))
        p5.stroke(p5.random(color_setup2))

        for (let i = 0; i < num; i += 1) {
          let d = p5.random(radius / 128, radius / 64) / 0.1;
          let x_plus = p5.random(-100, 100) *n + 0.25 * p5.random(-d, d) / 1;
          let y_plus = p5.random(-100, 100) *n + 0.25 * p5.random(-d, d) / 1;
          let z_plus = p5.random(-100, 100) *n + 0.25 * p5.random(-d, d) / 1;
          p5.line(0,0,0,v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
        }
        // for (let i = 0; i < num; i += 2) {
        //   let d = (1.5 + p5.sin(t)) * p5.random(radius / 2, radius / 4);
        //   let x_plus = 0.5 * p5.random(-d, d) / 1;
        //   let y_plus = 0.5 * p5.random(-d, d) / 1;
        //   let z_plus = 0.5 * p5.random(-d, d) / 1;
        //   p5.stroke(p5.random(color_setup2));
        //   p5.strokeWeight(p5.random(0.1));
        //   p5.noFill();
        //   p5.push();
        //   p5.translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
        //   p5.rotateX(t);
        //   p5.rotateY(t);
        //   p5.rotateZ(t);
        //   p5.torus(p5.random(3), p5.random(1), 6);
        //   p5.pop();
        // }
      }
    }
    p5.pop()
    t += p5.random(2, 1) * p5.random(0.001, 0.005) / .5
  }
}

onMounted(()=>{
  // let canvas = new p5(sketch, document.getElementById('container'))
  // watch(vh, (newValue, oldValue) => {
  //   (newValue < 200)? canvas.loop() : canvas.noLoop()
  // })
})

</script>

<template lang="pug">

div(
  ref="target"
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