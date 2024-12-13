/* Tab Section */

/* Tabs Variables*/
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

/* Navbar variables*/
const menuButton = document.getElementById("menu");
const navigationBar = document.getElementById("navbar");
var navBarExtended = false;

/*Nav Bar Icons*/
const openIcon = document.getElementById("iconOpen");
const closeIcon = document.getElementById("iconClose");

/*Overlay*/
const overlay = document.getElementById('overlay');

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
      target.style.opacity = 0.85; // Fade-in by changing opacity
    }, 10); // Timeout to allow the style to take effect

    /*On Responsive NavBar, it will automatically back to 55px once the list is clicked*/
    navigationBar.style.height = '55px';
    navBarExtended = false;
    overlay.classList.add('d-none')
    iconTransition(closeIcon,openIcon);
  })
})

//Responsive NavBar Script

menuButton.addEventListener('click', (e) => {
  if (navBarExtended == false) {
    navigationBar.style.height = '320px';
    navBarExtended = true
    overlay.classList.remove('d-none')
    iconTransition(openIcon,closeIcon);
  }
  else {
    navigationBar.style.height = '55px';
    navBarExtended = false
    overlay.classList.add('d-none')
    iconTransition(closeIcon,openIcon);
  }
})

// Function to Animation on the Nav Bar Icons
function iconTransition(icon1, icon2) {
  // Rotate icon1 and fade it out
  icon1.style.transition = "transform 0.2s ease,";
  icon1.style.transform = "rotateX(70deg)";

  // After icon1 disappears, show icon2 and rotate it into position
  setTimeout(() => {
    icon1.style.display = "none";  // Actually hide it after transition completes
    icon2.style.display = "unset"; // Make icon2 visible
    icon2.style.transform = "rotateX(70deg)";
  }, 200); // This matches the time taken for the rotation and opacity transition
  
  setTimeout(() => {
    icon2.style.transition = "transform 0.2s ease";
    icon2.style.transform = "rotateX(0deg)";
  }, 250);
}

// Match Media Query, This will disabled NavBar Respopnsive on Large Devices
var navBarDeactivate = window.matchMedia("(max-width: 769px)");

navBarDeactivate.addEventListener("change", function() {
  navigationBar.style.height = '55px';
  navBarExtended = false
  iconTransition(closeIcon,openIcon);
  overlay.classList.add('d-none')
});

//##########
//  FETCHING DATA FROM JSON FILES: Game Ratings Sections
//##########

//Assigning the variable to the Game Ratings
const gameItem = document.querySelector('#game-rating-id')

fetch('/game-ratings.json')
  .then(res => res.json())
  .then(data => {
      data.forEach(post => {
        //Logic for Text-Color in Ratings
        let ratingColor = null;
        if (post.ratings > 6) {
          ratingColor = 'green';
        }
        else if (post.ratings > 3) {
          ratingColor = 'yellow';
        }
        else {
          ratingColor = 'red';
        }


        gameItem.insertAdjacentHTML('beforeend',
          // Rendering along with template and data
          `
          <div class="card-game-ratings-item">
            <div class="card-game-ratings-item-pic-section">
                <img class="card-game-ratings-item-pic" src="${post.image_url}">
            </div>
            <div class="card-game-ratings-item-info-section">
                <p class="text-light card-paragraph">${post.game_title}</p>
                <p class="text-light card-paragraph">Platform: <span class="text-light-blue">${post.platform}</span></p>
                <p class="text-light card-paragraph">Rate: <span class="text-${ratingColor}">${post.ratings}/10</span></p>
            </div>
        </div>
          `
        );
      })
    });