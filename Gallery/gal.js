let googleSheetID = '1LfoPTOKOzmgG51fXZ76drBEt9h6wwAW7aPHRL-7rFYc' 
let tabName1 = 'generation' 
let tabName2= 'content_blocks' 

let searchlogo = document.querySelector('.search-logo');
let searchContainer = document.querySelector('.search-container');
let searchButton = document.querySelector('.search-container svg');
let searchWrapper = document.querySelector('.search-wrapper');

searchlogo.addEventListener('click', function () {
  document.querySelector('#search-input').value = ''; // Clear the search input when opening the search container
  searchContainer.classList.add('search-container-active');
});

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

// Set single HTML for each img or text
getContentHTML = (content) => {
  let contentHtml = '';
  if (content.type === 'img') {
    contentHtml =
      `<div class="image-wrapper" data-id="${content.id}" data-gen="${content.gen}" data-searchable="${content.annotation_en ? content.annotation_en.toLowerCase() : ''}"> 
        <img src="${content.file_path}" alt="${content.annotation_cn || 'Family Huang img'}"> 
      </div>`
  }

  else if (content.type === 'text') {
    contentHtml =
      `<div class="text-block" data-id="${content.id}" data-gen="${content.gen}" data-searchable="${content.content_en ? content.content_en.toLowerCase() : ''}"> 
        <p>${content.content_en || 'Family Huang text'}</p> 
      </div>`
  }

  return contentHtml;
}

// Put HTML togther and layout the blocks in the page
let layoutBlocks = (contentData) => {

  let content = document.querySelector('#content');
  content.innerHTML = ''; // Clear existing content before adding new blocks.
  
  if (!contentData.length) return; // If there are no blocks, exit the function.

  let htmlArray = contentData.map(function (content) {
    return getContentHTML(content);
  });
  let allBlocksHTML = htmlArray.join(''); // Generate HTML for all blocks and join them into a single string.
  content.innerHTML = allBlocksHTML;
  // Re-bind interactions because elements are new!

  setupModal(); // use Modal for image
}

// Setting the modal function for image display------------------
const setupModal = () => {
  const dialog = document.querySelector('#modal');
  const modalImg = document.querySelector('#modal-img');
  const modalCaption = document.querySelector('#modal-caption');
  const favBtn = document.querySelector('.fav-btn'); 
  const favBtnText = favBtn.querySelector('p');

  

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

      if (isFav) {
        favBtnText.innerText = 'Saved';
        favBtn.querySelector('svg').classList.add('saved');
      } else {
        favBtnText.innerText = 'Unsave';
        favBtn.querySelector('svg').classList.remove('saved');
      }
      
      dialog.showModal();
    });
  });
}

// favorite preview in the corner
const updateFavPreview = () => {
  const favWindowImg = document.querySelector('.fav-window img');
  if (!favWindowImg) return; // 防止找不到元素报错

  let favorites = JSON.parse(localStorage.getItem('my_favorites')) || [];

  if (favorites.length > 0) {
    favWindowImg.src = favorites[favorites.length - 1].src;
    console.log("Updated fav preview with:", favorites[favorites.length - 1].src);
  }else {
    favWindowImg.src = '../assets/Collection.svg';}
}


//favbtn listener and modal close button listener
const initModal = () => {
  const dialog = document.querySelector('#modal');
  const closeBtn = document.querySelector('#close-modal');
  const favBtn = document.querySelector('.fav-btn');
  const favBtnText = favBtn.querySelector('p');
  const favIcon = favBtn.querySelector('svg');
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

  //favbtn listener
  favBtn.addEventListener('click', () => {
    const id = favBtn.dataset.id;
    const src = modalImg.src;
    const text = modalCaption.innerText;
    let favorites = JSON.parse(localStorage.getItem('my_favorites')) || [];
    const index = favorites.findIndex(item => item.id === id);

    if (index > -1) {
      favorites.splice(index, 1);
      favBtnText.innerText = 'Unsave';
      favIcon.classList.remove('saved');
    } else {
      favorites.push({ id: id, src: src, text: text });
      favBtnText.innerText = 'Saved';
      favIcon.classList.add('saved');
    }

    // Set localStorage after updating favorites
    localStorage.setItem('my_favorites', JSON.stringify(favorites));
    updateFavPreview(); // Update the latest favorite preview in the corner
  });
};




// setting the filter function ------------------
const applyFilter = (event) => {
  const checkboxes = document.querySelectorAll('.gen-filter:checked');
  let selectedGens = Array.from(checkboxes).map((cb) => cb.value);
  
  const imageWrappers = document.querySelectorAll('#content div');
  
  imageWrappers.forEach((wrapper) => {
    let wrapperGen = wrapper.dataset.gen;
    
    if (selectedGens.includes('all') || selectedGens.includes(wrapperGen)) {
      wrapper.classList.remove('hidden');
    } else {
      wrapper.classList.add('hidden');
    }
  });

  // Notification logic here-----------
  if (event) {
    const genValue = event.target.value;
    const isChecked = event.target.checked;
    const notificationOn = document.querySelector(`#gen${genValue}-on`);
    const notificationOff = document.querySelector(`#gen${genValue}-off`);

    if (notificationOn && notificationOff) {
      if (isChecked) {
        notificationOn.classList.remove('active');
        notificationOn.classList.add('active');
        console.log(`Gen ${genValue} filter applied, showing Gen ${genValue} content.`);
        // disappear in 1.3 second
        setTimeout(() => {
          notificationOn.classList.remove('active');
        }, 1300);
      }
      else {
        notificationOff.classList.remove('active');
        notificationOff.classList.add('active');
        console.log(`Gen ${genValue} filter removed, hiding Gen ${genValue} content.`);
        // disappear in 1.3 second
        setTimeout(() => {
          notificationOff.classList.remove('active');
        }, 1300);
      }
    };
  }
}




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


  // ——————————————————get data from API ——————————————————————
  let fetchJson = (url, callback) => {
    fetch(url, { cache: 'no-store' })
      .then((response) => response.json())
      .then((json) => callback(json))
  }

  // I'm using https://github.com/benborgers/opensheet to get the live data from Google sheeet--------------------------------
  fetchJson(`https://opensheet.elk.sh/${googleSheetID}/${tabName2}`, (json) => {
    console.log("Content data:", json) // See what we get back.
    currentBlocksData = json; // Store the blocks data in the global variable for later use (e.g., shuffle button).
  
    initModal(); // Initialize modal interactions listener 
    layoutBlocks(json);

    applyFilter(); //firstly apply filter to show all
    updateFavPreview(); //show fav preview at the beginning
    document.querySelector('#filters').addEventListener('change', (e) => applyFilter(e)); // Bind the filter function to the change event of the checkboxes.

    document.querySelector('#search-input').addEventListener('input', applySearch);
  });