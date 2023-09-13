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

function createUsername() {
    const usernameLength = document.getElementById("usernameLength");
    const usernameResult = document.getElementById("usernameResult");

    // clear the username result div
    clearResultElement(usernameResult);

    // check if the username length input is empty
    if (!usernameLength.value) {
        addClassesToResultElement(usernameResult, "danger");
        usernameResult.innerHTML = "Please enter a username length.";
        return;
    }

    // check if the username length input is a number
    if (isNaN(usernameLength.value)) {
        addClassesToResultElement(usernameResult, "danger");
        usernameResult.innerHTML = "Please enter a valid number.";
        return;
    }

    // check if the username length input is a positive number
    if (usernameLength.value < 0) {
        addClassesToResultElement(usernameResult, "danger");
        usernameResult.innerHTML = "Please enter a positive number.";
        return;
    }

    // check if the username length input is greater than 999
    if (usernameLength.value > 999) {
        addClassesToResultElement(usernameResult, "danger");
        usernameResult.innerHTML = "Please enter a number smaller than 1000.";
        return;
    }

    // create the username
    addClassesToResultElement(usernameResult, "success");
    usernameResult.textContent = "Your username is: " + createRandomString(usernameLength.value);
}

function createPassword() {
    const passwordLength = document.getElementById("passwordLength");
    const passwordResult = document.getElementById("passwordResult");

    // clear the password result div
    clearResultElement(passwordResult);

    // check if the password length input is empty
    if (!passwordLength.value) {
        addClassesToResultElement(passwordResult, "danger");
        passwordResult.innerHTML = "Please enter a password length.";
        return;
    }

    // check if the password length input is a number
    if (isNaN(passwordLength.value)) {
        addClassesToResultElement(passwordResult, "danger");
        passwordResult.innerHTML = "Please enter a valid number.";
        return;
    }

    // check if the password length input is a positive number
    if (passwordLength.value < 0) {
        addClassesToResultElement(passwordResult, "danger");
        passwordResult.innerHTML = "Please enter a positive number.";
        return;
    }

    // check if the password length input is greater than 999
    if (passwordLength.value > 999) {
        addClassesToResultElement(passwordResult, "danger");
        passwordResult.innerHTML = "Please enter a number smaller than 1000.";
        return;
    }

    // create the password
    addClassesToResultElement(passwordResult, "success");
    passwordResult.textContent = "Your password is: " + createRandomString(passwordLength.value, "password");

}

function checkFileHash() {
    const inputFile1 = document.getElementById("inputFile1");
    const inputFile2 = document.getElementById("inputFile2");
    const fileHashResult = document.getElementById("fileHashResult");

    // clear the content and the classes of the result div
    clearResultElement(fileHashResult);

    // check if the files are uploaded
    if (!inputFile1.files[0] || !inputFile2.files[0]) {
        fileHashResult.classList.add("alert", "alert-danger", "mt-3");
        fileHashResult.innerHTML = "Please upload both files.";
        return;
    }

    // calculate the hash of both files
    const inputFile1Hash = CryptoJS.SHA256(inputFile1.files[0]).toString();
    const inputFile2Hash = CryptoJS.SHA256(inputFile2.files[0]).toString();

    // compare the hashes
    if (inputFile1Hash === inputFile2Hash) {
        fileHashResult.classList.add("alert", "alert-success", "mt-3");
        fileHashResult.innerHTML = "The files are identical.";
    } else {
        fileHashResult.classList.add("alert", "alert-danger", "mt-3");
        fileHashResult.innerHTML = "The files are not identical.";
    }
}