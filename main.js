import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Previous code remains unchanged until the sidebar toggle functionality

// Get the sidebar tab element
const sidebarTab = document.querySelector('.sidebar-tab');
const body = document.body;

// Function to toggle sidebar
function toggleSidebar() {
  const isOpen = body.classList.toggle('sidebar-open');
  sidebarTab.setAttribute('aria-expanded', isOpen);
}

// Add event listeners for sidebar tab
sidebarTab.addEventListener('click', toggleSidebar);
sidebarTab.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleSidebar();
  }
});

// Update handleSelection function to close sidebar after selection
function handleSelection(event, data, activeSectionElement = null) {
  const selectedLi = event.target;
  const itemId = selectedLi.dataset.itemId;
  const selectedItem = data.find(item => item.id === itemId);

  if (!selectedItem) return;

  // Close sidebar after selection
  body.classList.remove('sidebar-open');
  sidebarTab.setAttribute('aria-expanded', 'false');

  // Handle direct link navigation
  if (selectedItem.type === 'link' && selectedItem.url) {
    window.location.href = selectedItem.url;
    return;
  }

  // Find the active section
  const activeSection = activeSectionElement || document.querySelector('.content-section.active');
  if (!activeSection) return;

  const currentTabId = activeSection.id;
  const currentGridContainer = activeSection.querySelector('.grid-container');
  if (!currentGridContainer) return;

  // Clear existing panels and create new ones
  const allPanels = currentGridContainer.querySelectorAll('.panel');
  allPanels.forEach(panel => {
    if (panel.dataset.itemId === itemId) {
      // Create new iframe for selected panel
      const iframe = panel.querySelector('iframe');
      if (iframe) {
        const newIframe = document.createElement('iframe');
        newIframe.title = `${selectedItem.name} Panel`;
        newIframe.frameborder = "0";
        newIframe.style.border = "0";
        newIframe.allowfullscreen = true;
        newIframe.sandbox = "allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox";

        // Determine target URL based on section
        let targetUrl = 'about:blank';
        if (currentTabId === 'palf') {
          targetUrl = selectedPalfBandId === null ? 
            (selectedItem.palfReportUrl || 'about:blank') : 
            defaultPalfIframeUrl;
        } else if (selectedItem.reportUrls) {
          targetUrl = selectedItem.reportUrls[0] || 'about:blank';
        } else if (currentTabId === 'truvatos' && selectedItem.truvatosReportUrl) {
          targetUrl = selectedItem.truvatosReportUrl;
        }

        // Replace old iframe with new one
        newIframe.src = targetUrl;
        iframe.parentNode.replaceChild(newIframe, iframe);
      }
    } else {
      // Remove other panels' iframes
      const iframe = panel.querySelector('iframe');
      if (iframe) {
        iframe.src = 'about:blank';
      }
    }
  });

  // Update active states
  const currentList = activeSection.querySelector('ul');
  if (currentList) {
    currentList.querySelectorAll('li').forEach(li => {
      li.classList.remove('active');
    });
    selectedLi.classList.add('active');
  }
}

// Rest of the code remains unchanged