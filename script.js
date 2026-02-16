let first = "";
let operator = "";
let second = "";
let previous = "";

function operate(f, o, s) {
    if(o === "+") {
        const res = +f + +s;
        return Number(res.toFixed(5));
    }
    else if(o === "-") {
        const res = +f - +s;
        return Number(res.toFixed(5));
    }
    else if(o === "x") {
        const res = +f * +s;
        return Number(res.toFixed(5));
    }
    else if(o === "÷") {
        if(s === '0') throw "Divide by zero";
        const res = +f / +s;
        return Number(res.toFixed(5));
    }
    else return "";
}

function keyPress(key) {
    // ===================== Key pressed is a number =====================
    if(typeof(key) === "number") {
        // If first number is not chosen
        if(operator === "") {
            first += key;
            previous = '';
        }
        else second += key;
        displayInfo(first + operator + second);
    }
    // ===================== Key pressed is equal =====================
    else if(key === "=") {
        // Only compute result if all slots are chosen
        if(first !== '' && operator !== '' && second !=='') {
            try {
                previous = '' + operate(first, operator, second);
                first = operator = second = '';
                displayInfo(previous);
            } catch (error) { // Divide by zero
                displayInfo(error);
                first = operator = second = previous = '';
            }
        }
    }
    // ===================== Key pressed is clear =====================
    else if(key === "clear") {
        first = second = operator = previous = "";
        displayInfo('');
    }
    // ===================== Key pressed is delete =====================
    else if(key === "delete") {
        if(second !== '') {
            second = second.substring(0, second.length-1);
            displayInfo(first + operator + second);
        }
        else if(operator !== '') {
            operator = '';
            displayInfo(first + operator + second);
        }
        else if(first !== '') {
            first = first.substring(0, first.length-1);
            displayInfo(first + operator + second);
        }
    }
    // ===================== Key pressed is operator =====================
    else {
        // First has a number but second doesn't
        if(first !== '' && second === '') {
            operator = key;
            displayInfo(first + operator + second);
        }
        // Both first, operator and second are chosen
        else if(first !== '' && second !== '') {
            try {
                first = '' + operate(first, operator, second);
                second = '';
                operator = key;
                displayInfo(first + operator + second);
            } catch(error) { // Divide by zero
                displayInfo(error);
                first = operator = second = previous = '';
            }
        }
        // No first or second but there was a previous result
        else if(previous !== '') {
            first = previous;
            operator = key;
            displayInfo(first + operator + second);
        }
    }
}

function displayInfo(str) {
    const d = document.querySelector("#display");
    d.textContent = str;
}