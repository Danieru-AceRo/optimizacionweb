import { openModal } from './open-modal'

export const modalLlistener = event => {
  event.preventDefault()
  const img = event.target
  const link = img.parentElement

  if (link && link.classList.contains('js-video-link')) {
    openModal(link.dataset.videoid)
  }
}
