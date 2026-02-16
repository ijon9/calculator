let first = "";
let operator = "";
let second = "";
let previous = "";
let previousExp = "";

function operate(f, o, s) {
    if(f === '.') throw "First number is invalid";
    else if(s === '.') throw "Second number is invalid";
    else if(o === "+") {
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
        previousExp = '';
        displayInfo(first + operator + second);
        displayPreviousExp(previousExp);
    }
    // ===================== Key pressed is equal =====================
    else if(key === "=") {
        // Only compute result if all slots are chosen
        if(first !== '' && operator !== '' && second !=='') {
            try {
                previous = '' + operate(first, operator, second);
                previousExp = first + operator + second;
                first = operator = second = '';
                displayInfo(previous);
                displayPreviousExp(previousExp);
            } catch (error) { // Divide by zero or not a number
                displayInfo(error);
                first = operator = second = previous = previousExp = '';
            }
        }
    }
    // ===================== Key pressed is clear =====================
    else if(key === "clear") {
        first = second = operator = previous = previousExp = "";
        displayInfo('');
        displayPreviousExp('');
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
    // ===================== Key pressed is '.' =====================
    else if(key === '.') {
        if(operator === '') {
            if(!first.includes('.')) first += '.';
        }
        else {
            if(!second.includes('.')) second += '.';
        }
        displayInfo(first + operator + second);
    }
    // ===================== Key pressed is negate =====================
    else if(key === 'negate') {
        if(previous != '') {
            first = previous;
            previous = '';
        }
        if(second !== '') {
            if(second.charAt(0) === '-') second = second.substring(1);
            else second = '-' + second;
        }
        else if(first !== '') {
            if(first.charAt(0) === '-') first = first.substring(1);
            else first = '-' + first;
        }
        displayInfo(first + operator + second);
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
                previousExp = first + operator + second;
                displayPreviousExp(previousExp);
                first = '' + operate(first, operator, second);
                second = '';
                operator = key;
                displayInfo(first + operator + second);
            } catch(error) { // Divide by zero or not a number
                displayInfo(error);
                first = operator = second = previous = previousExp = '';
            }
        }
        // No first or second but there was a previous result
        else if(previous !== '') {
            first = previous;
            operator = key;
            displayInfo(first + operator + second);
        }
        previousExp = '';
        displayPreviousExp('');
    }
}

function displayInfo(str) {
    const d = document.querySelector("#display");
    d.textContent = str;
}

function displayPreviousExp(str) {
    const d = document.querySelector("#prevExpression");
    d.textContent = str;
}