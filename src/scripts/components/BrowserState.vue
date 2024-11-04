<script setup>
import { computed } from 'vue/dist/vue.esm-bundler.js'
import { useStore } from 'vuex'

const store = useStore()
const device = computed(() => store.state.device)
const isDesktop = computed(() => store.state.isDesktop)
const isTablet = computed(() => store.state.isTablet)
const isMobile = computed(() => store.state.isMobile)
const isScrolled = computed(() => store.state.isScrolled)

const onResize = () => store.dispatch('onResize')
const onScroll = () => store.dispatch('onScroll')

console.log('created')
window.addEventListener('resize', onResize)
onResize()
window.addEventListener('scroll', onScroll)
onScroll()

</script>

<template lang="pug">

.state
  dl
    dt device :
    dd {{ device }}
    dt isDesktop :
    dd {{ isDesktop }}
    dt isTablet :
    dd {{ isTablet }}
    dt isMobile :
    dd {{ isMobile }}
    dt isScrolled :
    dd {{ Math.round(isScrolled * 10) / 10 }}

</template>

<style scope lang="sass">

.state
  &
    position: fixed
    bottom: 0
    left: 0
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