// Updated artist data with Daddy Yankee added at the beginning
const artistsData = [
  { id: 'artist0', name: 'Daddy Yankee', reportUrls: [
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
  // ... rest of artistsData remains the same ...
];

// Data for PALF and TRUVATOS sections (Social Media)
const socialMediaData = [
  { id: 'x', name: 'X (Twitter)', palfReportUrl: 'https://lookerstudio.google.com/embed/reporting/e1c63634-b541-44ef-af28-77c27ff63e0b/page/gnpEF', truvatosReportUrl: 'https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF' },
  // ... rest of socialMediaData remains the same ...
];

// Data for PALF Bands
const palfBandsData = [
  { id: 'grupo-destino', name: 'Grupo Destino', type: 'band' },
  // ... rest of palfBandsData remains the same ...
];

// Default iframe URL for PALF social media panels under bands
const defaultPalfIframeUrl = "https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF";

// Get DOM elements
const navButtons = document.querySelectorAll('.nav-button');
const contentSections = document.querySelectorAll('.content-section');
const palfBandButtonsContainer = document.getElementById('palf-band-buttons');
const privateDataButton = document.getElementById('private-data-button');

// Variable para rastrear la banda PALF seleccionada
let selectedPalfBandId = null;

// Function to select first item in a list
function selectFirstItem(listId, data, section) {
  const firstLi = document.querySelector(`#${listId} li:first-child`);
  if (firstLi) {
    const simulatedEvent = { target: firstLi };
    handleSelection(simulatedEvent, data, section);
  }
}

// Function to switch tabs
function switchTab(tabId) {
  contentSections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });

  if (palfBandButtonsContainer) {
    palfBandButtonsContainer.classList.remove('active');
    palfBandButtonsContainer.style.display = 'none';
  }

  const targetSection = document.getElementById(tabId);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.style.display = 'block';

    let dataToRender = [];
    let listElementId = '';
    let gridContainerId = '';

    if (tabId === 'artists') {
      dataToRender = artistsData;
      listElementId = 'artists-list';
      gridContainerId = 'artists-grid-container';
    } else if (tabId === 'palf') {
      selectedPalfBandId = null;
      dataToRender = socialMediaData;
      listElementId = 'palf-list';
      gridContainerId = 'palf-grid-container';

      if (palfBandButtonsContainer) {
        palfBandButtonsContainer.classList.add('active');
        palfBandButtonsContainer.style.display = 'flex';
        renderPalfBandButtons();
      }
    } else if (tabId === 'truvatos') {
      dataToRender = socialMediaData.filter(item => item.type !== 'link');
      listElementId = 'truvatos-list';
      gridContainerId = 'truvatos-grid-container';
    }

    renderList(listElementId, dataToRender);
    renderPanels(gridContainerId, dataToRender);
    selectFirstItem(listElementId, dataToRender, targetSection);
  }

  navButtons.forEach(button => {
    button.classList.remove('active');
    if (button.dataset.tab === tabId) {
      button.classList.add('active');
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  navButtons.forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  if (privateDataButton) {
    privateDataButton.addEventListener('click', () => {
      window.location.href = 'https://data.hybelatinamerica.com';
    });
  }

  // Set default tab and select first item
  switchTab('artists');
});

// ... rest of the code remains the same ...