// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired - main.js loaded');
  
  // References to main elements
  const mainLayout = document.querySelector('.main-layout');
  const infoRight = document.querySelector('.col.info-right');
  const portfolioLink = document.querySelector('.col.portfolio');
  
  console.log('Elements found:', { 
    mainLayout: !!mainLayout, 
    infoRight: !!infoRight, 
    portfolioLink: !!portfolioLink 
  });
  
  // Function to toggle info page
  function showInfo() {
    console.log('showInfo called');
    
    // Hide main content elements using CSS classes
    document.querySelectorAll('.top-row, .middle-row, .giant-name, .corner-icon').forEach(el => {
      el.classList.add('element-hidden');
      el.classList.remove('element-visible');
    });
    
    // Show the info page using CSS classes
    const infoPage = document.querySelector('.info-page') || createInfoPage();
    infoPage.classList.add('info-active');
    
    // Update URL/history
    window.history.pushState("", "", "?s=info");
  }
  
  // Function to hide info page
  function hideInfo() {
    // Hide the info page using CSS classes
    const infoPage = document.querySelector('.info-page');
    if (infoPage) {
      infoPage.classList.remove('info-active');
      
      // Show main content again using CSS classes
      setTimeout(() => {
        document.querySelectorAll('.top-row, .middle-row, .giant-name, .corner-icon').forEach(el => {
          el.classList.remove('element-hidden');
          el.classList.add('element-visible');
        });
      }, 300);
    }
    
    // Update URL/history
    window.history.pushState("", "", "/");
  }
  
  // Show portfolio function - universal cross-browser approach
  function showPortfolio() {
    console.log('showPortfolio called');
    
    // Create portfolio page if it doesn't exist
    const portfolioPage = document.querySelector('.portfolio-page') || createPortfolioPage();
    console.log('Portfolio page element:', portfolioPage);
    
    // Prepare portfolio content first (but still hidden)
    // Pre-load all project rows to be ready
    document.querySelectorAll('.portfolio-table tr[data-project]').forEach(row => {
      row.style.opacity = '0';
      row.style.transform = 'translateY(20px)';
    });
    
    // Hide main content elements first
    document.querySelectorAll('.top-row, .middle-row, .giant-name').forEach(el => {
      el.classList.add('element-hidden');
      el.classList.remove('element-visible');
    });
    
    // Hide corner icons completely
    const cornerIcon = document.querySelector('.corner-icon');
    cornerIcon.classList.add('corner-hidden');
    cornerIcon.classList.remove('corner-visible');
    
    // Set display block first, then in next frame start animation
    portfolioPage.style.display = 'block';
    
    // Force browser to apply the display:block before continuing
    requestAnimationFrame(() => {
      // Add flipping class to help with cross-browser rendering
      mainLayout.classList.add('flipping');
      
      // Now start the flip animation
      mainLayout.classList.add('rotate-180');
      
      // When flip is halfway through, make portfolio visible
      setTimeout(() => {
        // Make portfolio page fully visible
        portfolioPage.classList.add('portfolio-active');
        
        // Critical visibility properties as inline styles (for all browsers)
        portfolioPage.style.opacity = '1';
        portfolioPage.style.zIndex = '100';
        portfolioPage.style.visibility = 'visible';
        
        // Debug visibility state
        console.log('Portfolio visibility applied');
        
        // Animate in the project rows after a short delay
        setTimeout(() => {
          document.querySelectorAll('.portfolio-table tr[data-project]').forEach((row, i) => {
            setTimeout(() => {
              row.classList.add('element-visible');
            }, i * 100);
          });
        }, 200);
      }, 500); // Wait for flip to be about halfway complete
    });
    
    // Update URL/history
    window.history.pushState("", "", "?s=portfolio");
  }
  
  // Function to hide portfolio - universal cross-browser approach
  function hidePortfolio() {
    console.log('hidePortfolio called');
    
    // Get portfolio page reference
    const portfolioPage = document.querySelector('.portfolio-page');
    if (portfolioPage) {
      // First make portfolio content invisible but keep the element itself
      portfolioPage.style.opacity = '0';
      
      // Reset all project rows immediately
      portfolioPage.querySelectorAll('.project-images').forEach(row => {
        row.classList.remove('active');
      });
      portfolioPage.querySelectorAll('.expand-icon').forEach(icon => {
        icon.textContent = '+';
      });
      portfolioPage.querySelectorAll('tr[data-project]').forEach(row => {
        row.classList.remove('element-visible');
      });
      
      // Start the flip animation
      mainLayout.classList.remove('rotate-180');
      mainLayout.classList.remove('flipping');
      
      // Wait for animation to complete before hiding completely
      setTimeout(() => {
        // Now fully remove the active class and hide the portfolio
        portfolioPage.classList.remove('portfolio-active');
        portfolioPage.style.display = 'none';
        portfolioPage.style.visibility = 'hidden';
        portfolioPage.style.zIndex = '-1';
        
        // Make corner-icon visible again using CSS classes
        const cornerIcon = document.querySelector('.corner-icon');
        cornerIcon.classList.remove('corner-hidden');
        cornerIcon.classList.add('corner-visible');
        
        // Then restore opacity of all elements using CSS classes
        document.querySelectorAll('.top-row, .middle-row, .giant-name, .corner-icon').forEach(el => {
          el.classList.remove('element-hidden');
          el.classList.add('element-visible');
        });
      }, 500); // Wait for rotation to complete
    }
    
    // Update URL/history
    window.history.pushState("", "", "/");
    
    // Update URL/history
    window.history.pushState("", "", "/");
  }
  
  // Create info page if it doesn't exist
  function createInfoPage() {
    console.log('createInfoPage called');
    
    const infoPage = document.createElement('div');
    infoPage.className = 'info-page';
    infoPage.innerHTML = `
      <div class="info-content">
        <div class="close-button">✕</div>
        <h2>About Oscar E.</h2>
        <p>Oscar E. is a multidisciplinary creative based in the UK working across brand design, websites, motion, and AI-assisted workflows.</p>
        <p>With a background in digital media and creative technology, Oscar creates functional, innovative designs that combine traditional design principles with emerging technologies.</p>
        <p>For freelance projects or creative collaborations, reach out at: info@oscaredesign.com</p>
      </div>
    `;
    
    mainLayout.appendChild(infoPage);
    
    // Add event listener to close button
    const closeButton = infoPage.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
      console.log('Info close button clicked');
      hideInfo();
    });
    
    // Add ESC key functionality to close the info page
    document.addEventListener('keyup', function(e) {
      if (e.key === 'Escape' && infoPage.style.opacity === '1') {
        console.log('ESC key pressed, hiding info');
        hideInfo();
      }
    });
    
    return infoPage;
  }
  
  // Create portfolio page with projects table
  function createPortfolioPage() {
    console.log('Creating portfolio page');
    const portfolioPage = document.createElement('div');
    portfolioPage.className = 'portfolio-page';
    portfolioPage.innerHTML = `
      <div class="close-button">✕</div>
      <div class="portfolio-content">
        <div class="portfolio-header">
          <h2>Recent Projects</h2>
        </div>
        <table class="portfolio-table">
          <tbody>
            <tr data-project="project1">
              <td>AI-Assisted Brand System</td>
              <td>Brand Design & AI Integration</td>
              <td>2025</td>
              <td><span class="expand-icon">+</span></td>
            </tr>
            <tr class="project-images" id="project1-images">
              <td colspan="4">
                <div class="image-container">
                  <img src="/images/projects/project1/image1.jpg" alt="AI-Assisted Brand System - Image 1">
                  <img src="/images/projects/project1/image2.jpg" alt="AI-Assisted Brand System - Image 2">
                </div>
                <div class="project-description">
                  <p>A comprehensive brand system that uses AI to generate consistent visual assets while maintaining brand integrity. The system includes automated workflows for creating marketing materials at scale.</p>
                  <p><a href="#" class="project-link">View case study →</a></p>
                </div>
              </td>
            </tr>
            <tr data-project="project2">
              <td>Creative Process Platform</td>
              <td>Web Design & Development</td>
              <td>2025</td>
              <td><span class="expand-icon">+</span></td>
            </tr>
            <tr class="project-images" id="project2-images">
              <td colspan="4">
                <div class="image-container">
                  <img src="/images/projects/project2/image1.jpg" alt="Creative Process Platform - Image 1">
                  <img src="/images/projects/project2/image2.jpg" alt="Creative Process Platform - Image 2">
                </div>
                <div class="project-description">
                  <p>An interactive web platform showcasing creative processes and experimental design techniques. Features innovative navigation and responsive design focused on storytelling.</p>
                  <p><a href="#" class="project-link">View case study →</a></p>
                </div>
              </td>
            </tr>
            <tr data-project="project3">
              <td>Generative Motion System</td>
              <td>Motion Design & Creative Coding</td>
              <td>2024</td>
              <td><span class="expand-icon">+</span></td>
            </tr>
            <tr class="project-images" id="project3-images">
              <td colspan="4">
                <div class="image-container">
                  <img src="/images/projects/project3/image1.jpg" alt="Generative Motion System - Image 1">
                </div>
                <div class="project-description">
                  <p>A custom-built generative motion system that creates unique animations based on sound input. Used for live performances and brand activations.</p>
                  <p><a href="#" class="project-link">View case study →</a></p>
                </div>
              </td>
            </tr>
            <tr data-project="project4">
              <td>Experimental Interface Lab</td>
              <td>UX Design & Prototyping</td>
              <td>2024</td>
              <td><span class="expand-icon">+</span></td>
            </tr>
            <tr class="project-images" id="project4-images">
              <td colspan="4">
                <div class="image-container">
                  <img src="/images/projects/project4/image1.jpg" alt="Experimental Interface Lab - Image 1">
                  <img src="/images/projects/project4/image2.jpg" alt="Experimental Interface Lab - Image 2">
                  <img src="/images/projects/project4/image3.jpg" alt="Experimental Interface Lab - Image 3">
                </div>
                <div class="project-description">
                  <p>A series of experimental interface prototypes exploring new ways of human-computer interaction. Includes voice-controlled interfaces, gestural inputs, and haptic feedback systems.</p>
                  <p><a href="#" class="project-link">View case study →</a></p>
                </div>
              </td>
            </tr>
            <tr data-project="project5">
              <td>Automated Content Studio</td>
              <td>Content Creation & Automation</td>
              <td>2023</td>
              <td><span class="expand-icon">+</span></td>
            </tr>
            <tr class="project-images" id="project5-images">
              <td colspan="4">
                <div class="image-container">
                  <img src="/images/projects/project5/image1.jpg" alt="Automated Content Studio - Image 1">
                </div>
                <div class="project-description">
                  <p>A suite of automation tools that streamline content creation for digital platforms. Combines design templates, AI-assisted copywriting, and publishing workflows.</p>
                  <p><a href="#" class="project-link">View case study →</a></p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    mainLayout.appendChild(portfolioPage);
    
    // Add event listener to close button
    const closeButton = portfolioPage.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
      console.log('Portfolio close button clicked');
      hidePortfolio();
    });
    
    // Add ESC key functionality to close the portfolio page
    document.addEventListener('keyup', function(e) {
      if (e.key === 'Escape' && portfolioPage.classList.contains('portfolio-active')) {
        console.log('ESC key pressed, hiding portfolio');
        hidePortfolio();
      }
    });
    
    // Add click handlers for project rows
    const projectRows = portfolioPage.querySelectorAll('tr[data-project]');
    projectRows.forEach(row => {
      row.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const imagesRow = document.getElementById(projectId + '-images');
        const expandIcon = this.querySelector('.expand-icon');
        
        // Close any other open project rows
        portfolioPage.querySelectorAll('.project-images.active').forEach(active => {
          if (active.id !== projectId + '-images') {
            active.classList.remove('active');
            // Reset other expand icons
            const otherRow = portfolioPage.querySelector(`tr[data-project="${active.id.replace('-images', '')}"]`);
            if (otherRow) {
              otherRow.querySelector('.expand-icon').textContent = '+';
            }
          }
        });
        
        // Toggle active class to show/hide images
        imagesRow.classList.toggle('active');
        
        // Toggle plus/minus icon
        expandIcon.textContent = imagesRow.classList.contains('active') ? '−' : '+';
        
        // Scroll to make the expanded content visible if needed
        if (imagesRow.classList.contains('active')) {
          setTimeout(() => {
            imagesRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
      });
    });
    
    return portfolioPage;
  }
  
  // Add click event to INFO button
  if (infoRight) {
    console.log('Adding click event to infoRight');
    infoRight.addEventListener('click', function() {
      console.log('Info button clicked');
      showInfo();
    });
  } else {
    console.error('Could not find info-right element');
  }
  
  // Add click event to Portfolio link
  if (portfolioLink) {
    console.log('Adding click event to portfolioLink');
    portfolioLink.addEventListener('click', function() {
      console.log('Portfolio link clicked');
      showPortfolio();
    });
  } else {
    console.error('Could not find portfolio element');
  }
  
  // Check URL on page load to see if we should show a specific page
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('s');
  if (section === 'info') {
    showInfo();
  } else if (section === 'portfolio') {
    showPortfolio();
  }
  
  // Adjust height on window resize
  function adjustHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Run once on page load
  adjustHeight();
  
  // Re-run when window is resized
  window.addEventListener('resize', adjustHeight);
});
