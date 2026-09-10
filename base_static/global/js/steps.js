function createSteps(selector) {
    const stepElements = document.querySelectorAll(selector)
    let currentStep = 0

    function showStep() {
        stepElements.forEach((step) => {
            const stepNumber = Number(step.dataset.step)

            if (stepNumber === currentStep) {
                step.classList.add('active')
            } else {
                step.classList.remove('active')
            }
        })
    }

    function next() {
        currentStep++
        showStep()
    }

    function back() {
        currentStep--
        showStep()
    }

    function goTo(stepNumber) {
        currentStep = stepNumber
        showStep()
    }

    function getCurrentStep() {
        return currentStep
    }

    return {
        next,
        back,
        goTo,
        getCurrentStep
    }
}