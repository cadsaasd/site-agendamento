const categoryBtns = document.querySelectorAll('.category-btn')
const serviceBtns = document.querySelectorAll('.appointment-service-btn')
const steps = document.querySelectorAll('.step')
const allSteps = document.querySelector('.steps')
const nextBtns = document.querySelectorAll('.next-btn')
const backBtns = document.querySelectorAll('.back-btn')
const photoIndicator = document.querySelector('.photo-indicator')
const lastStep = document.querySelector('.last-step')
const lastLine = document.querySelector('.last-line')
const serviceName = document.querySelector('.service-name')
const serviceStep = document.querySelector('.service-step')
const serviceNextBtn = serviceStep ? serviceStep.querySelector('.next-btn') : null

serviceNextBtn.style.display = 'none'



const appointment = createSteps('.appointment-step')

let categoryId

categoryBtns.forEach((button) => {

    button.addEventListener('click', () => {

        categoryId = button.dataset.categoryId

        if (categoryId != 2) {
            if (photoIndicator) photoIndicator.style.display = 'flex'
            if (lastLine) lastLine.style.display = 'flex'
            if (lastStep && lastStep.querySelector('span')) lastStep.querySelector('span').innerText = '4'
        } else {
            if (photoIndicator) photoIndicator.style.display = 'none'
            if (lastLine) lastLine.style.display = 'none'
            if (lastStep && lastStep.querySelector('span')) lastStep.querySelector('span').innerText = '3'
        }

        serviceBtns.forEach((serviceButton) => {

            const serviceCategoryId = serviceButton.dataset.categoryId

            if (serviceCategoryId == categoryId) {
                serviceButton.style.display = 'flex'
            } else {
                serviceButton.style.display = 'none'
            }

        })

        nextStep()
    })

})

serviceBtns.forEach((serviceButton) => {
    serviceButton.addEventListener('click', () => {

        const serviceId = serviceButton.dataset.serviceId
        const name = serviceButton.textContent.trim()
        
        serviceName.textContent = name
        serviceNextBtn.style.display = 'flex'
    })

})

function updateStepIndicator() {

    if (appointment.getCurrentStep() === 0) {
        allSteps.style.display = 'none'
    } else {
        allSteps.style.display = 'flex'
    }

    steps.forEach((indicatorStep) => {

        const indicatorStepNumber = Number(indicatorStep.dataset.step)

        if (indicatorStepNumber <= appointment.getCurrentStep()) {
            indicatorStep.classList.add('active')
        } else {
            indicatorStep.classList.remove('active')
        }

    })

}

function backStep() {
    serviceNextBtn.style.display = 'none'
    if (categoryId === "2" && appointment.getCurrentStep() === 4) {
        appointment.goTo(2)
    } else {
        appointment.back()
    }

    updateStepIndicator()
}

function nextStep() {   
    if (categoryId === "2" && appointment.getCurrentStep() === 2) {
        appointment.goTo(4)
    } else {
        appointment.next()
    }

    updateStepIndicator()
}

backBtns.forEach((button) => {

    button.addEventListener('click', () => {
        backStep()
    })

})

nextBtns.forEach((button) => {

    button.addEventListener('click', () => {
        nextStep()
    })

})