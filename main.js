// Updated artist data with Daddy Yankee added at the beginning
const artists = [
  { id: 'artist0', name: 'Daddy Yankee1', reportUrls: [ // Added Daddy Yankee
    'https://lookerstudio.google.com/embed/reporting/0114febd-b174-4d34-8e78-f6b10a94535f/page/p_2la4tiiyqd',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist1', name: 'BTS', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/0ec3d1cf-547b-4e66-8c81-77921c1cab64/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist2', name: 'Chicocurlyhead', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/2cdea0f6-6583-4f4d-8500-b0a58e677dc6/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist3', name: 'MAGNA', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/d53caf15-04e7-4737-b2ab-d9b47a9752e9/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist4', name: 'Adrian Cota', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/a1f0ea40-c3b2-4df5-979d-4ab132a2b7ec/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist5', name: 'Meme del Real', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/ce6d6f8f-4e3e-458f-ad76-7bd16651cd52/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist6', name: 'andrea ele', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/08ebac8f-33d1-48fe-94ad-98357027f20a/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist7', name: 'América Fernández', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/01360d8d-5515-477c-819d-11ecba384212/page/gnpEF',
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
];

const artistListElement = document.getElementById('artist-list');
const panelsSectionElement = document.getElementById('panels-section');

// Function to render the artist list
function renderArtistList() {
  artistListElement.innerHTML = ''; // Clear existing list
  artists.forEach(artist => {
    const li = document.createElement('li');
    li.textContent = artist.name;
    li.dataset.artistId = artist.id; // Store artist ID for reference
    li.addEventListener('click', handleArtistSelection);
    artistListElement.appendChild(li);
  });
}

// Function to render the panels dynamically
function renderPanels() {
  panelsSectionElement.innerHTML = ''; // Clear existing panels
  artists.forEach(artist => {
    // Create panel container
    const panelDiv = document.createElement('div');
    panelDiv.classList.add('panel');
    panelDiv.dataset.artistId = artist.id; // Link panel to artist

    // Create iframe for content
    const iframe = document.createElement('iframe');
    iframe.title = `${artist.name} Panel`; // Accessible title
    iframe.src = 'about:blank'; // Start empty
    iframe.frameborder = "0";
    iframe.style.border = "0";
    iframe.allowfullscreen = true;
    // Standard sandbox attributes
    iframe.sandbox = "allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox";

    // Append iframe to panel, and panel to section
    panelDiv.appendChild(iframe);
    panelsSectionElement.appendChild(panelDiv);
  });
}


// Function to handle artist selection
function handleArtistSelection(event) {
  const selectedLi = event.target;
  const artistId = selectedLi.dataset.artistId;
  const selectedArtist = artists.find(artist => artist.id === artistId);

  if (!selectedArtist) return;

  // Update panel iframes: Load content into the selected artist's panel, clear others
  const allPanels = panelsSectionElement.querySelectorAll('.panel');
  allPanels.forEach(panel => {
    const iframe = panel.querySelector('iframe');
    if (iframe) {
      if (panel.dataset.artistId === artistId) {
        // Use the first URL from the array for this panel
        const targetUrl = selectedArtist.reportUrls[0] || 'about:blank';
        if (iframe.src !== targetUrl) {
          iframe.src = targetUrl;
        }
      } else {
        // Clear iframe if it's not the selected artist's panel
        if (iframe.src !== 'about:blank') {
           iframe.src = 'about:blank';
        }
      }
    }
  });

  // Update active class styling on the artist list
  document.querySelectorAll('#artist-list li').forEach(li => {
    li.classList.remove('active');
  });
  selectedLi.classList.add('active');

  // Scroll the selected panel into view smoothly
  const targetPanel = panelsSectionElement.querySelector(`.panel[data-artist-id="${artistId}"]`);
  if (targetPanel) {
    // Calculate the position to scroll to, considering the header and gap
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const containerPadding = parseFloat(getComputedStyle(document.querySelector('.container')).paddingTop);
    const panelMarginTop = parseFloat(getComputedStyle(targetPanel).marginTop); // Should be 0 for first, var(--gap) otherwise

    // Calculate the offset relative to the scrollable container (.panels-section)
    const panelOffsetTop = targetPanel.offsetTop;

    // Scroll the .panels-section container
    panelsSectionElement.scrollTo({
        top: panelOffsetTop - panelMarginTop, // Scroll to the top edge of the panel (minus its top margin)
        behavior: 'smooth'
    });
  }
}

// Initial setup
function init() {
  renderArtistList();
  renderPanels(); // Render the dynamic panels
  // Optionally, select the first artist by default
  const firstArtistLi = artistListElement.querySelector('li');
  if (firstArtistLi) {
    firstArtistLi.click(); // This will trigger handleArtistSelection
  }
}

// Run initialization when the DOM is ready
document.addEventListener('DOMContentLoaded', init);

// --- Placeholder for future CRUD operations ---
// function addArtist(name) { ... renderArtistList(); renderPanels(); ... }
// function editArtist(id, newName) { ... renderArtistList(); ... } // Panel content might need update too
// function deleteArtist(id) { ... renderArtistList(); renderPanels(); ... }
// Remember to re-render lists/panels after any CRUD operation.
