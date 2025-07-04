import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  // Check URL on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('s');
    if (section === 'info') {
      setShowInfo(true);
    } else if (section === 'portfolio') {
      setShowPortfolio(true);
    }

    // Add ESC key handler
    const handleKeyUp = (e) => {
      if (e.key === 'Escape') {
        if (showInfo) setShowInfo(false);
        if (showPortfolio) handlePortfolioClose();
      }
    };
    
    document.addEventListener('keyup', handleKeyUp);
    
    // Adjust viewport height for mobile browsers
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', adjustHeight);
    };
  }, [showInfo, showPortfolio]);

  // Update URL/history when state changes
  useEffect(() => {
    if (showInfo) {
      window.history.pushState("", "", "?s=info");
    } else if (showPortfolio) {
      window.history.pushState("", "", "?s=portfolio");
    } else {
      window.history.pushState("", "", "/");
    }
    
    // Add animation class for portfolio projects
    if (showPortfolio) {
      setTimeout(() => {
        document.querySelectorAll('.portfolio-table tr[data-project]').forEach((row, i) => {
          setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
          }, i * 100);
        });
      }, 500);
    }
  }, [showInfo, showPortfolio]);

  // Toggle portfolio projects
  const toggleProject = (projectId) => {
    const imagesRow = document.getElementById(projectId + '-images');
    if (imagesRow) {
      // Close any other open project rows
      document.querySelectorAll('.project-images.active').forEach(active => {
        if (active.id !== projectId + '-images') {
          active.classList.remove('active');
          // Reset other expand icons
          const otherRow = document.querySelector(`tr[data-project="${active.id.replace('-images', '')}"]`);
          if (otherRow) {
            otherRow.querySelector('.expand-icon').textContent = '+';
          }
        }
      });
      
      // Toggle active class
      imagesRow.classList.toggle('active');
      
      // Toggle plus/minus icon
      const expandIcon = document.querySelector(`tr[data-project="${projectId}"] .expand-icon`);
      if (expandIcon) {
        expandIcon.textContent = imagesRow.classList.contains('active') ? '−' : '+';
      }
      
      // Scroll to make expanded content visible
      if (imagesRow.classList.contains('active')) {
        setTimeout(() => {
          imagesRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    }
  };

  // Handler for closing portfolio
  const handlePortfolioClose = () => {
    setShowPortfolio(false);
    // Reset all project rows after animation completes
    setTimeout(() => {
      document.querySelectorAll('.project-images').forEach(row => {
        row.classList.remove('active');
      });
      document.querySelectorAll('.expand-icon').forEach(icon => {
        icon.textContent = '+';
      });
    }, 500);
  };

  return (
    <div className={`main-layout ${showPortfolio ? 'rotate-180' : ''}`}>
      <div className="top-row" style={{ opacity: showInfo || showPortfolio ? 0 : 1, zIndex: showInfo || showPortfolio ? -1 : 1 }}>
        <div className="col info">
          Oscar E. is a multidisciplinary creative based in the UK working across brand design, websites, motion, and AI-assisted workflows. Open to freelance and creative collaborations at info@oscaredesign.com
        </div>
        <div className="col represented">
          <div>WORK</div>
          <div>
            Website Design<br />
            Visual Branding<br />
            Graphic Design<br />
            Video Production<br />
            Content Creation
          </div>
        </div>
        <div className="col follow">
          <div>PLATFORMS</div>
          <div>
            <a href="#">Instagram</a><br />
            <a href="#">YouTube</a><br />
            <a href="#">GitHub</a><br />
            <a href="#">Behance</a><br />
            <a href="#">Substack</a>
          </div>
        </div>
        <div className="col info-right" style={{ cursor: 'pointer' }} onClick={() => setShowInfo(true)}>
          INFO
        </div>
      </div>
      <div className="middle-row" style={{ opacity: showInfo || showPortfolio ? 0 : 1, zIndex: showInfo || showPortfolio ? -1 : 1 }}>
        <div className="col portfolio" style={{ cursor: 'pointer' }} onClick={() => setShowPortfolio(true)}>
          <div>Design Portfolio</div>
          <div>TECH & TOOLING</div>
        </div>
        <div className="col shop">
          <div>TECH & TOOLING</div>
          <div>
            AI Workflows<br />
            Creative Coding<br />
            Automation & Scripting<br />
            Voice + Audio Editing<br />
            Experimental Interfaces
          </div>
        </div>
        <div className="col rants">
          <div>RESOURCES / RANTS</div>
          <div>
            Design Rants<br />
            AI for Creatives<br />
            Creative Process Notes<br />
            Productivity Experiments<br />
            Unpolished Ideas
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="giant-name" style={{ opacity: showInfo || showPortfolio ? 0 : 1, zIndex: showInfo || showPortfolio ? -1 : 1 }}>
        Oscar E
      </div>
      <div className="corner-icon" style={{ display: showPortfolio ? 'none' : 'flex', opacity: showInfo ? 0 : 1, zIndex: showInfo ? -1 : 100 }}>
        <div className="top-square">
          <img src="/images/profile.jpg" alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="smile-icon">
          <img src="/images/contact.png" alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      
      {/* Info page */}
      <div className="info-page" style={{ display: showInfo ? 'block' : 'none', opacity: showInfo ? 1 : 0, zIndex: showInfo ? 9 : -1 }}>
        <div className="info-content">
          <div className="close-button" onClick={() => setShowInfo(false)}>✕</div>
          <h2>About Oscar E.</h2>
          <p>Oscar E. is a multidisciplinary creative based in the UK working across brand design, websites, motion, and AI-assisted workflows.</p>
          <p>With a background in digital media and creative technology, Oscar creates functional, innovative designs that combine traditional design principles with emerging technologies.</p>
          <p>For freelance projects or creative collaborations, reach out at: info@oscaredesign.com</p>
        </div>
      </div>
       {/* Portfolio page */}
      <div className={`portfolio-page ${showPortfolio ? 'portfolio-active' : ''}`} style={{ display: 'block' }}>
        <div className="close-button" onClick={handlePortfolioClose}>✕</div>
        <div className="portfolio-content">
          <div className="portfolio-header">
            <h2>Recent Projects</h2>
          </div>
          <table className="portfolio-table">
            <tbody>
                <tr data-project="project1" onClick={() => toggleProject('project1')}>
                  <td>AI-Assisted Brand System</td>
                  <td>Brand Design & AI Integration</td>
                  <td>2025</td>
                  <td><span className="expand-icon">+</span></td>
                </tr>
                <tr className="project-images" id="project1-images">
                  <td colSpan="4">
                    <div className="image-container">
                      <img src="/images/projects/project1/image1.jpg" alt="AI-Assisted Brand System - Image 1" />
                      <img src="/images/projects/project1/image2.jpg" alt="AI-Assisted Brand System - Image 2" />
                    </div>
                    <div className="project-description">
                      <p>A comprehensive brand system that uses AI to generate consistent visual assets while maintaining brand integrity. The system includes automated workflows for creating marketing materials at scale.</p>
                      <p><a href="#" className="project-link">View case study →</a></p>
                    </div>
                  </td>
                </tr>
                <tr data-project="project2" onClick={() => toggleProject('project2')}>
                  <td>Creative Process Platform</td>
                  <td>Web Design & Development</td>
                  <td>2025</td>
                  <td><span className="expand-icon">+</span></td>
                </tr>
                <tr className="project-images" id="project2-images">
                  <td colSpan="4">
                    <div className="image-container">
                      <img src="/images/projects/project2/image1.jpg" alt="Creative Process Platform - Image 1" />
                      <img src="/images/projects/project2/image2.jpg" alt="Creative Process Platform - Image 2" />
                    </div>
                    <div className="project-description">
                      <p>An interactive web platform showcasing creative processes and experimental design techniques. Features innovative navigation and responsive design focused on storytelling.</p>
                      <p><a href="#" className="project-link">View case study →</a></p>
                    </div>
                  </td>
                </tr>
                <tr data-project="project3" onClick={() => toggleProject('project3')}>
                  <td>Generative Motion System</td>
                  <td>Motion Design & Creative Coding</td>
                  <td>2024</td>
                  <td><span className="expand-icon">+</span></td>
                </tr>
                <tr className="project-images" id="project3-images">
                  <td colSpan="4">
                    <div className="image-container">
                      <img src="/images/projects/project3/image1.jpg" alt="Generative Motion System - Image 1" />
                    </div>
                    <div className="project-description">
                      <p>A custom-built generative motion system that creates unique animations based on sound input. Used for live performances and brand activations.</p>
                      <p><a href="#" className="project-link">View case study →</a></p>
                    </div>
                  </td>
                </tr>
                <tr data-project="project4" onClick={() => toggleProject('project4')}>
                  <td>Experimental Interface Lab</td>
                  <td>UX Design & Prototyping</td>
                  <td>2024</td>
                  <td><span className="expand-icon">+</span></td>
                </tr>
                <tr className="project-images" id="project4-images">
                  <td colSpan="4">
                    <div className="image-container">
                      <img src="/images/projects/project4/image1.jpg" alt="Experimental Interface Lab - Image 1" />
                      <img src="/images/projects/project4/image2.jpg" alt="Experimental Interface Lab - Image 2" />
                      <img src="/images/projects/project4/image3.jpg" alt="Experimental Interface Lab - Image 3" />
                    </div>
                    <div className="project-description">
                      <p>A series of experimental interface prototypes exploring new ways of human-computer interaction. Includes voice-controlled interfaces, gestural inputs, and haptic feedback systems.</p>
                      <p><a href="#" className="project-link">View case study →</a></p>
                    </div>
                  </td>
                </tr>
                <tr data-project="project5" onClick={() => toggleProject('project5')}>
                  <td>Automated Content Studio</td>
                  <td>Content Creation & Automation</td>
                  <td>2023</td>
                  <td><span className="expand-icon">+</span></td>
                </tr>
                <tr className="project-images" id="project5-images">
                  <td colSpan="4">
                    <div className="image-container">
                      <img src="/images/projects/project5/image1.jpg" alt="Automated Content Studio - Image 1" />
                    </div>
                    <div className="project-description">
                      <p>A suite of automation tools that streamline content creation for digital platforms. Combines design templates, AI-assisted copywriting, and publishing workflows.</p>
                      <p><a href="#" className="project-link">View case study →</a></p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default App;
