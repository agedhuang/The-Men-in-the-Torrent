# The Men in The Torrent

**The Men in The Torrent** is an interactive digital archive and family museum project. It preserves and visualizes the history of the Huang family across five generations, treating historical artifacts—photos, letters, and physical objects—as anchors within the fast-moving "torrent" of 20th and 21st-century social change.

## Project Concept
The "Torrent" represents the relentless flow of time and social transformation. This website serves as a repository where users can:
- **Explore** five distinct generations of family history.
- **Interact** with representative items that define the spirit of each era.
- **Curate** a personal collection of historical fragments.

## Key Features

### 1. Dynamic Gallery System
The core of the project is a responsive gallery that fetches live data from the **Google Sheets API**. 
- **Generation Filtering**: Seamlessly toggle between Gen 1 to Gen 5 to see content relevant to specific eras.
- **Real-time Search**: Instant keyword filtering for all image annotations and text blocks.
- **Interactive Notifications**: Visual "Toast" messages that provide historical context when filters are activated.

### 2. Personal Collection (Favorites)
Using the **Web Storage API (localStorage)**, the project allows users to build a personal archive.
- **Persistent Storage**: Saved items remain in your collection even after refreshing or closing the browser.
- **Interactive Modal**: Click any item to view high-resolution images and detailed archival notes.
- **Real-time Preview**: A dynamic window in the gallery corner displays the most recently saved artifact.

### 3. Immersive User Experience
- **Adaptive Interaction**: Enhanced CSS logic to handle hover states properly on touch devices(responsive design).
- **Cinematic Atmosphere**: Video backgrounds and smooth transitions designed to evoke a museum-like feel.

## Technical Stack
- **Languages**: HTML5, CSS3, Vanilla JavaScript.
- **Data Source**: [OpenSheet](https://github.com/benborgers/opensheet) (fetching live data from Google Sheets).
- **Storage**: Browser `localStorage` for the "Favorites" system.
- **Design Elements**: Custom SVG iconography and classic typography.

## Project Structure
- `index.html`: The landing page and historical overview.
- `Gallery/`: Contains the main archival interface and filtering logic (`gal.js`).
- `fav/`: Dedicated space for the user’s personal "Collection" view.
- `assets/`: Organized repository for images, fonts, and background media.

---
*Created as part of the Typography & Interaction course at Parsons School of Design.*
