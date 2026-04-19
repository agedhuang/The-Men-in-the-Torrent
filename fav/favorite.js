// After DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#fav-content');
  
  // 从 LocalStorage 读取收藏数据
  const favorites = JSON.parse(localStorage.getItem('my_favorites')) || [];

  if (favorites.length === 0) {
    container.innerHTML = '<p>You haven\'t added any favorites yet.</p>';
    return;
  }

  // 渲染图片
  const htmlArray = favorites.map(item => {
    return `<div class="image-wrapper" data-id="${item.id}" data-searchable="${item.text ? item.text.toLowerCase() : ''}">
              <img src="${item.src}" alt="${item.text}">
            </div>`;
  });

  container.innerHTML = htmlArray.join('');

  initModal();
  setupModal();
  applySearch(); 
});


// Setting the modal function for image display------------------

const setupModal = () => {
  const dialog = document.querySelector('#modal');
  const modalImg = document.querySelector('#modal-img');
  const modalCaption = document.querySelector('#modal-caption');
  const favBtn = document.querySelector('.fav-btn'); 
  

  document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    const content = wrapper.querySelector('img');

    content.addEventListener('click', () => {
      const currentID = wrapper.dataset.id;
      modalImg.src = content.src;
      modalCaption.innerText = wrapper.dataset.searchable || "";

      // check if the current image is in favorites
      favBtn.dataset.id = currentID;
      //parse funvtion turn the string back to array 
      let favorites = JSON.parse(localStorage.getItem('my_favorites')) || [];
      // function some will run through the array to see if any item matches the condition
      const isFav = favorites.some(item => item.id === currentID);
      favBtn.innerText = isFav ? '❤️' : '🩶';
      
      dialog.showModal();
    });
  });
}

const initModal = () => {
  const dialog = document.querySelector('#modal');
  const closeBtn = document.querySelector('#close-modal');
  const favBtn = document.querySelector('.fav-btn');
  const modalImg = document.querySelector('#modal-img');
  const modalCaption = document.querySelector('#modal-caption');
  //close modal when press close burron
  closeBtn.addEventListener('click', () => {
    dialog.close();
  });
  //close modal when click outside of the modal content
  document.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  favBtn.addEventListener('click', () => {
    const id = favBtn.dataset.id;
    const src = modalImg.src;
    const text = modalCaption.innerText;
    let favorites = JSON.parse(localStorage.getItem('my_favorites')) || [];
    const index = favorites.findIndex(item => item.id === id);

    if (index > -1) {
      favorites.splice(index, 1);
      favBtn.innerText = '🩶';
    } else {
      favorites.push({ id: id, src: src, text: text });
      favBtn.innerText = '❤️';
    }

    // Set localStorage after updating favorites
    localStorage.setItem('my_favorites', JSON.stringify(favorites));
    updateFavPreview(); // Update the latest favorite preview in the corner
  });
};


let searchlogo = document.querySelector('.search-logo');
let searchContainer = document.querySelector('.search-container');
let searchButton = document.querySelector('.search-container svg');
let searchWrapper = document.querySelector('.search-wrapper');

searchlogo.addEventListener('click', function () {
  document.querySelector('#search-input').value = ''; // Clear the search input when opening the search container
  searchContainer.classList.add('search-container-active');
});

//setting thr search function------------------
const applySearch = () => {
  const keyword = document.querySelector('#search-input').value.toLowerCase();
  const wrappers = document.querySelectorAll('[data-searchable]');
  
  wrappers.forEach((wrapper) => {
    const searchable = wrapper.dataset.searchable;
    
    if (keyword === '' || searchable.includes(keyword)) {
      wrapper.classList.remove('hidden');
    } else {
      wrapper.classList.add('hidden');
    }
  });
};

// Close search container when clicking outside of it or on the search button
document.addEventListener('click', function (event) {

  if (searchContainer.classList.contains('search-container-active')) {

    const isClickInside = searchWrapper.contains(event.target);
    const isClickOnLogo = searchlogo.contains(event.target);

    if ((!isClickInside && !isClickOnLogo) || searchButton.contains(event.target)) {
      searchContainer.classList.remove('search-container-active');
    }
  }
})