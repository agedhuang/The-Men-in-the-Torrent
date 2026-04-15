let infoButton = document.querySelector('.info-button');
let infoContent = document.querySelector('.info-content');

infoButton.addEventListener('click', function() {
  infoContent.classList.toggle('info-content-active');
});

let infoClose = document.querySelector('.info-close');
infoClose.addEventListener('click', function() {
  infoContent.classList.remove('info-content-active');
});