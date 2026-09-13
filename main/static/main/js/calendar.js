const dateInput = document.querySelector("#appointment-date");
const dateNextBtn = document.querySelector("#date-next-btn");
const timeContainer = document.querySelector('.time-slots-container')
const backBtn = document.querySelector('#date-back-btn')
dateNextBtn.style.display = "none";
timeContainer.style.display = "none"

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 31);

backBtn.addEventListener("click", () => {
    calendar.clear()
})

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

    onReady: function() {
        const yearInput = document.querySelector(
            ".flatpickr-current-month .cur-year"
        );

        if (yearInput) {
            yearInput.setAttribute("readonly", true);
        }
    },

    onChange: function(selectedDates, dateStr) {
        if (selectedDates.length > 0) {
            dateNextBtn.style.display = "flex";
            timeContainer.style.display = "flex"

        } else {
            dateNextBtn.style.display = "none";
            timeContainer.style.display = "none"
        }
    }
});