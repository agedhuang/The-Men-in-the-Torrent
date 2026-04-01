let googleSheetID = '1LfoPTOKOzmgG51fXZ76drBEt9h6wwAW7aPHRL-7rFYc' 
let tabName1 = 'generation' 
let tabName2= 'content_blocks' 

getContentHTML = (content) => {
  let contentHtml = '';
  if (content.type === 'img') {
    contentHtml =
      `<div class="image-wrapper"> 
        <img src="${content.content_cn}" alt="${content.annotation_cn || 'Family Huang img'}"> 
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
  initInteractions();

}  



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
})