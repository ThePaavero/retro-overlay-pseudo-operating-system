// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

document.body.requestFullscreen()

// Flicker in.
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const element = document.querySelector('pre')

let ticks = 0

const tick = () => {
  ticks++
  
  if (ticks > 10) {
    return
  }
  
  console.log('tick')

  element.style.opacity = 0.4
  setTimeout(() => {
    element.style.opacity = 1
  }, randomBetween(10, 200))
  
  setTimeout(tick, randomBetween(100, 2000))
}

tick()
