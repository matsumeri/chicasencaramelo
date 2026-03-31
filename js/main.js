document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('lmpForm')
  const lmpInput = document.getElementById('lmp')
  const result = document.getElementById('result')

  form.addEventListener('submit', e=>{
    e.preventDefault()
    const lmpValue = lmpInput.value
    if(!lmpValue){ result.textContent = 'Por favor ingresa una fecha válida.'; return }

    const lmpDate = new Date(lmpValue + 'T00:00:00')
    const today = new Date()
    if(lmpDate > today){ result.textContent = 'La fecha no puede ser en el futuro.'; return }

    const diffMs = today - lmpDate
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(diffDays / 7)
    const days = diffDays % 7

    // Fecha probable de parto: LMP + 280 días
    const due = new Date(lmpDate)
    due.setDate(due.getDate() + 280)

    const dueStr = due.toLocaleDateString()
    result.innerHTML = `Hace <strong>${weeks}</strong> semanas y <strong>${days}</strong> días. Fecha probable de parto: <strong>${dueStr}</strong>.`
  })

  // Modal functionality
  const modal = document.getElementById('modal')
  const modalImg = document.getElementById('modal-img')
  const closeBtn = document.getElementsByClassName('close')[0]
  const testimonialsViewport = document.querySelector('.testimonials-viewport')
  const testimonialsTrack = document.querySelector('.testimonials-track')
  const carouselButtons = document.querySelectorAll('.carousel-btn')

  const updateCarouselButtons = () => {
    if (!testimonialsViewport || !testimonialsTrack || carouselButtons.length === 0) return

    const maxScroll = testimonialsTrack.scrollWidth - testimonialsViewport.clientWidth
    const currentScroll = testimonialsViewport.scrollLeft

    carouselButtons.forEach(button => {
      if (button.dataset.direction === 'prev') {
        button.disabled = currentScroll <= 4
      } else {
        button.disabled = currentScroll >= maxScroll - 4
      }
    })
  }

  const scrollTestimonials = direction => {
    if (!testimonialsViewport || !testimonialsTrack) return

    const firstItem = testimonialsTrack.querySelector('.modal-img')
    const gap = 12
    const step = firstItem ? firstItem.clientWidth + gap : testimonialsViewport.clientWidth * 0.8
    const offset = direction === 'next' ? step * 2 : -step * 2

    testimonialsViewport.scrollBy({ left: offset, behavior: 'smooth' })
  }

  document.querySelectorAll('.modal-img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block'
      modalImg.src = img.dataset.full || img.src
    })
  })

  carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
      scrollTestimonials(button.dataset.direction)
    })
  })

  if (testimonialsViewport) {
    testimonialsViewport.addEventListener('scroll', updateCarouselButtons)
    window.addEventListener('resize', updateCarouselButtons)
    updateCarouselButtons()
  }

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  })
})