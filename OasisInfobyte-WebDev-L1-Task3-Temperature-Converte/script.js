function convertTemperature() {

    let input = document.getElementById("temperature").value;
    let temperature = Number(input);
    let unit = document.getElementById("unit").value;

    let celsius;
    let fahrenheit;
    let kelvin;

    let error = document.getElementById("error");

    error.innerHTML = "";

    // Check for empty input
    if (input === "") {
        error.innerHTML = "Please enter the temperature first.";
        return;
    }

    // Check for invalid input
    if (isNaN(temperature)) {
        error.innerHTML = "Please enter a valid number.";
        return;
    }

    // Celsius input
    if (unit === "celsius") {

        if (temperature < -273.15) {
            error.innerHTML = "Temperature cannot be below absolute zero.";
            return;
        }

        celsius = temperature;
        fahrenheit = (temperature * 9 / 5) + 32;
        kelvin = temperature + 273.15;
    }

    // Fahrenheit input
    else if (unit === "fahrenheit") {

        if (temperature < -459.67) {
            error.innerHTML = "Temperature cannot be below absolute zero.";
            return;
        }

        fahrenheit = temperature;
        celsius = (temperature - 32) * 5 / 9;
        kelvin = celsius + 273.15;
    }

    // Kelvin input
    else if (unit === "kelvin") {

        if (temperature < 0) {
            error.innerHTML = "Kelvin cannot be below 0.";
            return;
        }

        kelvin = temperature;
        celsius = temperature - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
    }

    // Display result
    document.getElementById("celsius").innerHTML = celsius.toFixed(2);
    document.getElementById("fahrenheit").innerHTML = fahrenheit.toFixed(2);
    document.getElementById("kelvin").innerHTML = kelvin.toFixed(2);
}