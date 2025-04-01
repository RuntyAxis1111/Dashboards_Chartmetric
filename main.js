// Sample artist data (Using reportUrls[0] for the main panel)
const artists = [
  { id: 'artist1', name: 'BTS', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/0ec3d1cf-547b-4e66-8c81-77921c1cab64/page/gnpEF', // URL for this artist's panel
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist2', name: 'Vincent van Gogh', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/0B5FF66SS2W79fjFMQUlJNzJWUEJQR3JXNHR5cGkyVW5ReUxlZ2stTDBsTDRkZEdIZ0lnSEE/page/IzXD', // URL for this artist's panel
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist3', name: 'Claude Monet', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/0B5FF66SS2W79fjFMQUlJNzJWUEJQR3JXNHR5cGkyVW5ReUxlZ2stTDBsTDRkZEdIZ0lnSEE/page/OzXD', // URL for this artist's panel
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
  { id: 'artist4', name: 'Pablo Picasso', reportUrls: [
    'https://lookerstudio.google.com/embed/reporting/0B5FF66SS2W79fjFMQUlJNzJWUEJQR3JXNHR5cGkyVW5ReUxlZ2stTDBsTDRkZEdIZ0lnSEE/page/QzXD', // URL for this artist's panel
    'about:blank',
    'about:blank',
    'about:blank'
  ]},
   { id: 'artist5', name: 'Frida Kahlo', reportUrls: ['about:blank','about:blank','about:blank','about:blank'] },
   { id: 'artist6', name: 'Salvador Dalí', reportUrls: ['about:blank','about:blank','about:blank','about:blank'] },
   { id: 'artist7', name: 'Rembrandt', reportUrls: ['about:blank','about:blank','about:blank','about:blank'] },
   { id: 'artist8', name: 'Michelangelo', reportUrls: ['about:blank','about:blank','about:blank','about:blank'] },
   { id: 'artist9', name: 'Georgia O\'Keeffe', reportUrls: ['about:blank','about:blank','about:blank','about:blank'] },
   { id: 'artist10', name: 'Jackson Pollock', reportUrls: ['about:blank','about:blank','about:blank','about:blank'] },
];

const artistListElement = document.getElementById('artist-list');
const panelsSectionElement = document.getElementById('panels-section');
// REMOVED: const panels = [...] - Panels are now dynamic

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

  // Optional: Scroll the selected panel into view if needed
  // const targetPanel = panelsSectionElement.querySelector(`.panel[data-artist-id="${artistId}"]`);
  // if (targetPanel) {
  //   targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // }
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
