import { defineStore } from 'pinia'

const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    const timer = window.setTimeout(() => {
      resolve()
      window.clearTimeout(timer)
    }, ms)
  })
}

export const useCounter = defineStore({
  id: 'counter',
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCount(state): number {
      return state.counter * 2
    },
  },
  actions: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    randomCounter() {
      this.counter = Math.trunc(Math.random() * 100)
    },
    async asyncIncrement() {
      await sleep(1 * 1000)
      this.counter++
    },
  },
})
