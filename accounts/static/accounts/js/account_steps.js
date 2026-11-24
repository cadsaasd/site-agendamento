document.addEventListener('DOMContentLoaded', () => {
    const account = createSteps('.account-step')
    const steps = document.querySelectorAll('.account-step')
    const mainContent = document.querySelector('.main-content')
    const phoneInput = document.querySelector('#phone')
    const maskedPhoneNumber = document.querySelector('.masked-phone-number')

    function updateMaskedPhoneNumber() {
        const phoneNumber = phoneInput.value.replace(/\D/g, '')
        const visibleBeginning = phoneNumber.slice(0, 2)
        const visibleEnd = phoneNumber.slice(-4)
        const maskedMiddle = '*'.repeat(Math.max(phoneNumber.length - 6, 0))

        maskedPhoneNumber.textContent = `${visibleBeginning}${maskedMiddle}${visibleEnd}`
    }

    function updateVisibility() {
        const currentStep = account.getCurrentStep()

        steps.forEach((step) => {
            step.hidden = Number(step.dataset.step) !== currentStep
        })

        mainContent.classList.remove('step-transition')
        void mainContent.offsetWidth
        mainContent.classList.add('step-transition')
    }

    document.querySelectorAll('.auth-next-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const step = button.closest('.account-step')
            const requiredFields = step.querySelectorAll('[required]')

            if ([...requiredFields].some((field) => !field.reportValidity())) return

            if (Number(step.dataset.step) === 0) updateMaskedPhoneNumber()

            account.next()
            updateVisibility()
        })
    })

    document.querySelectorAll('.account-back-btn').forEach((button) => {
        button.addEventListener('click', () => {
            account.back()
            updateVisibility()
        })
    })
})
