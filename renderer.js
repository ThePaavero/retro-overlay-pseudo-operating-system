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
let tickLimit = 30
let initialStrongerStrobingDone = false

const tick = () => {
  ticks++

  if (ticks > tickLimit) {
    ticks = 0
    setTimeout(tick, randomBetween(1000, 5000))
    return
  }

  element.style.opacity = randomBetween(randomBetween(0.4, 0.7), 1)
  setTimeout(() => {
    element.style.opacity = 1
  }, randomBetween(10, 200))

  setTimeout(tick, randomBetween(10, 50))
  initialStrongerStrobingDone = true

}

tick()

// ---------

document.addEventListener('keyup', e => {
  if (e.key === 'Escape') {
    window.close()
  }
})

document.addEventListener('click', e => {
  e.preventDefault()
  // window.close()
  document.body.classList.add('clicked')
  setTimeout(() => {
    document.body.classList.remove('clicked')
  }, randomBetween(20, 60))
})
