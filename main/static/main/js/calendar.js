const dateInput = document.querySelector("#appointment-date")
const dateNextBtn = document.querySelector("#date-next-btn")
const timeContainer = document.querySelector('.time-slots-container')
const backBtn = document.querySelector('#date-back-btn')
let selectedDate = null

dateNextBtn.style.display = "none"
timeContainer.style.display = "none"

export function getFormattedSelectedDate() {
    if (!selectedDate) return ''

    const d = selectedDate.getDate().toString().padStart(2, '0')
    const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0')
    const y = selectedDate.getFullYear()

    return `${d}/${m}/${y}`
}

function setDateNextVisible(visible) {
    if (!dateNextBtn) return

    const isShown = dateNextBtn.style.display === 'flex'

    if (isShown === visible) return

    const firstRect = backBtn.getBoundingClientRect()

    dateNextBtn.style.display = visible ? 'flex' : 'none'

    void backBtn.offsetWidth

    const lastRect = backBtn.getBoundingClientRect()
    const deltaX = firstRect.left - lastRect.left

    backBtn.style.transition = 'none'
    backBtn.style.transform = `translateX(${deltaX}px)`

    requestAnimationFrame(() => {
        backBtn.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
        backBtn.style.transform = ''

        backBtn.addEventListener('transitionend', function onEnd() {
            backBtn.removeEventListener('transitionend', onEnd)
            backBtn.style.transition = ''
        })
    })
}

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

const maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 31)

const calendar = flatpickr(dateInput, {
    inline: false,
    locale: "pt",
    minDate: tomorrow,
    maxDate: maxDate,
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    disableMobile: true,
    monthSelectorType: "static",
    yearSelectorType: "static",
    position: "above",

    onReady: function() {
        const yearInput = document.querySelector(
            ".flatpickr-current-month .cur-year"
        )

        if (yearInput) {
            yearInput.setAttribute("readonly", true)
        }
    },

    onChange: function(selectedDates) {
        if (selectedDates.length > 0) {
            setDateNextVisible(true)
            selectedDate = selectedDates[0]
            timeContainer.style.display = "flex"
        } else {
            setDateNextVisible(false)
            timeContainer.style.display = "none"
        }
    }
})

backBtn.addEventListener("click", () => {
    calendar.clear()
})
