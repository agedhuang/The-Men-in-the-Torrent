let infoButton = document.querySelector('.info-button');
let infoContent = document.querySelector('.info-content');

infoButton.addEventListener('click', function() {
  infoContent.classList.toggle('info-content-active');
});