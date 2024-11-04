<script setup>
import { ref, computed } from 'vue/dist/vue.esm-bundler.js'
import {
  useMouse,
  useWindowScroll
} from '@vueuse/core'
import { reactiveTransform } from '@vueuse/motion'
import { useStore } from "vuex"

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)
// const isDesktop = breakpoints.greaterOrEqual("md")
const isMobile = breakpoints.smaller("md")

// const smAndLarger = breakpoints.greaterOrEqual('sm') // sm and larger
// const largerThanSm = breakpoints.greater('sm') // only larger than sm
// const lgAndSmaller = breakpoints.smallerOrEqual('lg') // lg and smaller
// const smallerThanLg = breakpoints.smaller('lg') // only smaller than lg

const store = useStore()
const hover = computed(() => store.state.hover)

const {
  x: mx,
  y: my,
  sourceType
} = useMouse()

const {
  x: sx,
  y: sy
} = useWindowScroll()

const mouseTracker = ref(null)
const { state, transform } = reactiveTransform({
  x: 0,
  y: 0
})
const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end
}
setInterval(() => {
  state.x = lerp(state.x, mx.value, .05)
  state.y = lerp(state.y, my.value - sy.value, .05)
  // console.log(state.x, state.y)
}, 1000 / 60)

</script>

<template lang="pug">
//- .state 
//-   dl
//-     dt breakpoint:
//-     dd {{ isDesktop }}
div(
  v-if='!isMobile'
)
  .mouse--tracker(
    ref="mouseTracker"
    :style="{transform}"
    :class='{"is-smaller": hover}'
  )

</template>

<style scope lang="sass">

.mouse--tracker
  &
    position: fixed
    top: 0
    left: 0
    z-index: 9999
    pointer-events: none
    // mix-blend-mode: difference
  &::before
    transform: translate(-50%, -50%)
    width: 800px
    aspect-ratio: 1/1
    display: block
    border-radius: 50%
    // border: 1px solid white
    background: radial-gradient(50% 50% at 50% 50%, rgba(#ffffff, .2) 0%, rgba(#ffffff, 0) 100%)
    content: ""
    transition: .5s width ease
  // &.is-smaller
  //   &::before
  //     width: 30px
    
.state
  &
    position: fixed
    bottom: 0
    left: 0
    z-index: 9999
    background: rgba(#000, .3)
    color: #ffffff
    padding: 12px
    width: 200px
  dl
    &
      display: flex
      flex-wrap: wrap
      margin: 0
      font-size: 12px
      line-height: 15px
    dt
      flex: 0 0 100px
      max-width: 100px
    dd
      flex: 0 0 calc(100% - 100px)
      max-width: calc(100% - 100px)
      margin: 0


</style>