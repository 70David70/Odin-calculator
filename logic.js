
let input = {
    chunk: "",
    decimal: false,
    mode: "positive", //positive, negative
    count: 0,
};
let toCalculate = [];


let buttons = document.querySelector("#calculator-buttons");
buttons.addEventListener("click", (e)=> {
    if ((!isNaN(parseInt(e.target.textContent)) || e.target.textContent == "." && input.decimal == false) && input.count != 16) {
        if (e.target.textContent >= 0) {
            input.chunk += e.target.textContent;
            input.count++;
            //updateScreen
            updateScreen()
        }
        else if(input.chunk == "" && e.target.textContent == ".") {
            input.chunk = "0.";
            input.decimal = true;
            input.count++;
            //updateScreen
            updateScreen()
        }
        else {
            input.chunk += "."
            input.decimal = true;
            //updateScreen
            updateScreen()
        }
        
    }

    else if (["+", "-", "X", "/"].includes(e.target.textContent)) {
        if (input.chunk !== "") {
            toCalculate.push(input.chunk);
            input.chunk = "";
            input.decimal = false;
            if (e.target.textContent == "X") {
                toCalculate.push("*");    
            }
            else toCalculate.push(e.target.textContent);
        }
        updateScreen("x")
    }


    else if (e.target.textContent == "DEL") {
        input.chunk = input.chunk.toString().slice(0, -1);
        input.count--;
        updateScreen()
    }
    else if (e.target.textContent == "AC") {
        input.chunk = "";
        input.decimal = false;
        input.mode = "positive";
        toCalculate = [];
        input.count = 0;
        updateScreen()
    }
    else if (e.target.textContent =="-/+") {
        if (input.mode == "positive"){
            input.chunk = "-" + input.chunk;
            input.mode = "negative";
        }
        else {
            input.chunk = input.chunk.slice(1, input.chunk.length);
            input.mode = "positive";
        }
        updateScreen()
    }

    else if (e.target.textContent == "=") {
        if (input.chunk !== "") {
            toCalculate.push(input.chunk);
            input.chunk = "";
            input.decimal = false;
            toCalculate.push(e.target.textContent);
        }
        let result = calculate();
        toCalculate = [];
        input.chunk = result
        updateScreen(result)
    }
})

//to do function updateScreen()
function updateScreen(show = "optional") {
    let history = document.querySelector("#calculator-history")
    let outPut = document.querySelector("#calculator-output")
    
    outPut.textContent = input.chunk || 0;
    history.textContent = toCalculate.join(" ");

}

//to do function calculate()
function calculate() {

    let result = 0
    let process = [...toCalculate];
    length = toCalculate.length;

    for (let i = 0; i < length; i++) {
        if (process[i] == "*") {
            process.splice((i - 1), 3, `${parseFloat(process[i - 1]) * parseFloat(process[i + 1])}`)
            length = process.length
        }
        else if (process[i] == "/") {
            process.splice((i - 1), 3, `${parseFloat(process[i - 1]) / parseFloat(process[i + 1])}`)
            length = process.length
        }
    }
    for (let i = 0; i < length; i++) {
        if (process[i] == "+") {
            process.splice((i - 1), 3, `${parseFloat(process[i - 1]) + parseFloat(process[i + 1])}`)
            length = process.length
        }
        else if (process[i] == "-") {
            process.splice((i - 1), 3, `${parseFloat(process[i - 1]) - parseFloat(process[i + 1])}`)
            length = process.length
        }
    }

    result = parseFloat(process[0]);
    return result;

}