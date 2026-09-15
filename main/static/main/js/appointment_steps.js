const categoryBtns = document.querySelectorAll('.category-btn')
const serviceBtns = document.querySelectorAll('.appointment-service-btn')
const steps = document.querySelectorAll('.step')
const allSteps = document.querySelector('.steps')
const nextBtns = document.querySelectorAll('.next-btn')
const backBtns = document.querySelectorAll('.back-btn')
const photoIndicator = document.querySelector('.photo-indicator')
const lastStep = document.querySelector('.last-step')
const lines = document.querySelectorAll('.line')
const lastLine = document.querySelector('.last-line')
const serviceName = document.querySelector('.service-name')
const serviceStep = document.querySelector('.service-step')
const serviceNextBtn = serviceStep ? serviceStep.querySelector('.next-btn') : null

serviceNextBtn.style.display = 'none'

const appointment = createSteps('.appointment-step')
let categoryId

function setServiceNextVisible(visible) {
    if (!serviceNextBtn) return
    const isShown = serviceNextBtn.style.display === 'flex'
    if (isShown === visible) return

    const isServiceStepActive = serviceStep.classList.contains('active')
    const backBtn = serviceStep.querySelector('.back-btn')

    if (!isServiceStepActive || !backBtn) {
        serviceNextBtn.style.display = visible ? 'flex' : 'none'
        return
    }

    const firstRect = backBtn.getBoundingClientRect()
    serviceNextBtn.style.display = visible ? 'flex' : 'none'

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
        setServiceNextVisible(true)
    })
})

function updateStepIndicator() {
    const currentStep = appointment.getCurrentStep()

    if (currentStep === 0) {
        allSteps.style.display = 'none'
    } else {
        allSteps.style.display = 'flex'
    }

    steps.forEach((indicatorStep) => {
        const stepNumber = Number(indicatorStep.dataset.step)
        if (stepNumber <= currentStep) {
            indicatorStep.classList.add('active')
        } else {
            indicatorStep.classList.remove('active')
        }
    })

    lines.forEach((indicatorLine) => {
        const lineNumber = Number(indicatorLine.dataset.step)
        if (lineNumber <= currentStep) {
            indicatorLine.classList.add('active')
        } else {
            indicatorLine.classList.remove('active')
        }
    })
}

function backStep() {
    setServiceNextVisible(false)
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
