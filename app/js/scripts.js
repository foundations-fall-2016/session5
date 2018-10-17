var popoverWindow = document.querySelector('.betainfo'); // NEW
var betaButton = document.querySelector('.beta');
var popoverCloseButton = document.querySelector('.closer');  // NEW
var shader = document.querySelector('.shader')  // NEW

betaButton.addEventListener('click', showPopover);
popoverCloseButton.addEventListener('click', showPopover);  // NEW
shader.addEventListener('click', showPopover)  // NEW

function showPopover() {
    popoverWindow.classList.toggle('show'); // NEW
    shader.classList.toggle('show')  // NEW
    event.preventDefault();
}


