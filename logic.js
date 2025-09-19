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

let buttons = document.querySelector("#calculator-buttons");

buttons.addEventListener("click", (e)=> {
    if (!isNaN(parseInt(e.target.textContent)) || e.target.textContent == "." && input.decimal == false) {
        if (e.target.textContent >= 0) {
            input.chunk += e.target.textContent
            //updateScreen
            updateScreen(e.target.textContent)
        }
        else if(input.chunk == "" && e.target.textContent == ".") {
            input.chunk = "0.";
            input.decimal = true;
            //updateScreen
            updateScreen(e.target.textContent)
        }
        else {
            input.chunk += "."
            input.decimal = true;
            //updateScreen
            updateScreen(e.target.textContent)
        }
        
    }
    //to do event listener for the rest of the buttons
    else if (["+", "-", "X", "/"].includes(e.target.textContent)) {
        if (input.chunk !== "") {
            toCalculate.push(input.chunk);
            input.chunk = "";
            input.decimal = false;
        }
        toCalculate.push(e.target.textContent);
        updateScreen(e.target.textContent)
    }

    else if (e.target.textContent == "DEL") {
        input.chunk.slice(0, -1)
        updateScreen(e.target.textContent)
    }

    else if (e.target.textContent == "AC") {
        input.chunk = "";
        input.decimal = false;
        input.mode = "positive";
        updateScreen(e.target.textContent)
    }
})

//to do function updateScreen()
function updateScreen(pressedButton) {
    let history = document.querySelector("#calculator-history")
    let outPut = document.querySelector("#calculator-output")
    
    outPut.textContent = input.chunk || 0;

    if (["+", "-", "X", "/"].includes(pressedButton)) {
        outPut.textContent = toCalculate.join(" ");
    }
}

//to do function calculate()