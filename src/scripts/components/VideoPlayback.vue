
<script setup>
import { ref, computed, watch } from 'vue/dist/vue.esm-bundler.js'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 768px)')

</script>

<template lang='pug'>
video.video--fullscreen(
  loop
  muted
  playsinline
  autoplay
)
  source(
    src="/assets/video/cover.mp4"
    type="video/mp4"
  )
</template>

<style lang="sass">
.video--fullscreen
  position: absolute
  top: 50%
  left: 50%
  width: 100%
  height: 100vh
  height: 100dvh
  object-fit: cover
  transform: translate(-50%, -50%)
  // aspect-ratio: 16/9
</style>
