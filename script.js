let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let historyList = document.getElementById("historyList");
let history = JSON.parse(localStorage.getItem("history")) || [];

buttons.forEach(btn => {
    btn.addEventListener("click", () => handleClick(btn.innerText));
});

function handleClick(value) {

    if (value === "C") {
        display.value = "";
    }
    else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    }
    else if (value === "=") {
        try {
            let result = eval(display.value);
            addToHistory(display.value + " = " + result);
            display.value = result;
        } catch {
            display.value = "Error";
        }
    }
    else {
        display.value += value;
    }
}

function addToHistory(item) {
    history.push(item);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach(h => {
        let li = document.createElement("li");
        li.innerText = h;
        historyList.appendChild(li);
    });
}

renderHistory();

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        display.value += e.key;
    }
    if (e.key === "Enter") {
        handleClick("=");
    }
    if (e.key === "Backspace") {
        handleClick("DEL");
    }
});