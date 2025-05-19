/**
 * Portfolio Website Enhanced JavaScript
 * By Aswin Suresh
 */

// Toggle menu functionality for hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Get the height of the navigation bar for offset
      const navHeight = document.getElementById('desktop-nav').offsetHeight;
      
      // Calculate position to scroll to (element position - navbar height)
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // If it's a hamburger menu link, close the menu
    if (this.closest('.menu-links')) {
      toggleMenu();
    }
  });
});

// Dynamic active link highlighting
function updateActiveNavLinks() {
  // Get all sections that have an ID defined
  const sections = document.querySelectorAll('section[id]');
  
  // Get the navigation links
  const navLinks = document.querySelectorAll('.nav-links li a, .menu-links li a');
  
  // Get current scroll position
  const scrollPosition = window.scrollY;
  
  // Get the height of the navigation bar for offset calculation
  const navHeight = document.getElementById('desktop-nav').offsetHeight;
  
  // Variable to track the current active section
  let currentSection = '';
  
  // Check which section is in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100; // Adjust offset for better UX
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Update the active class on the navigation links
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active-link');
    }
  });
}

// Add a scroll to top button dynamically
function addScrollToTopButton() {
  const button = document.createElement('button');
  button.id = 'back-to-top';
  button.innerHTML = '↑';
  button.title = 'Back to Top';
  button.classList.add('back-to-top-btn');
  document.body.appendChild(button);
  
  // Style the button with CSS
  button.style.position = 'fixed';
  button.style.bottom = '30px';
  button.style.right = '30px';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#147efb';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.fontSize = '24px';
  button.style.cursor = 'pointer';
  button.style.display = 'none';
  button.style.zIndex = '1000';
  button.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  button.style.transition = 'all 0.3s ease';
  
  // Add hover effect
  button.addEventListener('mouseover', () => {
    button.style.transform = 'translateY(-3px)';
    button.style.boxShadow = '0 6px 15px rgba(0,0,0,0.25)';
  });
  
  button.addEventListener('mouseout', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  });
  
  // Add click event to scroll to top
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  return button;
}

// Toggle the scroll to top button visibility
function toggleScrollToTopButton() {
  const button = document.getElementById('back-to-top');
  if (window.scrollY > 500) {
    button.style.display = 'block';
    button.style.opacity = '1';
  } else {
    button.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 500) {
        button.style.display = 'none';
      }
    }, 300);
  }
}

// Animate skill bars (visual progress indicators)
function animateSkillBars() {
  const articles = document.querySelectorAll('#experience article');
  
  articles.forEach(article => {
    const skill = article.querySelector('h3').textContent;
    const level = article.querySelector('p').textContent;
    
    // Add a progress bar after each skill
    if (!article.querySelector('.skill-bar')) {
      const skillBar = document.createElement('div');
      skillBar.classList.add('skill-bar');
      skillBar.style.height = '4px';
      skillBar.style.backgroundColor = '#e9ecef';
      skillBar.style.borderRadius = '2px';
      skillBar.style.marginTop = '5px';
      skillBar.style.position = 'relative';
      skillBar.style.width = '100%';
      
      const progress = document.createElement('div');
      progress.classList.add('progress');
      progress.style.height = '100%';
      progress.style.backgroundColor = '#147efb';
      progress.style.borderRadius = '2px';
      progress.style.width = '0';
      progress.style.transition = 'width 1s ease-in-out';
      
      // Set width based on experience level
      let progressWidth = '50%';
      if (level.toLowerCase().includes('experienced')) {
        progressWidth = '90%';
      } else if (level.toLowerCase().includes('intermediate')) {
        progressWidth = '70%';
      } else if (level.toLowerCase().includes('basic')) {
        progressWidth = '40%';
      }
      
      // Add these elements to the DOM
      skillBar.appendChild(progress);
      article.appendChild(skillBar);
      
      // Create and use Intersection Observer to animate when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              progress.style.width = progressWidth;
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(skillBar);
    }
  });
}

// Add project modals for more detailed information
function setupProjectModals() {
  const projects = document.querySelectorAll('.color-container');
  
  projects.forEach((project, index) => {
    const projectId = `project-${index + 1}`;
    const projectTitle = project.querySelector('.project-title').textContent;
    
    // Add a "View Details" button
    const btnContainer = project.querySelector('.btn-container');
    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('btn', 'btn-color-1', 'project-btn');
    detailsBtn.textContent = 'View Details';
    detailsBtn.addEventListener('click', () => openModal(projectId));
    btnContainer.appendChild(detailsBtn);
    
    // Create modal structure
    const modal = document.createElement('div');
    modal.id = `modal-${projectId}`;
    modal.classList.add('project-modal');
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.overflow = 'auto';
    
    // Modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.margin = '5% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '800px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.position = 'relative';
    modalContent.style.animation = 'modalFadeIn 0.4s';
    
    // Close button
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.right = '10px';
    closeBtn.style.top = '10px';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => closeModal(projectId));
    
    // Modal content text (using project-specific content)
    const modalHeader = document.createElement('h2');
    modalHeader.textContent = projectTitle;
    modalHeader.style.color = '#147efb';
    modalHeader.style.marginBottom = '20px';
    
    // Basic modal content - could be expanded with more project-specific details
    const modalDesc = document.createElement('div');
    modalDesc.innerHTML = `
      <img src="${project.querySelector('.project-img').src}" alt="${projectTitle}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
      <p>This is a detailed description of ${projectTitle}. You can add more specific information about this project here.</p>
      <h3>Technologies Used:</h3>
      <ul style="padding-left: 20px; margin-bottom: 20px;">
        <li>HTML5 & CSS3</li>
        <li>JavaScript</li>
        <li>Python</li>
        <li>Django/Flask</li>
      </ul>
      <h3>Key Features:</h3>
      <ul style="padding-left: 20px;">
        <li>Responsive design for all devices</li>
        <li>Interactive user interface</li>
        <li>Data analytics and visualization</li>
        <li>Secure authentication system</li>
      </ul>
    `;
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalDesc);
    modal.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(projectId);
      }
    });
  });
  
  // Add CSS animation for modal
  const style = document.createElement('style');
  style.textContent = `
    @keyframes modalFadeIn {
      from {opacity: 0; transform: translateY(-30px);}
      to {opacity: 1; transform: translateY(0);}
    }
  `;
  document.head.appendChild(style);
}

// Modal functionality
function openModal(projectId) {
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModal(projectId) {
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Add subtle parallax effect to profile section
function setupParallax() {
  const profileSection = document.getElementById('profile');
  if (profileSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition <= profileSection.offsetHeight) {
        const offset = scrollPosition * 0.4;
        profileSection.style.backgroundPositionY = `${offset}px`;
      }
    });
  }
}

// Add a typing effect to the main title
function addTypingEffect() {
  const titleElement = document.querySelector('#profile .title');
  if (titleElement) {
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        titleElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Typing speed
      }
    };
    
    // Start the typing effect after page loads
    setTimeout(typeWriter, 500);
  }
}

// Handle form submission for a contact form (if added later)
function setupContactForm() {
  const form = document.querySelector('#contact form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Simulate form submission - would need backend integration
      console.log('Form data:', formObject);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.classList.add('form-success');
      successMsg.textContent = 'Thank you for your message! I will get back to you soon.';
      successMsg.style.color = '#28a745';
      successMsg.style.padding = '15px';
      successMsg.style.marginTop = '15px';
      successMsg.style.fontWeight = 'bold';
      
      form.appendChild(successMsg);
      form.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    });
  }
}

// Add responsive font sizing
function setupResponsiveFonts() {
  function adjustFontSize() {
    const width = window.innerWidth;
    const baseFontSize = width < 768 ? 14 : width < 1024 ? 16 : 18;
    document.documentElement.style.fontSize = `${baseFontSize}px`;
  }
  
  // Set initial font size
  adjustFontSize();
  
  // Adjust on resize
  window.addEventListener('resize', adjustFontSize);
}

// Add scroll detection animation for CV viewing
function setupCvViewTracking() {
  const cvButton = document.querySelector('.btn-container .btn-color-2');
  
  if (cvButton) {
    // Add a counter to track views
    let viewCount = 0;
    const originalText = cvButton.textContent;
    
    cvButton.addEventListener('click', () => {
      viewCount++;
      
      // Animate the button
      cvButton.classList.add('btn-clicked');
      cvButton.textContent = 'Downloading...';
      
      setTimeout(() => {
        cvButton.textContent = viewCount === 1 ? 'Downloaded!' : `Downloaded ${viewCount} times!`;
        
        setTimeout(() => {
          cvButton.classList.remove('btn-clicked');
          cvButton.textContent = originalText;
        }, 2000);
      }, 1000);
    });
    
    // Add style for clicked state
    const style = document.createElement('style');
    style.textContent = `
      .btn-clicked {
        background-color: #28a745 !important;
        transform: scale(1.05);
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }
}

// Setup dark mode toggle
function setupDarkMode() {
  // Create dark mode toggle button
  const darkModeToggle = document.createElement('button');
  darkModeToggle.id = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '🌙'; // Moon icon for dark mode
  darkModeToggle.title = 'Toggle Dark Mode';
  darkModeToggle.style.position = 'fixed';
  darkModeToggle.style.top = '30px';
  darkModeToggle.style.right = '30px';
  darkModeToggle.style.zIndex = '100';
  darkModeToggle.style.width = '40px';
  darkModeToggle.style.height = '40px';
  darkModeToggle.style.borderRadius = '50%';
  darkModeToggle.style.backgroundColor = '#147efb';
  darkModeToggle.style.color = 'white';
  darkModeToggle.style.border = 'none';
  darkModeToggle.style.fontSize = '20px';
  darkModeToggle.style.cursor = 'pointer';
  darkModeToggle.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  
  // Add to document
  document.body.appendChild(darkModeToggle);
  
  // Create styles for dark mode
  const darkModeStyles = document.createElement('style');
  darkModeStyles.textContent = `
    body.dark-mode {
      background-color: #121212;
      color: #e6e6e6;
    }
    
    body.dark-mode .title {
      color: #147efb;
    }
    
    body.dark-mode #desktop-nav, 
    body.dark-mode #hamburger-nav,
    body.dark-mode footer {
      background-color: #1e1e1e;
    }
    
    body.dark-mode .nav-links a {
      color: #e6e6e6;
    }
    
    body.dark-mode .details-container {
      background-color: #1e1e1e;
      color: #e6e6e6;
    }
    
    body.dark-mode .color-container {
      background-color: #1e1e1e;
    }
    
    body.dark-mode .btn-color-2 {
      color: #e6e6e6;
      border: 1px solid #e6e6e6;
    }

    body.dark-mode .modal-content {
      background-color: #1e1e1e;
      color: #e6e6e6;
    }
  `;
  document.head.appendChild(darkModeStyles);
  
  // Toggle dark mode on button click
  let isDarkMode = false;
  darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙'; // Sun or moon icon
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  });
  
  // Check for saved preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    isDarkMode = true;
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
  }
}

// Add animated counters for experience years
function setupCounters() {
  const experienceContainers = document.querySelectorAll('.details-container');
  
  experienceContainers.forEach(container => {
    const paragraph = container.querySelector('p');
    if (paragraph && paragraph.textContent.includes('+')) {
      const text = paragraph.textContent;
      const number = parseInt(text.match(/\d+/)[0]);
      
      // Create counter element
      const counterSpan = document.createElement('span');
      counterSpan.classList.add('counter');
      counterSpan.textContent = '0';
      
      // Replace the number with the counter span
      paragraph.innerHTML = paragraph.innerHTML.replace(number, counterSpan.outerHTML);
      
      // Set up the Intersection Observer for animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counterElement = entry.target.querySelector('.counter');
            let count = 0;
            const target = number;
            const duration = 2000; // 2 seconds
            const interval = Math.floor(duration / target);
            
            const timer = setInterval(() => {
              count++;
              counterElement.textContent = count;
              if (count === target) {
                clearInterval(timer);
              }
            }, interval);
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(container);
    }
  });
}

// Add fixed navigation on scroll
function setupStickyNavigation() {
  const nav = document.getElementById('desktop-nav');
  const hamburgerNav = document.getElementById('hamburger-nav');
  let navTop = nav.offsetTop;
  
  function handleScroll() {
    if (window.scrollY > navTop) {
      nav.style.position = 'fixed';
      nav.style.top = '0';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
      nav.style.transition = 'box-shadow 0.3s ease';
      
      if (window.innerWidth <= 768) {
        hamburgerNav.style.position = 'fixed';
        hamburgerNav.style.top = '0';
        hamburgerNav.style.left = '0';
        hamburgerNav.style.right = '0';
        hamburgerNav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        hamburgerNav.style.transition = 'box-shadow 0.3s ease';
      }
      
      // Add placeholder to prevent content jump
      if (!document.getElementById('nav-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.id = 'nav-placeholder';
        placeholder.style.height = `${nav.offsetHeight}px`;
        document.body.insertBefore(placeholder, document.body.firstChild);
      }
    } else {
      nav.style.position = '';
      nav.style.boxShadow = '';
      hamburgerNav.style.position = '';
      hamburgerNav.style.boxShadow = '';
      
      // Remove placeholder
      const placeholder = document.getElementById('nav-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    navTop = nav.offsetTop;
    handleScroll();
  });
}

// Initialize all functions on document load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (already in HTML)
  
  // Add scroll to top button
  addScrollToTopButton();
  
  // Setup interactive elements
  setupProjectModals();
  animateSkillBars();
  setupParallax();
  addTypingEffect();
  setupContactForm();
  setupResponsiveFonts();
  setupCvViewTracking();
  setupDarkMode();
  setupCounters();
  setupStickyNavigation();
  
  // Event listeners for scroll
  window.addEventListener('scroll', () => {
    updateActiveNavLinks();
    toggleScrollToTopButton();
  });
  
  // Handle resize events
  window.addEventListener('resize', () => {
    // Update any responsive elements if needed
  });
  
  console.log('Portfolio scripts initialized successfully!');
});