import { ref } from 'vue'

export function useFlyToCart() {
  const isFlying = ref(false)
  const flyItem = ref<HTMLImageElement | null>(null)

  function fly(imageSrc: string, fromEl: HTMLElement, toEl: HTMLElement) {
    if (isFlying.value) return
    isFlying.value = true

    const rectFrom = fromEl.getBoundingClientRect()
    const rectTo = toEl.getBoundingClientRect()

    const img = document.createElement('img')
    img.src = imageSrc
    img.style.position = 'fixed'
    img.style.left = rectFrom.left + 'px'
    img.style.top = rectFrom.top + 'px'
    img.style.width = '60px'
    img.style.height = '60px'
    img.style.transition = 'all 800ms ease'
    img.style.zIndex = '9999'

    document.body.appendChild(img)
    flyItem.value = img

    // déclencher l’animation
    requestAnimationFrame(() => {
      img.style.left = rectTo.left + 'px'
      img.style.top = rectTo.top + 'px'
      img.style.transform = 'scale(0.3)'
      img.style.opacity = '0.5'
    })

    // nettoyage après l’animation
    setTimeout(() => {
      if (img.parentNode) img.parentNode.removeChild(img)
      isFlying.value = false
    }, 800)
  }

  return { fly }
}
