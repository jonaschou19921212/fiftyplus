let App = document.querySelector('#App')


App.addEventListener('change', () => {
  isMenuActive()
})

for (const child of App.children) {
  child.addEventListener('change', (e) => {
    App.dispatchEvent(new Event('change'))
  })
}

document.querySelector('.menu--toggle').addEventListener('click', () => {
  document.getElementById('isMenuActive').checked = !document.getElementById('isMenuActive').checked
  document.getElementById('isMenuActive').dispatchEvent(new Event('change'))
})

const isMenuActive = function (menu) {
  let val = document.getElementById('isMenuActive').checked
  if (val) {
    document.querySelector('.menu--toggle').classList.add('is-active')
    document.querySelector('.drawer').classList.add('is-active')
    document.querySelector('body').style.overflow = 'hidden'
    } else {
    document.querySelector('.menu--toggle').classList.remove('is-active')
    document.querySelector('.drawer').classList.remove('is-active')
    document.querySelector('body').style.overflow = 'auto'
  }
}

let scrollPos = 0;
window.addEventListener('scroll', function () {
  if ((document.body.getBoundingClientRect()).top > scrollPos)
    document.getElementById('isScrollDown').checked = false
  else
    document.getElementById('isScrollDown').checked = true
  scrollPos = (document.body.getBoundingClientRect()).top
})

window.addEventListener('scroll', () => {
  isHeaderScrolled()
  isButtonGoTopScrolled()
})

const isHeaderScrolled = function () {
  const el = document.querySelector('header')
  if (window.scrollY > 180 && !document.getElementById('isScrollDown').checked) {
    el.classList.add('is-active')
  } else {
    el.classList.remove('is-active')
  }
}

const isButtonGoTopScrolled = function () {
  const el = document.querySelector('.button--go-top')
  if (window.scrollY > 180) {
    el.classList.add('is-active')
  } else {
    el.classList.remove('is-active')
  }
}