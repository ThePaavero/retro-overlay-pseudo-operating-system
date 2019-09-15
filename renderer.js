document.body.requestFullscreen()

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function genRand(min, max, decimalPlaces = 10) {
  var rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min)
  var power = Math.pow(10, decimalPlaces)
  return Math.floor(rand * power) / power
}

const element = document.querySelector('pre')

let ticks = 0
let tickLimit = 30

const tick = (slight) => {
  ticks++

  if (ticks > tickLimit) {
    ticks = 5
    tick(true)
    return
  }

  const minOpacity = slight ? genRand(0.8, 1) : genRand(0, 1)

  element.style.opacity = genRand(minOpacity, 1)
  setTimeout(() => {
    element.style.opacity = 1
  }, genRand(7, 10))

  setTimeout(() => {
    tick(slight)
  }, genRand(10, 50))
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
