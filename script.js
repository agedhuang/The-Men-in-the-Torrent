let channelSlug = 'the-men-in-the-torrent' // The “slug” is just the end of the URL.

let layoutBlocks = (blocksData) => {

  let BG = document.querySelector('body');
  BG.style.backgroundImage = `url(${blocksData[0].image.src})` // Set the background image to the first block's image.
  

}  


// ——————————————————get data from API ——————————————————————
let fetchJson = (url, callback) => {
	fetch(url, { cache: 'no-store' })
		.then((response) => response.json())
    .then((json) => callback(json))
}

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch



// And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
	console.log("Blocks data:", json) // See what we get back.
  currentBlocksData = json.data // Store the blocks data in the global variable for later use (e.g., shuffle button)
  layoutBlocks(json.data)
})