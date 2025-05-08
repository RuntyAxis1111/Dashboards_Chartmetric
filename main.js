// Updated artist data with Daddy Yankee added at the beginning
const artistsData = [
  { id: 'artist0', name: 'Daddy Yankee', reportUrls: [ // Added Daddy Yankee
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

// Data for PALF and TRUVATOS sections (Social Media)
// Each item now includes separate report URLs for PALF and TRUVATOS
const socialMediaData = [
  { id: 'fb', name: 'Facebook', palfReportUrl: 'https://lookerstudio.google.com/embed/reporting/43a608b8-7c3d-4ba2-a08a-21991d52dcd7/page/gnpEF', truvatosReportUrl: 'https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF' },
  { id: 'ig', name: 'Instagram', palfReportUrl: 'https://lookerstudio.google.com/embed/reporting/ec282e0b-ed12-4e16-938b-b938328b5cda/page/gnpEF', truvatosReportUrl: 'https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF' },
  { id: 'x', name: 'X (Twitter)', palfReportUrl: 'https://lookerstudio.google.com/embed/reporting/e1c63634-b541-44ef-af28-77c27ff63e0b/page/gnpEF', truvatosReportUrl: 'https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF' },
  { id: 'yt', name: 'YouTube', palfReportUrl: 'https://lookerstudio.google.com/embed/reporting/5a14b2b1-b972-4fb7-843c-dbb1b6cfb11e/page/gnpEF', truvatosReportUrl: 'https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF' },
  { id: 'tt', name: 'TikTok (working)', palfReportUrl: 'https://lookerstudio.google.com/embed/reporting/43a608b8-7c3d-4ba2-a08a-21991d52dcd7/page/gnpEF', truvatosReportUrl: 'https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF' },
  // Removed Snapchat entry
];

// Data for PALF Bands
const palfBandsData = [
  { id: 'grupo-destino', name: 'Grupo Destino' },
  { id: 'muzsa', name: 'Muzsa' },
  { id: 'jugada-maestra', name: 'Jugada Maestra' },
];

// Default iframe URL for PALF social media panels under bands
const defaultPalfIframeUrl = "https://lookerstudio.google.com/embed/reporting/b4a8cec2-b9a5-4db4-8370-c9594f08c39d/page/gnpEF";

// Variable para rastrear la banda PALF seleccionada (null para estado raíz)
let selectedPalfBandId = null;


// Get elements
const hamburgerIcon = document.getElementById('hamburger-icon');
const navButtons = document.querySelectorAll('.nav-button');
const contentSections = document.querySelectorAll('.content-section');
const palfBandButtonsContainer = document.getElementById('palf-band-buttons');
const palfSidebarTitle = document.querySelector('#palf-sidebar .sidebar-title h2');
const privateDataButton = document.getElementById('private-data-button'); // Get the new button


// Función genérica para renderizar una lista en una barra lateral
function renderList(listElementId, data, clickHandler) {
  const listElement = document.getElementById(listElementId);
  if (listElement) {
    listElement.innerHTML = ''; // Limpiar lista existente
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      li.dataset.itemId = item.id; // Almacenar ID del elemento para referencia
      li.addEventListener('click', (event) => clickHandler(event, data)); // Asignar manejador de clic
      listElement.appendChild(li);
    });
  }
}

// Función genérica para renderizar paneles en un contenedor de cuadrícula
function renderPanels(gridContainerId, data) {
  const gridContainerElement = document.getElementById(gridContainerId);
  if (gridContainerElement) {
    gridContainerElement.innerHTML = ''; // Limpiar paneles existentes
    data.forEach(item => {
      // Crear contenedor del panel (tarjeta)
      const panelDiv = document.createElement('div');
      panelDiv.classList.add('panel'); // Usar clase 'panel' para estilos de tarjeta
      panelDiv.dataset.itemId = item.id; // Vincular panel al elemento

      // Crear título h2
      const titleElement = document.createElement('h2');
      titleElement.textContent = item.name; // Establecer texto del título

      // Crear iframe para el contenido
      const iframe = document.createElement('iframe');
      iframe.title = `${item.name} Panel`; // Título accesible
      iframe.src = 'about:blank'; // Iniciar vacío
      iframe.frameborder = "0";
      iframe.style.border = "0";
      iframe.allowfullscreen = true;
      // Atributos sandbox estándar
      iframe.sandbox = "allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox";

      // Añadir título e iframe al panel, y el panel al contenedor de cuadrícula
      panelDiv.appendChild(titleElement); // Añadir título primero
      panelDiv.appendChild(iframe);
      gridContainerElement.appendChild(panelDiv); // Añadir al contenedor de cuadrícula
    });
  }
}

// Función genérica para manejar la selección de un elemento en una barra lateral
// Added optional activeSectionElement parameter
function handleSelection(event, data, activeSectionElement = null) {
  const selectedLi = event.target;
  const itemId = selectedLi.dataset.itemId;
  const selectedItem = data.find(item => item.id === itemId);

  if (!selectedItem) return;

  // Find the active section - use passed element if available, otherwise query the DOM
  const activeSection = activeSectionElement || document.querySelector('.content-section.active');

  if (!activeSection) {
      console.error('handleSelection: activeSection is null!');
      return; // Exit if activeSection is null
  }

  // Determine the current tab/section ID
  const currentTabId = activeSection.id;

  // Find the grid container within the active section
  const currentGridContainer = activeSection.querySelector('.grid-container');
  if (!currentGridContainer) {
      console.error('handleSelection: currentGridContainer is null!');
      return; // Exit if currentGridContainer is null
  }

  // Update panel iframes: Load content into the selected item's panel, clear others
  const allPanels = currentGridContainer.querySelectorAll('.panel');
  allPanels.forEach(panel => {
    const iframe = panel.querySelector('iframe');
    if (iframe) {
      if (panel.dataset.itemId === itemId) {
        let targetUrl = 'about:blank';

        // --- Lógica de URL para PALF y otras secciones ---
        if (currentTabId === 'palf') {
            // En la sección PALF, la URL depende de si hay una banda seleccionada o es el estado raíz
            if (selectedPalfBandId === null) {
                 // Estado raíz de PALF: usar URL específica de la red social
                 targetUrl = selectedItem.palfReportUrl || 'about:blank';
            } else {
                 // Banda PALF seleccionada: usar URL genérica de banda
                 targetUrl = defaultPalfIframeUrl;
            }
        } else if (selectedItem.reportUrls) {
            // Lógica para Artists (usa el primer URL del array)
            targetUrl = selectedItem.reportUrls[0] || 'about:blank';
        } else if (currentTabId === 'truvatos' && selectedItem.truvatosReportUrl) {
             // Lógica para TRUVATOS
            targetUrl = selectedItem.truvatosReportUrl;
        } else if (selectedItem.reportUrl) {
             // Fallback a generic reportUrl si está disponible
             targetUrl = selectedItem.reportUrl;
        }
        // --- Fin Lógica de URL ---


        if (iframe.src !== targetUrl) {
          iframe.src = targetUrl;
        }
      } else {
        // Limpiar iframe si no es el panel del elemento seleccionado
        if (iframe.src !== 'about:blank') {
           iframe.src = 'about:blank';
        }
      }
    }
  });


  // Update active class styling on the list within the active section
  const currentList = activeSection.querySelector('ul'); // Find the list within the active section
  if (currentList) {
      currentList.querySelectorAll('li').forEach(li => {
        li.classList.remove('active');
      });
      // Asegurarse de que selectedLi es un elemento DOM válido antes de añadir la clase
      if (selectedLi && selectedLi.classList) {
          selectedLi.classList.add('active');
      } else {
          console.error('handleSelection: selectedLi no es un elemento válido', selectedLi);
      }
  }


  // Desplazar el panel seleccionado a la vista suavemente
  const currentPanelsSection = activeSection.querySelector('.panels-section'); // Encontrar la sección de paneles en la sección activa
  const targetPanel = currentGridContainer.querySelector(`.panel[data-item-id="${itemId}"]`); // Encontrar el panel en el contenedor de cuadrícula actual
  if (currentPanelsSection && targetPanel) {
    currentPanelsSection.scrollTo({
        top: targetPanel.offsetTop,
        behavior: 'smooth'
    });
  }


  // En móvil, ocultar la barra lateral después de la selección (opcional, pero UX común)
  if (window.innerWidth <= 900) {
      const currentSidebar = activeSection.querySelector('.artist-list-section'); // Encontrar la barra lateral en la sección activa
      if (currentSidebar) {
          currentSidebar.classList.remove('active');
      }
  }
}

// Función para manejar la selección de una banda PALF (desde los botones horizontales)
function handlePalfBandSelection(event) {
    const selectedButton = event.target; // El target es el botón de banda
    const bandId = selectedButton.dataset.bandId; // Usar data-bandId

    // Actualizar la variable de estado de banda seleccionada
    selectedPalfBandId = bandId;

    // Actualizar clase 'active' en los botones de banda
    const palfBandButtons = palfBandButtonsContainer.querySelectorAll('.band-button');
    palfBandButtons.forEach(button => {
        button.classList.remove('active');
    });
    selectedButton.classList.add('active');

    // Actualizar el título de la barra lateral PALF para mostrar el nombre de la banda seleccionada
    if (palfSidebarTitle) {
        palfSidebarTitle.textContent = selectedButton.textContent;
    }


    // Renderizar la lista de redes sociales en la barra lateral PALF
    // Nota: Todas las bandas usan los mismos datos de redes sociales por ahora
    renderList('palf-list', socialMediaData, handleSelection);

    // Renderizar los paneles de redes sociales en el área principal de PALF
    renderPanels('palf-grid-container', socialMediaData);

    // Seleccionar el primer elemento de la lista de redes sociales por defecto
    const firstSocialMediaLi = document.getElementById('palf-list')?.querySelector('li');
    if (firstSocialMediaLi) {
        // Simular un evento de click en el primer elemento de la lista de redes sociales
        const simulatedEvent = { target: firstSocialMediaLi };
        // Llamar a handleSelection con el evento simulado, los datos de redes sociales y la sección PALF activa
        handleSelection(simulatedEvent, socialMediaData, document.getElementById('palf'));
    } else {
        console.error('handlePalfBandSelection: No se encontró el primer elemento de red social en la lista.');
    }
}


// Función para alternar la visibilidad de la barra lateral en móvil
function toggleSidebar() {
    const currentSidebar = document.querySelector('.content-section.active .artist-list-section');
    if (currentSidebar) {
        currentSidebar.classList.toggle('active');
    }
}

// Añadir event listener al icono de hamburguesa
if (hamburgerIcon) {
    hamburgerIcon.addEventListener('click', toggleSidebar);
}

/**
 * Renders a circular gauge within the given element.
 * @param {HTMLElement} el - The container element for the gauge.
 * @param {number} percent - The percentage value (0-100) for the gauge progress.
 * @param {string} label - The label text to display below the number.
 */
function renderGauge(el, percent, label = '') {
    const radius = 60; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const strokeWidth = 10; // Must match CSS .gauge-circle stroke-width

    // Clear existing content
    el.innerHTML = '';
    el.classList.add('gauge'); // Ensure the container has the gauge class

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('gauge-svg');
    svg.setAttribute('viewBox', '0 0 120 120'); // Adjust viewBox based on radius and stroke
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    // Create track circle
    const trackCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    trackCircle.classList.add('gauge-circle', 'gauge-track');
    trackCircle.setAttribute('cx', '60'); // Center X
    trackCircle.setAttribute('cy', '60'); // Center Y
    trackCircle.setAttribute('r', radius);

    // Create progress circle
    const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressCircle.classList.add('gauge-circle', 'gauge-progress');
    progressCircle.setAttribute('cx', '60'); // Center X
    progressCircle.setAttribute('cy', '60'); // Center Y
    progressCircle.setAttribute('r', radius);
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference; // Start hidden

    // Append circles to SVG
    svg.appendChild(trackCircle);
    svg.appendChild(progressCircle);

    // Create text container
    const textDiv = document.createElement('div');
    textDiv.classList.add('gauge-text');

    // Create number element
    const numberSpan = document.createElement('span');
    numberSpan.classList.add('gauge-number');
    numberSpan.textContent = '0%'; // Start at 0 for animation

    // Create label element
    const labelSpan = document.createElement('span');
    labelSpan.classList.classList.add('gauge-label');
    labelSpan.textContent = label;

    // Append number and label to text container
    textDiv.appendChild(numberSpan);
    textDiv.appendChild(labelSpan);


    // Append SVG and text to the container element
    el.appendChild(svg);
    el.appendChild(textDiv);

    // Animate the progress and number
    requestAnimationFrame(() => {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;

        // Animate the number
        let currentPercent = 0;
        const animationDuration = 1000; // 1 second
        const startTime = performance.now();

        function animateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            currentPercent = Math.floor(progress * percent);
            numberSpan.textContent = `${currentPercent}%`;

            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            }
        }

        requestAnimationFrame(animateNumber);
    });
}

// Función para renderizar los botones de banda PALF en el sub-menú horizontal
function renderPalfBandButtons() {
    if (palfBandButtonsContainer) {
        palfBandButtonsContainer.innerHTML = ''; // Limpiar botones existentes
        palfBandsData.forEach(band => {
            const button = document.createElement('button');
            button.classList.add('band-button');
            button.textContent = band.name;
            button.dataset.bandId = band.id;
            button.addEventListener('click', handlePalfBandSelection); // Usar el handler de selección de banda
            palfBandButtonsContainer.appendChild(button);
        });
    }
}


// Función para cambiar entre pestañas/secciones principales
function switchTab(tabId) {
    // Ocultar todas las secciones de contenido
    contentSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    // Explicitly hide the PALF band buttons container at the start of every tab switch
    if (palfBandButtonsContainer) {
        palfBandButtonsContainer.classList.remove('active'); // Keep class logic for consistency
        palfBandButtonsContainer.style.display = 'none'; // Explicitly hide
    }


    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';

        // Determinar qué datos y elementos usar según la pestaña
        let dataToRender = [];
        let listElementId = '';
        let gridContainerId = '';
        let sidebarTitle = '';
        let listClickHandler = handleSelection; // Handler por defecto para listas


        if (tabId === 'artists') {
            dataToRender = artistsData;
            listElementId = 'artists-list';
            gridContainerId = 'artists-grid-container';
            sidebarTitle = 'Artists';
            listClickHandler = handleSelection; // Usar handler genérico para artistas

             // Renderizar lista y panels para Artists
             renderList(listElementId, dataToRender, listClickHandler);
             renderPanels(gridContainerId, dataToRender); // Render panels for Artists
             // Seleccionar el primer elemento por defecto
             const firstItemLi = document.getElementById(listElementId)?.querySelector('li');
             if (firstItemLi) {
               handleSelection({ target: firstItemLi }, dataToRender, targetSection);
             }


        } else if (tabId === 'palf') {
            // Resetear la banda seleccionada a null al entrar en la pestaña PALF
            selectedPalfBandId = null;

            // En la pestaña PALF, inicialmente mostramos la lista de redes sociales (estado raíz)
            dataToRender = socialMediaData; // Usar datos de redes sociales para el estado raíz
            listElementId = 'palf-list';
            gridContainerId = 'palf-grid-container'; // El grid mostrará paneles de redes sociales
            sidebarTitle = 'PALF'; // Título inicial de la barra lateral PALF
            listClickHandler = handleSelection; // Usar handler genérico para redes sociales (maneja URLs específicas/genéricas)


            // Show the PALF band buttons container
            if (palfBandButtonsContainer) {
                palfBandButtonsContainer.classList.add('active'); // Keep class logic
                palfBandButtonsContainer.style.display = 'flex'; // Explicitly show
                renderPalfBandButtons(); // Renderizar los botones de banda en el sub-menú horizontal
            }

            // Limpiar el área de paneles PALF al cambiar a la pestaña PALF
             const palfGridContainer = document.getElementById('palf-grid-container');
             if(palfGridContainer) {
                 palfGridContainer.innerHTML = '';
             }

            // Renderizar la lista de redes sociales en la barra lateral PALF (estado raíz)
            renderList(listElementId, dataToRender, listClickHandler);

            // Renderizar los paneles de redes sociales en el área principal de PALF (estado raíz)
            renderPanels(gridContainerId, dataToRender); // Render panels for PALF social media

            // Seleccionar el primer elemento de la lista de redes sociales por defecto
            const firstSocialMediaLi = document.getElementById(listElementId)?.querySelector('li');
            if (firstSocialMediaLi) {
                // Simular un evento de click en el primer elemento de la lista de redes sociales
                const simulatedEvent = { target: firstSocialMediaLi };
                // Llamar a handleSelection con el evento simulado, los datos de redes sociales y la sección PALF activa
                handleSelection(simulatedEvent, socialMediaData, document.getElementById('palf'));
            } else {
                console.error('switchTab(palf): No se encontró el primer elemento de red social en la lista.');
            }


        } else if (tabId === 'truvatos') {
            dataToRender = socialMediaData; // Usar datos de redes sociales para TRUVATOS
            listElementId = 'truvatos-list';
            gridContainerId = 'truvatos-grid-container';
            sidebarTitle = 'TRUVATOS';
            listClickHandler = handleSelection; // Usar handler genérico para TRUVATOS

            // Renderizar lista y panels para Truvatos
             renderList(listElementId, dataToRender, listClickHandler);
             renderPanels(gridContainerId, dataToRender); // Render panels for Truvatos
             // Seleccionar el primer elemento por defecto
             const firstItemLi = document.getElementById(listElementId)?.querySelector('li');
             if (firstItemLi) {
               handleSelection({ target: firstItemLi }, dataToRender, targetSection);
             }
        }

        // Actualizar título de la barra lateral
        const sidebarTitleElement = targetSection.querySelector('.sidebar-title h2');
        if (sidebarTitleElement) {
            sidebarTitleElement.textContent = sidebarTitle;
        }
    }

    // Actualizar clase 'active' en los botones de navegación principal
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.tab === tabId) {
            button.classList.add('active');
        }
    });
}


// Inicialización
function init() {
  // Añadir event listeners a los botones de navegación principal
  navButtons.forEach(button => {
      button.addEventListener('click', () => {
          switchTab(button.dataset.tab);
      });
  });

  // Add event listener for the new private data button
  if (privateDataButton) {
      privateDataButton.addEventListener('click', () => {
          window.location.href = 'https://data.hybelatinamerica.com'; // Navigate in the same tab
      });
  }


  // Establecer la pestaña activa por defecto (ej. 'artists')
  switchTab('artists');

  // Añadir event listener al icono de hamburguesa (ya hecho, pero asegurar que apunta a la barra lateral activa)
  // La función toggleSidebar está actualizada para apuntar a la barra lateral activa.
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// --- Placeholder para futuras operaciones CRUD ---
// function addItem(dataArray, item) { ... renderList(); renderPanels(); ... }
// function editItem(dataArray, id, newItem) { ... renderList(); ... } // El contenido del panel también podría necesitar actualización
// function deleteItem(dataArray, id) { ... renderList(); renderPanels(); ... }
// Recordar volver a renderizar listas/paneles después de cualquier operación CRUD.
