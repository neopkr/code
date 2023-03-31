const folderName = document.querySelector('.folder-name');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownMenu.style.display = 'block';

folderName.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

window.addEventListener("resize", function () {
    var windowHeight = window.innerHeight;
    var editorHeight = windowHeight - document.querySelector('.editor-wrapper').getBoundingClientRect().top;
    document.querySelector('#editor').style.height = editorHeight + 'px';
});