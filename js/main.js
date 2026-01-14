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

  document.querySelectorAll('.modal-img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block'
      modalImg.src = img.dataset.full
    })
  })

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  })
})