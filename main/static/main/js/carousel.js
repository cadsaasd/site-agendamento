document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel')
    const track = carousel?.querySelector('.track')
    const groups = track?.querySelectorAll('.group')

    if (!carousel || !groups || groups.length !== 2) return

    const [firstGroup, secondGroup] = groups
    const originalCards = [...firstGroup.children]

    if (!originalCards.length) return

    function fillCarousel() {
        while (firstGroup.scrollWidth < carousel.clientWidth) {
            originalCards.forEach((card) => {
                firstGroup.append(card.cloneNode(true))
                secondGroup.append(card.cloneNode(true))
            })
        }
    }

    fillCarousel()
    new ResizeObserver(fillCarousel).observe(carousel)
})
