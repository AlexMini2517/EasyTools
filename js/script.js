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
    const changeStringResult = document.getElementById("changeStringResult");

    // clear the content and the classes of the result div
    clearResultElement(changeStringResult);

    // check if the input text area is empty
    if (!inputTextArea.value) {
        addClassesToResultElement(changeStringResult, "danger");
        changeStringResult.innerHTML = "Please enter a string.";
        return;
    }

    // check if a radio button is selected
    if (!changeStringRadio[0].checked && !changeStringRadio[1].checked) {
        addClassesToResultElement(changeStringResult, "danger");
        changeStringResult.innerHTML = "Please select an option.";
        return;
    }

    // change the string
    if (changeStringRadio[0].checked) {
        addClassesToResultElement(changeStringResult, "success");
        changeStringResult.textContent = inputTextArea.value.toLowerCase();
    } else {
        addClassesToResultElement(changeStringResult, "success");
        changeStringResult.textContent = inputTextArea.value.toUpperCase();
    }

}

function compareStrings() {
    const comparedString1 = document.getElementById("comparedString1");
    const comparedString2 = document.getElementById("comparedString2");
    const compareStringResult = document.getElementById("compareStringResult");

    // clear the content and the classes of the result div
    clearResultElement(compareStringResult);

    // check if the input text areas are empty
    if (!comparedString1.value || !comparedString2.value) {
        addClassesToResultElement(compareStringResult, "danger");
        compareStringResult.innerHTML = "Please enter both strings.";
        return;
    }

    // compare the strings
    if (comparedString1.value === comparedString2.value) {
        addClassesToResultElement(compareStringResult, "success");
        compareStringResult.textContent = "The strings are equal.";
    } else {
        addClassesToResultElement(compareStringResult, "danger");
        compareStringResult.textContent = "The strings are not equal.";
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

function checkFileHash() {
    const inputFile1 = document.getElementById("inputFile1").files[0];
    const inputFile2 = document.getElementById("inputFile2").files[0];
    const fileHashResult = document.getElementById("fileHashResult");

    // clear the content and the classes of the result div
    clearResultElement(fileHashResult);

    // check if the files are uploaded
    if (!inputFile1 || !inputFile2) {
        addClassesToResultElement(fileHashResult, "danger");
        fileHashResult.innerHTML = "Please upload both files.";
        return;
    }

    // read the contents of the files
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader1.onload = () => {
        const fileContent1 = reader1.result;
        const fileHash1 = CryptoJS.createHash("sha256")
            .update(fileContent1, "utf8")
            .digest("hex");
        console.log("File 1 hash: ${fileHash1}");
    };
    reader2.onload = () => {
        const fileContent2 = reader2.result;
        const fileHash2 = CryptoJS.createHash("sha256")
            .update(fileContent2, "utf8")
            .digest("hex");
        console.log("File 2 hash: ${fileHash2}");
    };
    reader1.readAsArrayBuffer(inputFile1);
    reader2.readAsArrayBuffer(inputFile2);

    // compare the hashes
    if (fileHash1 === fileHash2) {
        fileHashResult.classList.add("alert", "alert-success", "mt-3");
        fileHashResult.innerHTML = "The files have the same hash.";
    } else {
        fileHashResult.classList.add("alert", "alert-danger", "mt-3");
        fileHashResult.innerHTML = "The files do not have the same hash.";
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
