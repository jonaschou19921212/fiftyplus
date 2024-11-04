
<script setup>
import { ref, computed, watch } from 'vue/dist/vue.esm-bundler.js'
import { usePlayer } from '@vue-youtube/core'
import { useWindowSize, useMediaQuery } from '@vueuse/core'
import { YoutubeIframe } from '@vue-youtube/component'

// const props = defineProps({
//   vid: String,
// })

// const wrapper = ref(null)
// const { width, height } = useElementSize(wrapper)
const { width, height } = useWindowSize()
const player = ref()
// const videoId = ref('zO1wBiJa0AA')
const videoId = ref("")
const isMobile = useMediaQuery('(max-width: 768px)')
isMobile.value? videoId.value = 'TL52JFouGSo' : videoId.value = 'TL52JFouGSo'

const { onReady } = usePlayer(videoId, player, {
  cookie: false,
  playerVars: {
    rel: 0,
    loop: 1,
    vq: 'highres',
    playsinline: 1,
    controls: 0,
    playlist: videoId.value,
    mute: 1,
    autoplay: 1
  },
})

watch(() => isMobile.value, (newValue, oldValue) => {
  newValue? videoId.value = 'x8jfHMKwysk' : videoId.value = 'x8jfHMKwysk'
})

watch(() => width.value, (newValue, oldValue) => {
  return youtubeWidth.value, youtubeHeight.value
})


onReady((event) => {
  event.target.playVideo()
})

const youtubeWidth = computed( () => {
  if ((width.value / height.value) > 16 / 9) {
    return width.value
  } else {
    return height.value / 9 * 16
  }
})

const youtubeHeight = computed(() => {
  if ((width.value / height.value) > 16 / 9) {
    return (width.value) / 16 * 9
  } else {
    return height.value
  }
})

// console.log(youtubeWidth)

</script>

<template lang='pug'>
.youtube--wrapper(
  ref="wrapper"
)
  .youtube--playback(
    ref="player"
    :style='{ width: youtubeWidth + "px", height: youtubeHeight + "px" }'
  )
    youtube-iframe(
      video-id="videoId"
    )
</template>

<style lang="sass">
.youtube--wrapper
  &
    pointer-events: none
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
  .youtube--playback
    position: absolute
    top: 50%
    left: 50%
    width: 100%
    transform: translate(-50%, -50%)
    aspect-ratio: 16/9
</style>
