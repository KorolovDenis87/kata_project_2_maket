import '../scss/style.scss'

// боковое меню

const openButton = document.getElementById('openButton')
const closeButton = document.getElementById('closeButton')
const aside = document.getElementById('myAside')
const overlay = document.getElementById('overlay')

function openAside() {
  if (!aside || !overlay) return

  aside.classList.add('aside-menu--opened')
  overlay.classList.add('overlay--active')
}

function closeAside() {
  if (!aside || !overlay) return

  aside.classList.remove('aside-menu--opened')
  overlay.classList.remove('overlay--active')
}

if (openButton) {
  openButton.addEventListener('click', () => {
    if (window.innerWidth < 1120) {
      openAside()
    }
  })
}

if (closeButton) {
  closeButton.addEventListener('click', () => {
    if (window.innerWidth < 1120) {
      closeAside()
    }
  })
}

if (overlay) {
  overlay.addEventListener('click', () => {
    if (window.innerWidth < 1120) {
      closeAside()
    }
  })
}

if (aside && overlay) {
  function checkWindowSize() {
    if (window.innerWidth >= 1120) {
      aside.classList.add('aside-menu--opened')
      overlay.classList.remove('overlay--active')
    } else {
      aside.classList.remove('aside-menu--opened')
      overlay.classList.remove('overlay--active')
    }
  }

  checkWindowSize()
  window.addEventListener('resize', checkWindowSize)
}

// свайперы

let brandSwiper = null
let techniqueSwiper = null
let priceSwiper = null

function initOrDestroySwipers() {
  if (window.innerWidth < 768) {
    if (!brandSwiper && document.querySelector('.brand__swiper')) {
      brandSwiper = new Swiper('.brand__swiper', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.brand__pagination',
          clickable: true
        }
      })
    }

    if (!techniqueSwiper && document.querySelector('.technique__swiper')) {
      techniqueSwiper = new Swiper('.technique__swiper', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.technique__pagination',
          clickable: true
        }
      })
    }

    if (!priceSwiper && document.querySelector('.price__swiper')) {
      priceSwiper = new Swiper('.price__swiper', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.price__pagination',
          clickable: true
        }
      })
    }
  } else {
    if (brandSwiper) {
      brandSwiper.destroy(true, true)
      brandSwiper = null
    }

    if (techniqueSwiper) {
      techniqueSwiper.destroy(true, true)
      techniqueSwiper = null
    }

    if (priceSwiper) {
      priceSwiper.destroy(true, true)
      priceSwiper = null
    }
  }
}

initOrDestroySwipers()
window.addEventListener('resize', initOrDestroySwipers)

// Показать / скрыть brand

const toggleButton = document.querySelector('.brand__show-hide')
const hiddenCards = document.querySelectorAll('.brand__card--hidden')

let isExpanded = false

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    isExpanded = !isExpanded

    if (isExpanded) {
      hiddenCards.forEach((card) => {
        card.style.display = 'flex'
      })
      toggleButton.textContent = 'Скрыть'
      toggleButton.classList.add('expanded')
    } else {
      hiddenCards.forEach((card) => {
        card.style.display = 'none'
      })
      toggleButton.textContent = 'Показать все'
      toggleButton.classList.remove('expanded')
    }
  })
}

// показать / скрыть technique

const techniqueButton = document.querySelector('.technique__show-hide')
const hiddenTechniqueCards = document.querySelectorAll(
  '.technique__card--hidden'
)

let isTechniqueExpanded = false

if (techniqueButton) {
  techniqueButton.addEventListener('click', () => {
    isTechniqueExpanded = !isTechniqueExpanded

    hiddenTechniqueCards.forEach((card) => {
      card.classList.toggle('technique__card--opened', isTechniqueExpanded)
    })

    if (isTechniqueExpanded) {
      techniqueButton.textContent = 'Скрыть'
      techniqueButton.classList.add('expanded')
    } else {
      techniqueButton.textContent = 'Показать все'
      techniqueButton.classList.remove('expanded')
    }
  })
}

// модалка

const modalOverlay = document.getElementById('modalOverlay')
const callModal = document.getElementById('callModal')
const feedbackModal = document.getElementById('feedbackModal')

const callButtons = document.querySelectorAll('[data-modal="call"]')
const feedbackButtons = document.querySelectorAll('[data-modal="feedback"]')
const modalCloseButtons = document.querySelectorAll('.modal__close')

function openModal(modal) {
  if (!modal || !modalOverlay) return

  if (aside) {
    aside.classList.remove('aside-menu--opened')
  }

  if (overlay) {
    overlay.classList.remove('overlay--active')
  }

  modal.classList.add('modal--opened')
  modalOverlay.classList.add('modal-overlay--active')

  document.documentElement.classList.add('page--lock')
  document.body.classList.add('page--lock')
}

function closeModals() {
  if (callModal) {
    callModal.classList.remove('modal--opened')
  }

  if (feedbackModal) {
    feedbackModal.classList.remove('modal--opened')
  }

  if (modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--active')
  }

  if (window.innerWidth >= 1120 && aside) {
    aside.classList.add('aside-menu--opened')
  }

  document.documentElement.classList.remove('page--lock')
  document.body.classList.remove('page--lock')
}

callButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeModals()
    openModal(callModal)
  })
})

feedbackButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeModals()
    openModal(feedbackModal)
  })
})

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', closeModals)
})

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModals)
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModals()
  }
})
