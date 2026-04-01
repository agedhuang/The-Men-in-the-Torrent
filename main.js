let googleSheetID = '1LfoPTOKOzmgG51fXZ76drBEt9h6wwAW7aPHRL-7rFYc' 
let tabName1 = 'generation' 
let tabName2= 'content_blocks' 

getContentHTML = (content) => {
  let contentHtml = '';
  if (content.type === 'img') {
    contentHtml =
      `<div class="image-wrapper" data-gen="${content.gen_id}"> 
        <img src="${content.file_path}" alt="${content.annotation_cn || 'Family Huang img'}"> 
      </div>`
  }

  return contentHtml;
}

let layoutBlocks = (contentData) => {

  let content = document.querySelector('#content');
  content.innerHTML = ''; // Clear existing content before adding new blocks.
  
  if (!contentData.length) return; // If there are no blocks, exit the function.

  let htmlArray = contentData.map(function(content) {
    return getContentHTML(content);
  });
  let allBlocksHTML = htmlArray.join(''); // Generate HTML for all blocks and join them into a single string.
  content.innerHTML = allBlocksHTML;
  // Re-bind interactions because elements are new!

}  

// setting the filter function ------------------
const applyFilter = () => {
  const checkboxes = document.querySelectorAll('.gen-filter:checked');
  let selectedGens = Array.from(checkboxes).map((cb) => cb.value);
  
  const imageWrappers = document.querySelectorAll('.image-wrapper');
  
  imageWrappers.forEach((wrapper) => {
    let wrapperGen = wrapper.dataset.gen;
    
    if (selectedGens.includes('all') || selectedGens.includes(wrapperGen)) {
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
	layoutBlocks(json) // since I need to group the blocks by each page, 5 blocks for each page, I can't do the foreach() loop here.

  applyFilter(); //firstly apply filter to show all
  document.querySelector('#filters').addEventListener('change', applyFilter); // Bind the filter function to the change event of the checkboxes.
})