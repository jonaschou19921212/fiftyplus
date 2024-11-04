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

let shapes = []
let shapesNum = 120
let maxSize

const palette = ["#05B9F6", "#7FD8E9", "#65CBC4", "#3EB6C2", "#F8BCB0", "#ECCCB1"]

let sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(width.value, height.value)
    p5.frameRate(30)
    // p5.background("#E7ECF2")
    p5.angleMode(p5.DEGREES)
    p5.noStroke()
    maxSize = p5.max(width.value, height.value) * 0.6;
    const cs = p5.min(width.value, height.value) * 0.95;
    for (let i = 0; i < shapesNum; i++) {
      shapes.push(new Shape())
    }
    // p5.background("#26468E")
  }
  p5.draw = () => {
    p5.background("#0047BB33")
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].move()
      shapes[i].display()
    }
  }
  class Shape {
    constructor() {
      this.r = p5.random(maxSize);
      this.t = p5.random(-360, 360);
      this.x = 0;
      this.y = 0;
      this.d = p5.random(5, 20);
      this.speed = p5.random(5, 10);
      this.c = p5.color(p5.random(palette));
    }

    move() {
      this.x = this.r * p5.cos(this.t) + width.value/2;
      this.y = this.r * p5.sin(this.t) + height.value/2;

      this.r += this.speed;
      // this.t += 0.3;
      if(this.r > maxSize) {
        this.r = 0;
      }
    }

    display() {
      p5.fill(this.c)
      p5.circle(this.x, this.y, this.d)
    }
  }
}


onMounted(()=>{
  let canvas = new p5(sketch, document.getElementById('container'))
  watch(vh, (newValue, oldValue) => {
    (newValue < 300)? canvas.loop() : canvas.noLoop()
  })
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