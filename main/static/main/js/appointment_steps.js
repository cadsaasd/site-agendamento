const categoryBtns = document.querySelectorAll('.category-btn')
const serviceBtns = document.querySelectorAll('.appointment-service-btn')
const steps = document.querySelectorAll('.step')
const allSteps = document.querySelector('.steps')
const appointmentSteps = document.querySelectorAll('.appointment-step')
const nextBtns = document.querySelectorAll('.next-btn')
const backBtns = document.querySelectorAll('.back-btn')
const photoIndicator = document.querySelector('.photo-indicator')
const lastStep = document.querySelector('.last-step')
const lastLine = document.querySelector('.last-line')
let categoryId
let currentStep = 0

categoryBtns.forEach((button) => {
button.addEventListener('click', () => {
    categoryId = button.dataset.categoryId 
    if (categoryId == 1){
        photoIndicator.style.display = 'flex'
        lastLine.style.display = 'flex'
        lastStep.querySelector('span').innerText = '4'
    }else{
        photoIndicator.style.display = 'none'
        lastLine.style.display = 'none'
        lastStep.querySelector('span').innerText = '3'
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

function updateStepIndicator(){
    
    if(currentStep === 0){
        allSteps.style.display = 'none'
    }else{
        allSteps.style.display = 'flex'
    }   
    steps.forEach(indicatorStep => {
        const indicatorStepNumber = Number(indicatorStep.dataset.step)
        console.log(currentStep, indicatorStepNumber)
        if(indicatorStepNumber === currentStep){
            indicatorStep.classList.add('active')
        }else{
            indicatorStep.classList.remove('active')
        }
        
    })
}

function showStep(){
    appointmentSteps.forEach(step =>{
        const stepNumber = Number(step.dataset.step)
        if(stepNumber === currentStep){
            step.classList.add('active')
        }else{
            step.classList.remove('active')
        }
    })
}

function backStep(){
    if(categoryId === "2" && currentStep === 4){
        currentStep = 2
    }else{
        currentStep--
    }
    showStep()
    updateStepIndicator()
}

function nextStep(){
    if(categoryId === "2" && currentStep === 2){
        currentStep = 4
    }else{
        currentStep++
    }

    console.log('DEPOIS:', currentStep)
    showStep()
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




