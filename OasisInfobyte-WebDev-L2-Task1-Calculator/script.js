const display = document.getElementById("display");

let justCalculated = false;

// Add value to display
function appendValue(value) {
    if (display.value === "Error" || justCalculated) {
        display.value = "";
        justCalculated = false;
    }

    if (value === "*") {
        value = "×";
    }

    if (value === "/") {
        value = "÷";
    }

    if (value === ".") {
        const currentNumber = display.value.split(/[+\-×÷%]/).pop();

        if (currentNumber.includes(".")) {
            return;
        }

        if (currentNumber === "") {
            display.value += "0";
        }

        display.value += ".";
        return;
    }

    if (["+", "-", "×", "÷", "%"].includes(value)) {
        if (display.value === "") {
            if (value === "-") {
                display.value = "-";
            }
            return;
        }

        const lastCharacter = display.value.slice(-1);

        if (["+", "-", "×", "÷", "%"].includes(lastCharacter)) {
            display.value = display.value.slice(0, -1) + value;
            return;
        }
    }

    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
    justCalculated = false;
}

// Delete last character
function deleteLast() {
    if (display.value === "Error") {
        clearDisplay();
        return;
    }

    display.value = display.value.slice(0, -1);
    justCalculated = false;
}

// Calculate result
function calculate() {
    if (display.value === "") {
        return;
    }

    try {
        let expression = display.value;

        expression = expression.replace(/×/g, "*");
        expression = expression.replace(/÷/g, "/");

        const numbers = expression.match(/\d+(\.\d+)?/g);
        const operators = expression.match(/[+\-*/%]/g);

        if (!numbers || !operators || numbers.length !== operators.length + 1) {
            throw new Error();
        }

        let result = Number(numbers[0]);

        for (let i = 0; i < operators.length; i++) {
            const nextNumber = Number(numbers[i + 1]);
            const currentOperator = operators[i];

            if (currentOperator === "+") {
                result += nextNumber;
            } else if (currentOperator === "-") {
                result -= nextNumber;
            } else if (currentOperator === "*") {
                result *= nextNumber;
            } else if (currentOperator === "/") {
                if (nextNumber === 0) {
                    throw new Error();
                }
                result /= nextNumber;
            } else if (currentOperator === "%") {
                if (nextNumber === 0) {
                    throw new Error();
                }
                result %= nextNumber;
            }
        }

        if (!Number.isFinite(result)) {
            throw new Error();
        }

        display.value = Number(result.toFixed(10));
        justCalculated = true;

    } catch {
        display.value = "Error";
        justCalculated = true;
    }
}

// Keyboard support
display.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9.]/.test(key)) {
        event.preventDefault();
        appendValue(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        event.preventDefault();
        appendValue(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
    } else if (key === "Escape" || key === "Delete") {
        event.preventDefault();
        clearDisplay();
    } else {
        event.preventDefault();
    }
});