/* Tab Section */

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

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
  })
})
