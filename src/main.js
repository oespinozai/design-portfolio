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

  // Helper: toggle main elements' visibility
  function toggleMainElements(show = true) {
    const method = show ? 'remove' : 'add';
    document.querySelectorAll('.top-row, .middle-row, .giant-name, .corner-icon').forEach(el => {
      el.classList[method]('element-hidden');
      el.classList[show ? 'add' : 'remove']('element-visible');
    });
  }

  // Function to toggle info page
  function showInfo() {
    console.log('showInfo called');
    toggleMainElements(false);
    const infoPage = document.querySelector('.info-page') || createInfoPage();
    infoPage.classList.add('info-active');
    window.history.pushState("", "", "?s=info");
  }

  function hideInfo() {
    const infoPage = document.querySelector('.info-page');
    if (infoPage) {
      infoPage.classList.remove('info-active');
      setTimeout(() => toggleMainElements(true), 300);
    }
    window.history.pushState("", "", "/");
  }

  // Show portfolio - NO 3D TRANSFORMS, just simple visibility toggling
  function showPortfolio() {
    console.log('showPortfolio called - SIMPLIFIED VERSION');
    const portfolioPage = document.querySelector('.portfolio-page') || createPortfolioPage();
    
    // Direct style application for proper display
    portfolioPage.style.position = 'fixed';
    portfolioPage.style.top = '0';
    portfolioPage.style.left = '0';
    portfolioPage.style.width = '100%';
    portfolioPage.style.height = '100vh';
    portfolioPage.style.transform = 'none'; // Reset any transforms
    portfolioPage.style.perspective = 'none'; // Reset perspective
    portfolioPage.style.webkitTransform = 'none'; // For Safari/Chrome
    portfolioPage.style.mozTransform = 'none'; // For Firefox
    
    // Hide main content first
    toggleMainElements(false);
    
    // Hide corner icons
    const cornerIcon = document.querySelector('.corner-icon');
    if (cornerIcon) cornerIcon.classList.add('corner-hidden');

    // Show portfolio immediately
    portfolioPage.classList.add('portfolio-active');
    portfolioPage.style.display = 'block';
    portfolioPage.style.opacity = '1';
    portfolioPage.style.zIndex = '1000';
    portfolioPage.style.visibility = 'visible';
    
    console.log('Portfolio should be visible now - SIMPLIFIED VERSION');

    // Make all project rows immediately visible instead of staggered
    const projectRows = portfolioPage.querySelectorAll('.portfolio-table tr[data-project]');
    projectRows.forEach(row => {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
      row.classList.add('element-visible');
    });

    window.history.pushState("", "", "?s=portfolio");
  }

  function hidePortfolio() {
    console.log('hidePortfolio called - SIMPLIFIED VERSION');
    const portfolioPage = document.querySelector('.portfolio-page');
    if (portfolioPage) {
      // First fade out the portfolio
      portfolioPage.style.opacity = '0';
      
      // Reset project rows - close any expanded content
      portfolioPage.querySelectorAll('.project-images').forEach(row => row.classList.remove('active'));

      // After fade completes, hide it completely
      setTimeout(() => {
        portfolioPage.classList.remove('portfolio-active');
        portfolioPage.style.display = 'none';
        portfolioPage.style.visibility = 'hidden';
        portfolioPage.style.zIndex = '-1';
        
        // Show main content again
        const cornerIcon = document.querySelector('.corner-icon');
        if (cornerIcon) {
          cornerIcon.classList.remove('corner-hidden');
          cornerIcon.classList.add('corner-visible');
        }
        
        toggleMainElements(true);
      }, 300);
    }
    window.history.pushState("", "", "/");
  }
  
  function createInfoPage() {
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
    infoPage.querySelector('.close-button').addEventListener('click', hideInfo);
    return infoPage;
  }

  // Create portfolio page with projects table
  function createPortfolioPage() {
    console.log('Creating portfolio page - SIMPLIFIED VERSION');
    const portfolioPage = document.createElement('div');
    portfolioPage.className = 'portfolio-page';
    
    // Apply direct styles for proper display
    portfolioPage.style.backgroundColor = '#ffffff';
    portfolioPage.style.position = 'fixed';
    portfolioPage.style.top = '0';
    portfolioPage.style.left = '0';
    portfolioPage.style.width = '100%';
    portfolioPage.style.height = '100vh';
    portfolioPage.style.zIndex = '1000';
    portfolioPage.style.overflow = 'auto';
    portfolioPage.style.transform = 'none'; // Reset any transforms
    portfolioPage.style.webkitTransform = 'none'; // For Safari/Chrome
    portfolioPage.style.mozTransform = 'none'; // For Firefox
    portfolioPage.style.perspective = 'none'; // Reset perspective
    
    portfolioPage.innerHTML = `
      <div class="close-button">✕</div>
      <div class="portfolio-content">
        <table class="portfolio-table">
          <tbody>
            <tr data-project="project1">
              <td>Paper Still Matters</td>
              <td>Branding & Web Design</td>
              <td>2025</td>
            </tr>
            <tr class="project-images" id="project1-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project1/image1.jpg" alt="Paper Still Matters - Image 1">
                  <img src="/images/projects/project1/image2.jpg" alt="Paper Still Matters - Image 2">
                </div>
              </td>
            </tr>
            
            <tr data-project="project2">
              <td>TYPE01 Studio</td>
              <td>Branding & Web Design</td>
              <td>2025</td>
            </tr>
            <tr class="project-images" id="project2-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project2/image1.jpg" alt="TYPE01 Studio - Image 1">
                  <img src="/images/projects/project2/image2.jpg" alt="TYPE01 Studio - Image 2">
                </div>
              </td>
            </tr>
            
            <tr data-project="project3">
              <td>Relief Running</td>
              <td>Branding</td>
              <td>2024</td>
            </tr>
            <tr class="project-images" id="project3-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project3/image1.jpg" alt="Relief Running - Image 1">
                </div>
              </td>
            </tr>
            
            <tr data-project="project4">
              <td>Workshop Coffee w/ Giulia Pex</td>
              <td>Illustration</td>
              <td>2024</td>
            </tr>
            <tr class="project-images" id="project4-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project4/image1.jpg" alt="Workshop Coffee - Image 1">
                  <img src="/images/projects/project4/image2.jpg" alt="Workshop Coffee - Image 2">
                </div>
              </td>
            </tr>
            
            <tr data-project="project5">
              <td>Good Mood Prints</td>
              <td>Posters</td>
              <td>2024</td>
            </tr>
            <tr class="project-images" id="project5-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project5/image1.jpg" alt="Good Mood Prints - Image 1">
                </div>
              </td>
            </tr>
            
            <tr data-project="project6">
              <td>Soho House</td>
              <td>Custom Icon Set</td>
              <td>2024</td>
            </tr>
            <tr class="project-images" id="project6-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project6/image1.jpg" alt="Soho House - Image 1">
                  <img src="/images/projects/project6/image2.jpg" alt="Soho House - Image 2">
                </div>
              </td>
            </tr>
            
            <tr data-project="project7">
              <td>You Creative Media</td>
              <td>Web Design</td>
              <td>2024</td>
            </tr>
            <tr class="project-images" id="project7-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project7/image1.jpg" alt="You Creative Media - Image 1">
                </div>
              </td>
            </tr>
            
            <tr data-project="project8">
              <td>Sunny Days Forever</td>
              <td>Logo & Custom Typeface</td>
              <td>2024</td>
            </tr>
            <tr class="project-images" id="project8-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/sunny-days/image1.jpg" alt="Sunny Days Forever - Image 1">
                  <img src="/images/projects/sunny-days/image2.jpg" alt="Sunny Days Forever - Image 2">
                  <img src="/images/projects/sunny-days/image3.jpg" alt="Sunny Days Forever - Image 3">
                  <img src="/images/projects/sunny-days/image4.jpg" alt="Sunny Days Forever - Image 4">
                  <img src="/images/projects/sunny-days/image5.jpg" alt="Sunny Days Forever - Image 5">
                </div>
              </td>
            </tr>
            
            <tr data-project="project9">
              <td>Glassdoor</td>
              <td>Custom Typeface</td>
              <td>2023</td>
            </tr>
            <tr class="project-images" id="project9-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project9/image1.jpg" alt="Glassdoor - Image 1">
                </div>
              </td>
            </tr>
            
            <tr data-project="project10">
              <td>Luupi</td>
              <td>Branding</td>
              <td>2023</td>
            </tr>
            <tr class="project-images" id="project10-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project10/image1.jpg" alt="Luupi - Image 1">
                </div>
              </td>
            </tr>
            
            <tr data-project="project11">
              <td>CoType Foundry</td>
              <td>Graphic Design</td>
              <td>2023</td>
            </tr>
            <tr class="project-images" id="project11-images">
              <td colspan="3">
                <div class="image-container">
                  <img src="/images/projects/project11/image1.jpg" alt="CoType Foundry - Image 1">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    mainLayout.appendChild(portfolioPage);
    
    // Add event listener to close button
    portfolioPage.querySelector('.close-button').addEventListener('click', hidePortfolio);
    
    // Add click handlers for project rows
    const projectRows = portfolioPage.querySelectorAll('tr[data-project]');
    projectRows.forEach(row => {
      row.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const imagesRow = document.getElementById(projectId + '-images');
        
        // Close any other open project rows
        portfolioPage.querySelectorAll('.project-images.active').forEach(active => {
          if (active.id !== projectId + '-images') {
            active.classList.remove('active');
          }
        });
        
        // Toggle active class to show/hide images
        imagesRow.classList.toggle('active');
        
        // Scroll to make the expanded content visible if needed
        if (imagesRow.classList.contains('active')) {
          setTimeout(() => imagesRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
      });
    });
    
    return portfolioPage;
  }
  
  // Centralized ESC key handling
  document.addEventListener('keyup', function(e) {
    if (e.key === 'Escape') {
      const infoPage = document.querySelector('.info-page.info-active');
      const portfolioPage = document.querySelector('.portfolio-page.portfolio-active');
      if (infoPage) hideInfo();
      else if (portfolioPage) hidePortfolio();
    }
  });

  // Add click events to buttons
  if (infoRight) {
    infoRight.addEventListener('click', showInfo);
  } else {
    console.error('Could not find info-right element');
  }
  
  if (portfolioLink) {
    portfolioLink.addEventListener('click', showPortfolio);
  } else {
    console.error('Could not find portfolio element');
  }
  
  // Handle initial load state based on URL
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('s');
  if (section === 'info') showInfo();
  else if (section === 'portfolio') showPortfolio();
  
  // Adjust height on window resize (for mobile)
  function adjustHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  adjustHeight();
  window.addEventListener('resize', adjustHeight);
});
