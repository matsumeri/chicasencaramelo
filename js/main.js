// ============ PROTECCIÓN CONTRA ROBO DE CONTENIDO ============

// Desactivar click derecho
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Desactivar F12 y herramientas de desarrollador
document.addEventListener('keydown', (e) => {
  // F12
  if (e.key === 'F12') {
    e.preventDefault();
  }
  // Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }
  // Ctrl+Shift+J (Consola)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
  }
  // Ctrl+Shift+C (Inspect)
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
  }
  // Ctrl+Shift+K (Firefox consola)
  if (e.ctrlKey && e.shiftKey && e.key === 'K') {
    e.preventDefault();
  }
  // Print Screen
  if (e.key === 'PrintScreen') {
    e.preventDefault();
    return false;
  }
  // Shift+Print Screen
  if (e.shiftKey && e.key === 'PrintScreen') {
    e.preventDefault();
    return false;
  }
  // Ctrl+S (Guardar página)
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+S (Guardar como)
  if (e.ctrlKey && e.shiftKey && e.key === 'S') {
    e.preventDefault();
    return false;
  }
  // Ctrl+C (Copiar)
  if (e.ctrlKey && e.key === 'c') {
    e.preventDefault();
    return false;
  }
  // Ctrl+X (Cortar)
  if (e.ctrlKey && e.key === 'x') {
    e.preventDefault();
    return false;
  }
  // Ctrl+A (Seleccionar todo)
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (Ver código fuente)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    return false;
  }
  // Ctrl+F (Buscar)
  if (e.ctrlKey && e.key === 'f') {
    e.preventDefault();
    return false;
  }
  // Ctrl+0 (Resetear zoom)
  if (e.ctrlKey && e.key === '0') {
    e.preventDefault();
    return false;
  }
  // Ctrl+- (Zoom out)
  if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
    e.preventDefault();
    return false;
  }
  // Ctrl++ (Zoom in)
  if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
    e.preventDefault();
    return false;
  }
});

// Bloquear captura en navegadores que lo soportan
document.addEventListener('beforeprint', (e) => e.preventDefault());
window.addEventListener('beforeprint', (e) => e.preventDefault());

// Desactivar selección de texto
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';

// Bloquear drag & drop
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
  return false;
});
document.addEventListener('drag', (e) => {
  e.preventDefault();
  return false;
});
document.addEventListener('drop', (e) => {
  e.preventDefault();
  return false;
});

// Bloquear copia desde el portapapeles
document.addEventListener('copy', (e) => {
  e.preventDefault();
  return false;
});

// Bloquear cortar desde portapapeles
document.addEventListener('cut', (e) => {
  e.preventDefault();
  return false;
});

// Detección de DevTools abiertos (inspección de ventanas anormales)
const devtools = { open: false, orientation: null };
const threshold = 160;

setInterval(() => {
  if (window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold) {
    if (!devtools.open) {
      devtools.open = true;
      console.clear();
      console.warn('🔒 Acceso detectado. Por favor, no intentes acceder a las herramientas de desarrollo.');
    }
  } else {
    devtools.open = false;
  }
}, 500);

// Bloquear inicio de sesión en consola (común en herramientas de scraping)
Object.defineProperty(console, 'log', {
  value: function() {}
});
Object.defineProperty(console, 'warn', {
  value: function(msg) {
    if (msg?.includes?.('🔒')) {
      console.error(msg);
    }
  }
});
Object.defineProperty(console, 'debug', {
  value: function() {}
});

// Deshabilitar guardar imágenes
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

// Bloquear descarga de imágenes por Shift+Click
document.addEventListener('click', (e) => {
  if (e.shiftKey && e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
}, { capture: true });

// Monitoreo anti-bot: detectar acciones sospechosas
let suspiciousActions = 0;
const maxSuspiciousActions = 10;

// Contador de intentos por minuto
const trackEvent = (type) => {
  suspiciousActions++;
  if (suspiciousActions > maxSuspiciousActions) {
    // Log en servidor (si lo tienes disponible)
    console.error('Demasiados intentos. Acceso limitado por medidas de seguridad.');
    // Aquí podrías hacer fetch a un endpoint del servidor
  }
};

// Rastrear intentos de copia
document.addEventListener('copy', () => trackEvent('copy'));
document.addEventListener('cut', () => trackEvent('cut'));

// Resetear contador cada minuto
setInterval(() => {
  suspiciousActions = Math.max(0, suspiciousActions - 2);
}, 60000);

// Bloquear zoom con rueda del ratón
document.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    return false;
  }
}, { passive: false });

// Bloquear zoom táctil (pinch zoom en mobile)
let lastDistance = 0;
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
    return false;
  }
}, { passive: false });

// Protección contra scraping: ofuscar atributos
const hideScrapingMarkers = () => {
  // Remover/ofuscar data attributes sospechosos
  document.querySelectorAll('[data-testid], [data-qa]').forEach(el => {
    el.removeAttribute('data-testid');
    el.removeAttribute('data-qa');
  });
};

setTimeout(hideScrapingMarkers, 100);

// Verificar Si JavaScript está habilitado (fallback en HTML)
document.documentElement.classList.add('js-enabled');

// Protección contra headless browsers y selenium/puppeteer
const isHeadless = () => {
  return /headless/i.test(navigator.userAgent) ||
         navigator.webdriver ||
         window.document.documentElement.getAttribute('webdriver') ||
         !navigator.plugins?.length ||
         !navigator.languages?.length;
};

if (isHeadless()) {
  console.warn('Entorno automatizado detectado. Continuando sin redireccionar.');
}

// Monitoreo de cambios en el DOM (anti-injection)
const observer = new MutationObserver((mutations) => {
  // Si se intenta inyectar scripts maliciosos, restaurar estado
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'SCRIPT' && !node.src?.includes('cdn.jsdelivr.net')) {
          node.remove();
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// ============ FIN DE PROTECCIONES ============

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