function createCopyButton(textToCopy) {
    const copyButton = document.createElement("button");
    copyButton.className = "btn btn-secondary";
    copyButton.id = "copyButton";

    const icon = document.createElement("i");
    icon.className = "bi bi-clipboard";
    icon.id = "themeIcon";

    copyButton.appendChild(icon);

    copyButton.addEventListener('click', async () => {
        await navigator.clipboard.writeText(textToCopy);

        // Cambia l'icona
        icon.className = "bi-clipboard-check-fill"

        // Assicurati che l'icona ritorni all'originale dopo 2 secondi
        setTimeout(() => {
            icon.className = "bi bi-clipboard";
        }, 1000);
    });

    return copyButton;
}

// clears the content and the classes of the result element
function clearResultElement(resultElement) {
    resultElement.innerHTML = "";
    resultElement.className = "";
}

function addClassesToResultElement(resultElement, state) {
    // add classes to the result element
    if (state === "success") {
        resultElement.classList.add("alert", "alert-success", "mt-3");
    } else if (state === "danger") {
        resultElement.classList.add("alert", "alert-danger", "mt-3");
    }
}

// creates a random string with the given length and type
function createRandomString(length, type) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let resultString = "";

    if (type === "password") {
        // concatenate special characters to the characters string
        characters = characters.concat("!§$%&/()=?#,;.:-_");
    }

    for (let i = 0; i < length; i++) {
        resultString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return resultString;
}

function changeString() {
    const inputTextArea = document.getElementById("inputTextArea");
    const changeStringRadio = document.getElementsByName("changeStringRadio");
    const resultElement = document.getElementById("changeStringResult");
    var text;

    // clear the content and the classes of the result div
    clearResultElement(resultElement);

    // check if the input text area is empty
    if (!inputTextArea.value) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.textContent = "Please enter a string.";
        return;
    }

    // check if a radio button is selected
    if (!changeStringRadio[0].checked && !changeStringRadio[1].checked) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.textContent = "Please select an option.";
        return;
    }

    // change the string
    if (changeStringRadio[0].checked) {
        addClassesToResultElement(resultElement, "success");
        text = inputTextArea.value.toLowerCase();
    } else {
        addClassesToResultElement(resultElement, "success");
        text = inputTextArea.value.toUpperCase();
    }

    const copyButton = createCopyButton(text);
    resultElement.appendChild(copyButton);
    resultElement.appendChild(document.createTextNode(" " + text));
}

function compareStrings() {
    const comparedString1 = document.getElementById("comparedString1");
    const comparedString2 = document.getElementById("comparedString2");
    const resultElement = document.getElementById("compareStringResult");

    // clear the content and the classes of the result div
    clearResultElement(resultElement);

    // check if the input text areas are empty
    if (!comparedString1.value || !comparedString2.value) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.textContent = "Please enter both strings.";
        return;
    }

    // compare the strings
    if (comparedString1.value === comparedString2.value) {
        addClassesToResultElement(resultElement, "success");
        resultElement.textContent = "The strings are equal.";
    } else {
        addClassesToResultElement(resultElement, "danger");
        resultElement.textContent = "The strings are not equal.";
    }
}

function createRandom(type) {
    const lengthInput = document.getElementById(type + "Length");
    const resultElement = document.getElementById(type + "Result");

    // clear the result div
    clearResultElement(resultElement);

    // validate input
    if (!lengthInput.value) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.innerHTML = "Please enter a " + type + " length.";
        return;
    }

    if (isNaN(lengthInput.value)) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.innerHTML = "Please enter a valid number for the " + type + " length.";
        return;
    }

    if (lengthInput.value <= 0) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.innerHTML = "Please enter a positive number for the " + type + " length.";
        return;
    }

    if (lengthInput.value > 999) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.innerHTML = "Please enter a number smaller than 1000 for the " + type + " length.";
        return;
    }

    const randomString = createRandomString(lengthInput.value, type === "password" ? "password" : "username");
    const copyButton = createCopyButton(randomString);
    resultElement.appendChild(copyButton);
    resultElement.appendChild(document.createTextNode(" Your " + type + " is: " + randomString));
    addClassesToResultElement(resultElement, "success");
}

// Funzione per calcolare l'hash di un file
async function calculateFileHash(file) {
    if (!file) return null;

    // Leggi il contenuto del file
    const arrayBuffer = await file.arrayBuffer();

    // Calcola l'hash con SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);

    // Converti l'hash in una stringa esadecimale
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Funzione per controllare gli hash dei file
async function checkFileHash() {
    const resultElement = document.getElementById('fileHashResult');
    // Ottieni i file dagli input
    const fileInput1 = document.getElementById('inputFile1');
    const fileInput2 = document.getElementById('inputFile2');

    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];

    if (!file1 || !file2) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.innerText = "Please select two files to compare.";
        return;
    }

    try {
        // Calcola gli hash
        const hash1 = await calculateFileHash(file1);
        const hash2 = await calculateFileHash(file2);

        // Confronta gli hash
        const result = hash1 === hash2 ? "The hashes are equal." : "The hashes are not equal.";
        result === "The hashes are equal." ? addClassesToResultElement(resultElement, "success") : addClassesToResultElement(resultElement, "danger");

        // Mostra il risultato
        resultElement.innerText = `Hash File 1: ${hash1}
            Hash File 2: ${hash2}
            ${result}
        `;
    } catch (error) {
        addClassesToResultElement(resultElement, "danger");
        resultElement.innerText = "An error occurred while calculating the hash.";
    }
}

function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themeBtn");
    const isLightMode = body.getAttribute("data-bs-theme") === "";

    // Set the new theme
    body.setAttribute("data-bs-theme", isLightMode ? "dark" : "");

    // Set the button classes and content based on the theme
    const buttonClass = isLightMode ? "btn btn-light" : "btn btn-dark";
    const iconClass = isLightMode ? "bi bi-lightbulb-fill" : "bi bi-lightbulb-off";
    const buttonText = isLightMode ? " Enable Light Mode" : " Enable Dark Mode";

    // Update button appearance
    button.className = buttonClass;
    button.textContent = ""; // Clear existing content

    // Create and append the icon
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.id = "themeIcon";
    button.appendChild(icon);

    // Create and append the text
    button.appendChild(document.createTextNode(buttonText));
}

function calculateCryptoValue() {
    // Recupera i valori dagli input
    const initialPrice = parseFloat(document.getElementById("cryptoInitialPrice").value);
    const amountSpent = parseFloat(document.getElementById("cryptoAmountSpent").value);
    const currentPrice = parseFloat(document.getElementById("cryptoCurrentPrice").value);

    // Controlla se i valori sono validi
    if (isNaN(initialPrice) || isNaN(amountSpent) || isNaN(currentPrice) || initialPrice <= 0 || amountSpent <= 0 || currentPrice <= 0) {
        document.getElementById("cryptoResult").innerHTML = `<div class="alert alert-danger">Please enter valid numbers.</div>`;
        return;
    }

    // Calcola le unità acquistate e il valore attuale
    const unitsPurchased = amountSpent / initialPrice;
    const { finalValue, profit, multiplier, percentageChange } = calculateInvestment(amountSpent, initialPrice, currentPrice);

    // Mostra il risultato
    document.getElementById("cryptoResult").innerHTML = `
        <div class="alert alert-success">
            You purchased <strong>${unitsPurchased.toFixed(2)}</strong> units.<br>
            Your investment info: from <strong>€${formatCurrency(amountSpent)}</strong> to <strong>€${formatCurrency(finalValue)}</strong>.<br>
            Your profit is <strong>€${formatCurrency(profit)}</strong> (<strong>${percentageChange > 0 ? '+' : ''}${percentageChange}%</strong>) [<strong>${multiplier}x</strong>].
        </div>
    `;

}

function calculateMarketCap() {
    const amountInvested = parseFloat(document.getElementById("marketCapAmountInvested").value);
    const marketCapInitial = parseFloat(document.getElementById("marketCapInitial").value);
    const marketCapCurrent = parseFloat(document.getElementById("marketCapCurrent").value);

    if (isNaN(amountInvested) || isNaN(marketCapInitial) || isNaN(marketCapCurrent) || marketCapInitial <= 0) {
        document.getElementById("marketCapResult").innerHTML = `<div class="alert alert-danger">Please enter valid positive numbers.</div>`;
        return;
    }

    const { finalValue, profit, multiplier, percentageChange } = calculateInvestment(amountInvested, marketCapInitial, marketCapCurrent);

    document.getElementById("marketCapResult").innerHTML = `
        <div class="alert alert-success">
            Your investment info: from <strong>€${formatCurrency(amountInvested)}</strong> to <strong>€${formatCurrency(finalValue)}</strong>.<br>
            Your profit is: <strong>€${formatCurrency(profit)}</strong> (<strong>${percentageChange > 0 ? '+' : ''}${percentageChange}%</strong>) [<strong>${multiplier}x</strong>].
        </div>
    `;

    // toLocaleString('en') -> "1,234,567.89"
    // replace(/,/g, "'") -> "1'234'567.89"
}

function formatCurrency(value) {
    return Number(value.toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }).replace(/,/g, "'");
}

function calculateInvestment(initialAmount, initialValue, currentValue) {
    const growthFactor = currentValue / initialValue;
    const finalValue = initialAmount * growthFactor;
    const profit = finalValue - initialAmount;
    const multiplier = growthFactor.toFixed(2);
    const percentageChange = ((profit / initialAmount) * 100).toFixed(2);
    return { finalValue, profit, multiplier, percentageChange };
}