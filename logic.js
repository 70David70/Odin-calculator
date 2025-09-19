// program logic:
/*
    create an object{
        array of input numbers and operators
        mode //number, negative, decimal
    }

    event listener for all buttons
        if the button was a number or an operator
            store it in the array
            update the screen

        else, check which button
            execute it's function
            update the screen


    create sum function
        using reduce on the array
            let float(sum) = 0;
            if the x is a number; sum * 10 + number
            else if x is . ; sum = sum

*/

let input = {
    chunk: "",
    decimal: false,
    mode: "positive", //positive, negative
};
let toCalculate = [];

let calculatorScreen = document.querySelector("#calculator-screen");
let buttons = document.querySelector("#calculator-buttons");

buttons.addEventListener("click", (e)=> {
    if (e.target.textContent >= 0 || e.target.textContent == "." && input.decimal == false) {
        if (e.target.textContent >= 0) {
            input.chunk += e.target.textContent
            //updateScreen
        }
        else if(input.chunk == "" && e.target.textContent == ".") {
            input.chunk = "0.";
            input.decimal = true;
            //updateScreen
        }
        else {
            input.chunk += "."
            input.decimal = true;
            //updateScreen
        }
        
    }
})