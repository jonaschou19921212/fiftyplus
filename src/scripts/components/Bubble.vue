<script setup>
import { onMounted, defineProps, ref } from 'vue'
import Typewriter from 'typewriter-effect/dist/core'
const props = defineProps({
  saying: String,
  wait: Boolean,
})
const target = ref(null)
onMounted(()=>{
  console.log(props.saying)
  const effect = new Typewriter(target.value, {
    delay: 100,
    cursor: ' '
  })
  if(props.wait){
    effect
      .pauseFor(2000)
      .typeString('...')
      .pauseFor(1000)
      .deleteChars(3)
      .typeString(props.saying)
      .start()
  } else {
    effect
      .typeString(props.saying)
      .start()
  }
})

</script>

<template lang="pug">

.bubble
  .text(
    ref="target"
  )
  
</template>

<style scope lang="sass">
</style>