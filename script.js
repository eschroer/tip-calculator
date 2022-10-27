const billForm = document.querySelector(".bill-form")
const billInput = document.querySelector(".bill-input");
const tipBtns = document.querySelectorAll(".tip-btn");
const customTip = document.querySelector(".custom");
const peopleInput = document.querySelector(".people-input");
const zeroError = document.querySelector(".zero")
const tipAmount = document.querySelector(".tip-amount-total");
const splitBillAmount = document.querySelector(".split-total-amount");
const resetBtn = document.querySelector(".reset-btn")

billForm.addEventListener("input", activateResetBtn)
billInput.addEventListener("input", updateTipAndTotalAmount)
peopleInput.addEventListener("input", updateTipAndTotalAmount)
customTip.addEventListener("input", () => {
    updateTipAndTotalAmount();
    resetActiveClass();
})
zeroError.hidden = true

tipBtns.forEach((btn)=>{
    btn.addEventListener("click", (event)=>{
        event.preventDefault();
        resetActiveClass();
        resetCustomTipValue();
        btn.classList.add("active");
        updateTipAndTotalAmount();
        
    })
})

resetBtn.addEventListener("click", ()=>{
    resetBtn.classList.add("disabled");
    billInput.value = "";
    peopleInput.value = "";
    tipAmount.textContent = "$0.00";
    splitBillAmount.textContent = "$0.00";
    resetActiveClass();
    resetCustomTipValue();
})
peopleInput.addEventListener("change", function(){
    if (peopleInput.value <= 0){
        zeroError.hidden = false;
        peopleInput.style.border = "1px solid red";
    } else {
        peopleInput.style.border = "none";
        zeroError.hidden = true;
    }
})

function resetActiveClass(){
    document.querySelectorAll(".active").forEach((btn)=>{
        btn.classList.remove("active")
    })
}
function resetCustomTipValue(){
    customTip.value = "";
}

function activateResetBtn(){
    resetBtn.classList.remove("disabled")
}

function updateTipAndTotalAmount(){
    let billAmount = parseInt(billInput.value);
    let peopleAmount = parseInt(peopleInput.value);
    let tipInput = 0;
    if (customTip.value === ""){
        tipBtns.forEach((btn)=>{
            if (btn.classList.contains("active")){
                tipInput = parseInt(btn.textContent)
            } 
        })
    } else {
        tipInput = parseInt(customTip.value)
    }
    if (billAmount && peopleAmount){
        let tipDisplay = (billAmount * (tipInput/100)) / peopleAmount
        let splitBillDisplay = (billAmount / peopleAmount) + tipDisplay;
        tipAmount.textContent = `$${tipDisplay.toFixed(2)}`
        splitBillAmount.textContent = `$${splitBillDisplay.toFixed(2)}`
    }
}


