function clearResultElement(resultElement) {
    // clear the content and the classes of the result element
    resultElement.innerHTML = "";
    if (resultElement.classList.length > 0) {
        for (let i = 0; i < resultElement.classList.length; i++) {
            resultElement.classList.remove(resultElement.classList[i]);
        }
    }
}

function addClassesToResultElement(resultElement, state) {
    // add classes to the result element
    if (state === "success") {
        resultElement.classList.add("alert", "alert-success", "mt-3");
    } else if (state === "danger") {
        resultElement.classList.add("alert", "alert-danger", "mt-3");
    }
}

function changeString() {
    const inputTextArea = document.getElementById("inputTextArea");
    const changeStringResult = document.getElementById("changeStringResult");

    // clear the content and the classes of the result div
    clearResultElement(changeStringResult);

    // check if the input text area is empty
    if (!inputTextArea.value) {
        addClassesToResultElement(changeStringResult, "danger");
        changeStringResult.innerHTML = "Please enter a string.";
        return;
    }

    // check if lowercase or uppercase is selected in the btnradiolu radio group
    const btnradiolu = document.getElementsByName("btnradiolu");
    if (!btnradiolu[0].checked && !btnradiolu[1].checked) {
        addClassesToResultElement(changeStringResult, "danger");
        changeStringResult.innerHTML = "Please select lowercase or uppercase.";
        return;
    }

    // edit the string
    addClassesToResultElement(changeStringResult, "success");
    if (btnradiolu[0].checked) {
        changeStringResult.innerHTML = inputTextArea.value.toLowerCase();
    } else if (btnradiolu[1].checked) {
        changeStringResult.innerHTML = inputTextArea.value.toUpperCase();
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