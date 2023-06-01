'use strict'

let cardNum, cardName, cardExp, cardCvc,cardholder,formNum,formDateMM,formDateYY,formCvc,btnCont,btnCof;
// card details (on card image)
cardNum = document.querySelector('#card-num');
cardName = document.querySelector('#card-name');
cardExp = document.querySelector('#card-exp');
cardCvc = document.querySelector('#card-cvc');

//  form inputs
cardholder = document.querySelector('#cardholder-name');
formNum = document.querySelector('#card-form-num');
formDateMM = document.querySelector('#exp-date-mm');
formDateYY = document.querySelector('#exp-date-yy');
formCvc = document.querySelector('#form-cvc');

// buttons
btnCof = document.querySelector('#btn-cof');
btnCont = document.querySelector('#btn-con');

// screens
let main = document.querySelector('.form')
let cardCompleted = document.querySelector('.card-complete')

// warning elements
let cardBlank, cardWFormat, numBlank, numWFormat, dateBlank, dateWFormat, cvcBlank, cvcWFormat;
cardBlank = document.querySelector('#no-name');
cardWFormat = document.querySelector('#no-name-number');

numBlank = document.querySelector('#no-card-number')
numWFormat = document.querySelector('#no-card-letter')

dateBlank = document.querySelector('#no-date')
dateWFormat = document.querySelector('#wrong-date')

cvcBlank = document.querySelector('#no-cvc')
cvcWFormat = document.querySelector('#no-cvc-letter')



// function to check validity 
function checkFormValidity(){
    let nameCorrect = false
    let numCorrect = false
    let dateCorrect = false
    let cvcCorrect = false

    /* the below code is for checking the format of cardHolder name in form */

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if ( cardholder.value.length == 0 ){           // cardholder name must not be empty string
         cardBlank.classList.remove('hidden') 
         cardholder.style.border = '2px solid rgba(255, 0, 0, 0.75)'
         
         // -------------------------------------------   
        } else if ((/\d/.test(cardholder.value))       // checking cardholder name not contains numbers or
        || specialChars.test(cardholder.value) // checking cardholder name not contains special characters or
        )// || cardholder.value.length == 0)       // cardholder name must not be empty string
        {   cardBlank.classList.add('hidden')
        cardWFormat.classList.remove('hidden')
        cardholder.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        // ---------------------------------------------
    } else {
        cardBlank.classList.add('hidden')
        cardWFormat.classList.add('hidden')
        cardholder.style.border = '2px solid hsl(270, 3%, 87%)'
        nameCorrect = true
    }   

     /* the below code is for checking the format of card number in form */

    if( formNum.value.length == 0 ) {              // checking card number must not be empty
        numBlank.classList.remove('hidden')
        formNum.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        // ------------------------------------------------------------------------------------
    } else if (!(formNum.value.length - formNum.value.replace(/\s/g, "").length === 3 ) //checking card number must contain 3 whitespace
    || !(formNum.value.length === 19) // checking card number must be 19 characters long (16 numbers + 3 whitespace)
    || !Boolean(Number(formNum.value.replace(/\s/g, "")))) // card number must not be an letter or special character
    
    {   numBlank.classList.add('hidden')
        formNum.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        numWFormat.classList.remove('hidden')
        // ------------------------------------------------------------------------------------
    }else{
        formNum.style.border = '2px solid hsl(270, 3%, 87%)'
        numBlank.classList.add('hidden')
        numWFormat.classList.add('hidden')
        numCorrect = true
    }


    /* the below code is for checking the format of card expiry date in form */ 
    if (formDateMM.value.length == 0 || formDateYY.value.length == 0){ // year and must input must not be empty
        dateBlank.classList.remove('hidden')
        formDateMM.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        formDateYY.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        
        // ------------------------------------------------ 
    } else if (formDateMM.value < 1 // month must not be less than 1
    || formDateMM.value > 12  // month must not be greater than 12 
    || formDateYY.value < 1  // year must not be less 2023
    || formDateYY.value > 99 // year must not be greater than 2053 (30 years limit)
    || formDateMM.value.length !== 2 // month format must contains only 2 digits (eg: 04 correct, 4 incorrect)
    || formDateYY.value.length !== 2    ){ // year format validity just like above
        dateBlank.classList.add('hidden')
        dateWFormat.classList.remove('hidden')
        formDateMM.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        formDateYY.style.border = '2px solid rgba(255, 0, 0, 0.75)'
        // ------------------------------------------------ 
    }else{
        dateBlank.classList.add('hidden')
        dateWFormat.classList.add('hidden')
        formDateMM.style.border = '2px solid  hsl(270, 3%, 87%)'
        formDateYY.style.border = '2px solid  hsl(270, 3%, 87%)'
        dateCorrect = true
    }
    
    
    if (formCvc.value.length == 0){ // checking form cvc text length is it 0 or not 
        cvcBlank.classList.remove('hidden');
        formCvc.style.border = '2px solid rgba(255, 0, 0, 0.75)'
    } else if (formCvc.value.length > 3  // form cvc must not be more than 3 digits
    || formCvc.value.length < 3 ){ // form cvc must not be less than 3 digits
        cvcBlank.classList.add('hidden');
        cvcWFormat.classList.remove('hidden')
        formCvc.style.border = '2px solid rgba(255, 0, 0, 0.75)'
    } else{
        cvcBlank.classList.add('hidden')
        cvcWFormat.classList.add('hidden')
        formCvc.style.border = '2px solid  hsl(270, 3%, 87%)'
        cvcCorrect = true
    }

    // the 'detailsCorrect' is the boolean which determines is all the form inputs values are correct or not.
    let detailsCorrect = nameCorrect && numCorrect && dateCorrect && cvcCorrect
    return detailsCorrect
}

btnCof.addEventListener('click', function(e){
    e.preventDefault()

    const isDetailsCorrect = checkFormValidity()
    if (isDetailsCorrect){
        cardName.innerHTML = String(cardholder.value)
        cardNum.innerHTML = String(formNum.value)
        cardExp.innerHTML = `${formDateMM.value}/${formDateYY.value}`
        cardCvc.innerHTML = String(formCvc.value)

        cardCompleted.classList.remove('hidden')
        main.classList.add('hidden')
        // console.log(`${formDateMM.value}/${formDateYY}`)
    }
})
