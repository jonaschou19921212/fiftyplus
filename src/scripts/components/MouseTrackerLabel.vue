


<script setup>
import { ref } from 'vue/dist/vue.esm-bundler.js'
import {
  useMouse,
  useWindowScroll
} from '@vueuse/core'
import { reactiveTransform } from '@vueuse/motion'

const props = defineProps({
  label: String,
})

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
}, 1000 / 60)

</script>

<template lang="pug">
//- .state 
//-   dl
//-     dt breakpoint:
//-     dd {{ isDesktop }}
div
  .mouse--tracker(
    ref="mouseTracker"
    :style="{transform}"
  )
    .label 
      | {{ label }}

</template>

<style scope lang="sass">

.mouse--tracker
  opacity: 0
  transition: opacity .3s ease

.is-active
  .mouse--tracker
    opacity: 1

.mouse--tracker
  &
    position: fixed
    top: 0
    left: 0
    z-index: 9999
    pointer-events: none
  .label
    font-size: 16px
    line-height: 1.4
    padding: 2px 8px 4px
    border: 1px solid #000
    background: white
    border-radius: 4px
    box-shadow: 0 0 4px rgba(#000, .3)
  
    
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