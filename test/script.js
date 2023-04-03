let sidebar = document.querySelector('.sidebar');
let main = document.querySelector('.main');
let dragbar = document.querySelector('.dragbar');
let dragging = false;
let sidebarWidth = sidebar.offsetWidth;

dragbar.addEventListener('mousedown', function(e) {
  e.preventDefault();
  dragging = true;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);
});

function drag(e) {
  if (dragging) {
    let percentage = (e.clientX / window.innerWidth) * 100;
    let width = percentage.toFixed(2);
    sidebar.style.width = width + "%";
    main.style.width = (100 - width) + "%";
  }
}

function stopDragging() {
  dragging = false;
  document.removeEventListener('mousemove', drag);
}
