import h from 'hyperscript'
import lozad from 'lozad'
import { fetchPopular, fetchHighestRated, fetchTrending } from './api'
import CarouselItem from './CarouselItem'
import { modalLlistener } from './modal/'

const SectionTitle = title => h('h3.carousel__title', title)

const Carousel = ({ itemsList = [] }) =>
  h(
    'section.carousel',
    h(
      'div.carousel__container',
      itemsList.map(
        ({
          attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
        }) =>
          CarouselItem({
            imageUrl: posterImage.medium,
            title: titles.en,
            subtitle: titles.ja_jp,
            slug,
            youtubeVideoId,
            startDate,
          })
      )
    )
  )

!(async function(document) {
  const mountReference = document.querySelector('.main').lastElementChild

  if (!mountReference) {
    return 0
  }

  const trending = await fetchTrending()
  const popular = await fetchPopular()
  const highestRated = await fetchHighestRated()

  mountReference
    .insertAdjacentElement('afterend', SectionTitle('Trending Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: trending,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Highest Rated Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: highestRated,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Most Popular Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: popular,
      })
    )

  // Add lazy loading
  const carouselImages = document.querySelectorAll('.carousel-item__img')
  const observer = lozad(carouselImages)
  observer.observe()

  document.body.addEventListener('click', event => {
    const tagName = event.target.tagName

    if (['IMG', 'A'].includes(tagName)) {
      modalLlistener(event)
    }
  })
})(document, window)
