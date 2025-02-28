import { updateInfoHandler } from "./updateInfo.js";
let findBtn = document.getElementById('find-btn');
let findInput = document.getElementById('find-input');

findBtn.addEventListener('click', () => {
    if (!findInput.value.trim()) {
        alert('Input is empty');
    }
    else updateInfoHandler({ 'q': findInput.value });
});

// get weather by id and display information on first run
window.addEventListener('DOMContentLoaded', () => {
    updateInfoHandler();
});
