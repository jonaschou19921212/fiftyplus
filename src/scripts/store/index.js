import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      hover: false
    }
  },
  mutations: {
    MOUSE_ENTER(state) {
      state.hover = true
    },
    MOUSE_LEAVE(state) {
      state.hover = false
    }
  }
})