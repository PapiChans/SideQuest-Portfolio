/* Tab Section */

/* Tabs Variables*/
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

/* Navbar variables*/
const menuButton = document.getElementById("menu");
const navigationBar = document.getElementById("navbar");
var navBarExtended = false;
const menuIcon = document.getElementById("menuIcon");

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
      tabContent.style.display = 'none'; // Hide inactive content
      tabContent.style.opacity = 0; // Reset opacity
      tabContent.style.transition = 'opacity 0.5s ease-in-out'; // Transition for fade-in
    })
    
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    
    // Add 'active' class to clicked tab and corresponding card
    tab.classList.add('active')
    
    // Show the clicked content
    target.classList.add('active')
    target.style.display = 'block'; // Show the clicked content
    target.style.opacity = 0; // Start with opacity 0 for fade-in effect
    
    // Trigger the fade-in effect after a short delay
    setTimeout(() => {
      target.style.opacity = 1; // Fade-in by changing opacity
    }, 10); // Timeout to allow the style to take effect

    /*On Responsive NavBar, it will automatically back to 55px once the list is clicked*/
    navigationBar.style.height = '55px';
    navBarExtended = false;
  })
})

//Responsive NavBar Script

menuButton.addEventListener('click', (e) => {
  if (navBarExtended == false) {
    navigationBar.style.height = '320px';
    navBarExtended = true
  }
  else {
    navigationBar.style.height = '55px';
    navBarExtended = false
  }
})

// Match Media Query, This will disabled NavBar Respopnsive on Large Devices
var navBarDeactivate = window.matchMedia("(max-width: 769px)");

navBarDeactivate.addEventListener("change", function() {
  navigationBar.style.height = '55px';
  navBarExtended = false
});