<script setup>
import { ref, watch } from 'vue/dist/vue.esm-bundler.js'
import {
  useElementVisibility
} from '@vueuse/core'

const props = defineProps({
  src: String,
})
const videoElement = ref(null)
watch(useElementVisibility(videoElement), (val, oldVal) => {
  try {
    if (val) {
      videoElement.value.play()
    } else {
      videoElement.value.stop()
    }
  } catch (error) {
    // console.error(error)
  }
})
</script>

<template lang="pug">

video(
  ref='videoElement'
  autoplay
  muted
  playsinline
  :src='props.src'
)

</template>

<style scope lang="sass">

</style>