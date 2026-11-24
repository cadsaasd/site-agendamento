
function createSteps(selector) {
    const stepElements = document.querySelectorAll(selector)
    let currentStep = 0

    function showStep() {
        stepElements.forEach((step) => {
            const isCurrentStep = Number(step.dataset.step) === currentStep

            step.classList.toggle('active', isCurrentStep)
            step.hidden = !isCurrentStep
        })
    }

    function next() {
        if (currentStep < stepElements.length - 1) {
            currentStep++
            showStep()
        }
    }

    function back() {
        if (currentStep > 0) {
            currentStep--
            showStep()
        }
    }

    function goTo(stepNumber) {
        if (
            Number.isInteger(stepNumber) &&
            stepNumber >= 0 &&
            stepNumber < stepElements.length
        ) {
            currentStep = stepNumber
            showStep()
        }
    }

    function getCurrentStep() {
        return currentStep
    }

    showStep()

    return {
        next,
        back,
        goTo,
        getCurrentStep
    }
}
