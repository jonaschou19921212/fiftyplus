<script setup>
import { ref, watch } from 'vue/dist/vue.esm-bundler.js'
import {
  Vue3Lottie
} from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import {
  useElementVisibility
} from '@vueuse/core'

const props = defineProps({
  src: String,
  autoPlay: Boolean || false
})
const lottieElement = ref(null)
watch(useElementVisibility(lottieElement), (val, oldVal) => {
  try {
    if (val) {
      lottieElement.value.play()
    } else {
      lottieElement.value.stop()
    }
  } catch (error) {
    // console.error(error)
  }
})
</script>

<template lang="pug">

vue3-lottie(
  ref='lottieElement'
  :animation-link='props.src'
  :width='"100%"'
  :height='"100%"'
  :auto-play='props.autoPlay'
  :loop='false'
)

</template>

<style scope lang="sass">

</style>