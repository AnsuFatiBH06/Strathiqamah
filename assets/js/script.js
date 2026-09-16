const body = document.body;
const darkModeButton = document.querySelector('#themeSwitchButton');

darkModeButton.addEventListener('click', () => {
    body.classList.toggle('darkMode');

    if (body.classList.contains('darkMode')) {
        darkModeButton.innerHTML = 'Light Mode<i class="fa fa-sun-o buttonToggleIcon"></i>';
    } else {
        darkModeButton.innerHTML = 'Dark Mode<i class="fa fa-moon-o buttonToggleIcon"></i>';
    }
});